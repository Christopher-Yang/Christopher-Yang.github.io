/********* 
 *  Test *
 *********/

import { PsychoJS } from './psychojs/js/core/PsychoJS.js';
import { Scheduler } from './psychojs/js/util/Scheduler.js';
import { Color } from './psychojs/js/util/Color.js';
import * as Clock from './psychojs/js/util/Clock.js';
import * as util from './psychojs/js/util/Util.js';
import { Mouse } from './psychojs/js/core/Mouse.js';
import { Polygon } from './psychojs/js/visual/Polygon.js';
import { TextStim } from './psychojs/js/visual/TextStim.js';
import { Keyboard } from './psychojs/js/core/Keyboard.js';

// set parameters for sum of sines
const freqs = [0.1, 0.15, 0.25, 0.35, 0.55, 0.65, 0.85, 0.95, 1.15, 1.45, 1.55, 1.85];
const amplitudes = [0.023076923076923075, 0.023076923076923075, 0.023076923076923075, 0.023076923076923075, 0.023076923076923075, 0.023076923076923075, 0.01764705882352941, 0.015789473684210527, 0.013043478260869566, 0.010344827586206896, 0.009677419354838708, 0.008108108108108107];
const phases = [-2.2973572091724623, 2.1829905511425176, 1.6573448103607546 ,-1.538946698747247, -0.02868219371247127, -0.3173569996006864, 0.9524867388833398, 1.8141023176943092, -2.551855477031973, -2.9634802056111047, 2.1096743676129526, -0.4224369710975715];
let params = freqs.concat(amplitudes,phases);
let sines = [new Array, new Array, new Array, new Array];
let i;
for (i=0; i<36; i=i+4) { // sines contains all of the sinusoid parameters broken up into 4 different arrays
    sines[0].push(params[i]);
    sines[1].push(params[i+1]);
    sines[2].push(params[i+2]);
    sines[3].push(params[i+3]);
}

// init psychoJS:
const psychoJS = new PsychoJS({
    debug: true
});

// open window:
psychoJS.openWindow({
    name: 'myWindow',
    fullscr: true,
    color: new Color([-0.5, -0.5, -0.5]),
    units: 'height',
    waitBlanking: true
});

// store info about the experiment session:
let expName = 'tracking';  // from the Builder filename that created this script
let expInfo = {'participant': '', 'day': '', 'aspectRatio': '16:9', 'size': '15.6'};

// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
    dictionary: expInfo,
    title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// set parameters for trials 
const nTrials = 7;
const perturbStart = 7; // must be >= 2

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
for (i=1; i<=nTrials; i++) {
    flowScheduler.add(trialRoutineBegin());
    flowScheduler.add(enterTarget());
    flowScheduler.add(tracking());
    flowScheduler.add(intertrialInterval());
    if (i === perturbStart-1)
	flowScheduler.add(message());
}
flowScheduler.add(message());
flowScheduler.add(quitPsychoJS, 'You are done with the experiment', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
    expName: expName,
    expInfo: expInfo
});


var frameDur;
function updateInfo() {
    expInfo['date'] = Clock.MonotonicClock.getDateStr();  // add a simple timestamp
    expInfo['expName'] = expName;
    expInfo['psychopyVersion'] = '2020.1.3';
    expInfo['OS'] = window.navigator.platform;

    // store frame rate of monitor if we can measure it successfully
    expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
    if (typeof expInfo['frameRate'] !== 'undefined')
	frameDur = 1.0 / Math.round(expInfo['frameRate']);
    else
	frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

    // add info from the URL:
    util.addInfoFromUrl(expInfo);
    
    return Scheduler.Event.NEXT;
}


let diagonal;
let widthCm;
let heightCm;
let cm;
let trial = 1;
let perturbCursor = false;
let trialClock;
let itiTimer;
let routineTimer;
let cursor;
let target;
let instructions;
let instructions2;
let trialCounter;
let download;
let enter;
function experimentInit() {
    // Make mouse cursor invisible
    document.body.style.cursor='none';
    
    // Create some handy timers
    trialClock = new Clock.Clock(); // keeps time during each trial
    itiTimer = new Clock.Clock(); // keeps time for intertrial interval

    // Calculate units for centimeters
    let aRatioX = parseInt(expInfo['aspectRatio'].slice(0,expInfo['aspectRatio'].indexOf(':')));
    let aRatioY = parseInt(expInfo['aspectRatio'].slice(expInfo['aspectRatio'].indexOf(':')+1));
    let size = parseFloat(expInfo['size']);
    diagonal = Math.sqrt(Math.pow(aRatioX,2) + Math.pow(aRatioY,2));
    widthCm = 2.54 * size * aRatioX / diagonal; // physical width of monitor (cm)
    heightCm = 2.54 * size * aRatioY / diagonal; // physical height of monitor (cm)
    cm = 1 / heightCm; // use this to convert height units to centimeters

    // Create display objects
    cursor = new Polygon ({
	win: psychoJS.window,
	name: 'cursor',
	units : 'height',
	pos: [0, 0],
	lineWidth: 0.5,
	lineColor: new Color('white'),
	fillColor: new Color('white'),
	edges: 32,
	radius: 0.1*cm,
	interpolate: true,
    });

    target = new Polygon ({
	win: psychoJS.window,
	name: 'target',
	units : 'height',
	pos: [0, 0],
	lineWidth: 3,
	lineColor: new Color('white'),
	fillColor: new Color([0.2, 0.2, 0.2]),
	edges: 64,
	radius: 0.5*cm,
	interpolate: true,
    });

    instructions = new TextStim({
	win: psychoJS.window,
	name: 'instructions',
	text: 'The target (grey circle) will move randomly on the screen, and you must try to keep your cursor (white dot) inside the target for as long as you possibly can\n\nClick the target when you are ready to begin',
	alignHoriz: 'center',
	units: 'height',
	pos: [0, -4*cm],
	height: 0.7*cm,
	wrapWidth: true,
	color: new Color('white'),
    });

    instructions2 = new TextStim({
	win: psychoJS.window,
	name: 'instructions2',
	text: 'When you start the next trial, the cursor will also move randomly. Still do your best to keep the cursor in the target.\n\nPress the enter key to continue.',
	alignHoriz: 'center',
	units: 'height',
	pos: [0, 0],
	height: 0.7*cm,
	wrapWidth: true,
	color: new Color('white'),
    });

    download = new TextStim({
	win: psychoJS.window,
	name: 'download',
	text: 'We will now download data from the experiment onto your computer\n\nTo initiate the download, press the enter key\n\nIf your browser asks you if you want to download multiple files, please click yes',
	alignHoriz: 'center',
	units: 'height',
	pos: [0, 0],
	height: 0.7*cm,
	wrapWidth: true,
	color: new Color('white'),
    });

    trialCounter = new TextStim({
	win: psychoJS.window,
	name: 'trialCounter',
	alignHoriz: 'center',
	units: 'norm',
	pos: [0.83, 0.85],
	height: 0.075,
	wrapWidth: true,
	color: new Color('white'),
	options: true
    });
    trialCounter.setAutoDraw(true);
    
    enter = new Keyboard({
	psychoJS: psychoJS
    });

    return Scheduler.Event.NEXT;
}


let mPos;
let t;
let frameN;
let mouse = new Mouse({
    name: 'myMouse',
    win: psychoJS.window,
});
function trialRoutineBegin(trials) {
    return function () {
	//------Prepare to start trial------
	mPos = mouse.getPos();
	cursor.setPos(mPos);
	// cursor.setPos(mPos.map(pos => pos*0.7));
	t = 0;
	frameN = -1;
	
	// draw objects
	if (trial === 1)
	    instructions.setAutoDraw(true);

	trialCounter.setText(`Trial ${trial}/${nTrials}`);
	target.setAutoDraw(true);
	cursor.setAutoDraw(true);

	return Scheduler.Event.NEXT;
    };
}


function enterTarget(trials) {
    //------Wait for participant to click in the target to start trial------
    return function () {
	mPos = mouse.getPos();
	cursor.setPos(mPos);
	// cursor.setPos(mPos.map(pos => pos*0.7));


	if (target.contains(mouse) && mouse.getPressed()[0] == 1) {
	    if (trial === 1)
		instructions.setAutoDraw(false);
	    else if (trial === perturbStart)
		instructions2.setAutoDraw(false);
	    trialClock.reset();
	    return Scheduler.Event.NEXT;
	} else
	    return Scheduler.Event.FLIP_REPEAT;
    };
}


const trialLength = 15; // by default, set to 66
let cursorHistory = [];
let allData = [];
let data = [];
let scale;
let tX = new Array(3);
let tY = new Array(3);
let cX = new Array(3);
let cY = new Array(3);
let cPosX;
let cPosY;
function tracking(trials) {
    return function () {
	//------Sinusoidally perturb target (and cursor)------
	
	// get current time
	t = trialClock.getTime();
	frameN = frameN + 1;// number of completed frames (so 0 is the first frame)

	// set scaling for amplitude
	if (t < 5) {
	    scale = t/5;
	} else {
	    scale = 1;
	}

	// set cursor position
	mPos = mouse.getPos();
	if (perturbCursor) { // sinusoidally perturb the cursor if desired
	    for (i=0; i<3; i++) {
		cX[i] = sines[0][i+3] * Math.cos(2 * Math.PI * t * sines[0][i] + sines[0][i+6]);
		cY[i] = sines[1][i+3] * Math.cos(2 * Math.PI * t * sines[1][i] + sines[1][i+6]);
	    }
	    cPosX = scale * 100 * cm * cX.reduce((a, b) => a + b, 0) + mPos[0]; // scale the cursor position to centimeters
	    cPosY = scale * 100 * cm * cY.reduce((a, b) => a + b, 0) + mPos[1];
	} else { // otherwise set cursor as mouse position
	    cPosX = mPos[0];
	    cPosY = mPos[1];
	}
	cursor.setPos([cPosX, cPosY]);


	// set target position
	for (i=0; i<3; i++) { // sinusoidally perturb the target
	    tX[i] = sines[2][i+3] * Math.cos(2 * Math.PI * t * sines[2][i] + sines[2][i+6]);
	    tY[i] = sines[3][i+3] * Math.cos(2 * Math.PI * t * sines[3][i] + sines[3][i+6]);
	}
	let tPosX = scale * 100 * cm * tX.reduce((a, b) => a + b, 0); // scale the target position to centimeters
	let tPosY = scale * 100 * cm * tY.reduce((a, b) => a + b, 0);
	target.setPos([tPosX, tPosY]);

	// change target color if the cursor is inside the target
	if (target.contains(cursor))
	    target.setFillColor(new Color('darkorchid'));
	else
	    target.setFillColor(new Color([0.2, 0.2, 0.2]));

	// store data
	data.push([t, cPosX, cPosY, tPosX, tPosY]);

	// check for quit (typically the Esc key)
	if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
	    return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
	}
	
	// refresh screen for trialLength seconds
	if (t <= trialLength) 
	    return Scheduler.Event.FLIP_REPEAT;

	// otherwise move to intertrial interval
	else {
	    allData.push(data);
    	    cursorHistory.push(perturbCursor);
	    trial++;
	    data = [];
	    [sines[0], sines[1], sines[2], sines[3]] = [sines[3], sines[0], sines[1], sines[2]]; // exchange target and cursor sines
	    target.setAutoDraw(false);
	    cursor.setAutoDraw(false);
	    target.setPos([0, 0]); // reset target position to center of screen
	    itiTimer.reset();
	    
	    return Scheduler.Event.NEXT;
	}
    };
}


const iti = 1.5;
function intertrialInterval(trials) {
    return function () {
	//------Wait for a few seconds before moving to next part of experiment------
	if (itiTimer.getTime() > iti) {
	    if (trial === perturbStart) { // at trial "perturbStart," display new instructions to participant
		perturbCursor = true;
		instructions2.setAutoDraw(true);
	    } else if (trial > nTrials) // after all trials have finished, display download instructions
		download.setAutoDraw(true);
	    return Scheduler.Event.NEXT;
	} else
	    return Scheduler.Event.FLIP_REPEAT;
    };
}


function message(trials) {
    return function () {
	//------Display messages to the participant------

	// download data files once the participant has pressed the RET key
	let keys = enter.getKeys({keyList: ['return']});
	if (Object.keys(keys).length === 1) {
	    instructions2.setAutoDraw(false);
	    return Scheduler.Event.NEXT;
	}
	else
	    return Scheduler.Event.FLIP_REPEAT;
    };
}


let j = 0;
function quitPsychoJS(message, isCompleted) {
    //------Download data and end experiment------

    // make the mouse cursor visible again
    document.body.style.cursor='default';
    download.setAutoDraw(false);

    // loop for downloading data from each trial in separate csv file
    for (const dat of allData) {
	// convert data into a `csv` content
	let csvContent = "data:text/csv;charset=utf-8,";
	csvContent += `cursor_sines?,${cursorHistory[j]}\r\ntime,cursorX,cursorY,targetX,targetY\r\n`;
	j++;
	dat.forEach(function(rowArray) {
	    let row = rowArray.join(",");
	    csvContent += row + "\r\n";
	});

	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.style.display = 'none';
	link.setAttribute("download", `Subj${expInfo.participant}_Day${expInfo.day}_Trial${j}_${expInfo.date}.csv`);
	document.body.appendChild(link); // Required for FF
	link.click();
    }
    
    psychoJS.window.close();
    psychoJS.quit({message: message, isCompleted: isCompleted});
    
    return Scheduler.Event.QUIT;
}
