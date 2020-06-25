/********* 
 *  Test *
 *********/

import { PsychoJS } from 'psychojs/js/core/PsychoJS.js';
import { Scheduler } from 'psychojs/js/util/Scheduler.js';
import { Color } from 'psychojs/js/util/Color.js';
import * as Clock from 'psychojs/js/util/Clock.js';
import * as util from 'psychojs/js/util/Util.js';
import { Mouse } from 'psychojs/js/core/Mouse.js';
import { Polygon } from 'psychojs/js/visual/Polygon.js';
import { TextStim } from 'psychojs/js/visual/TextStim.js';
import { Keyboard } from 'psychojs/js/core/Keyboard.js';

const heightPix = window.screen.availHeight;
const widthPix = window.screen.availWidth;

let aRatioX;
let aRatioY;
let size;

if (typeof aRatio == 'undefined') {
    aRatioX = 16;
    aRatioY = 9;
    size = 15.6;
} else {
    aRatioX = parseInt(aRatioString.slice(0,aRatioString.indexOf(':')));
    aRatioY = parseInt(aRatioString.slice(aRatioString.indexOf(':')+1));
    size = parseFloat(sizeString);
}

const diagonal = Math.sqrt(Math.pow(aRatioX,2) + Math.pow(aRatioY,2));

// physical dimensions of the monitor in centimeters
const widthCm = 2.54 * size * aRatioX / diagonal;
const heightCm = 2.54 * size * aRatioY / diagonal;

const cm = 1 / heightCm;

const freqs = [0.1, 0.15, 0.25, 0.35, 0.55, 0.65, 0.85, 0.95, 1.15, 1.45, 1.55, 1.85];
const amplitudes = [0.023076923076923075, 0.023076923076923075, 0.023076923076923075, 0.023076923076923075, 0.023076923076923075, 0.023076923076923075, 0.01764705882352941, 0.015789473684210527, 0.013043478260869566, 0.010344827586206896, 0.009677419354838708, 0.008108108108108107];
const phases = [-2.2973572091724623, 2.1829905511425176, 1.6573448103607546 ,-1.538946698747247, -0.02868219371247127, -0.3173569996006864, 0.9524867388833398, 1.8141023176943092, -2.551855477031973, -2.9634802056111047, 2.1096743676129526, -0.4224369710975715];

let params = freqs.concat(amplitudes,phases);
let sines1 = [];
let sines2 = [];
let sines3 = [];
let sines4 = [];
let i;
for (i=0; i<36; i=i+4) {
    sines1.push(params[i]);
    sines2.push(params[i+1]);
    sines3.push(params[i+2]);
    sines4.push(params[i+3]);
}
const sines = [sines1, sines2, sines3, sines4];

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
let expName = '';  // from the Builder filename that created this script
let expInfo = {'participant': '', 'day': ''};

// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
    dictionary: expInfo,
    title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);

flowScheduler.add(trialRoutineBegin());
flowScheduler.add(enterTarget());
flowScheduler.add(tracking());
flowScheduler.add(intertrialInterval());

// flowScheduler.add(trialRoutineBegin());
// flowScheduler.add(enterTarget());
// flowScheduler.add(tracking());
// flowScheduler.add(intertrialInterval());
flowScheduler.add(downloadMessage());
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

let trial = 1;
let perturbCursor = false;
let trialClock;
let globalClock;
let waitTimer;
let routineTimer;
let cursor;
let target;
let instructions;
let download;
let enter;
function experimentInit() {
    // Make mouse cursor invisible
    document.body.style.cursor='none';
    
    // Initialize components for Routine "trial"
    trialClock = new Clock.Clock();
    waitTimer = new Clock.Clock();
    
    // Create some handy timers
    globalClock = new Clock.Clock();  // to track the time since experiment started
    routineTimer = new Clock.CountdownTimer();  // to track time remaining of each (non-slip) routine

    cursor = new Polygon ({
	win: psychoJS.window,
	name: 'cursor',
	units : 'height',
	pos: [0, 0],
	lineWidth: 0.5,
	lineColor: new Color('white'),
	fillColor: new Color('white'),
	edges: 32,
	radius: 0.15*cm,
	interpolate: true,
    });

    target = new Polygon ({
	win: psychoJS.window,
	name: 'target',
	units : 'height',
	pos: [0, 0],
	lineWidth: 4,
	lineColor: new Color('white'),
	fillColor: new Color([0.2, 0.2, 0.2]),
	edges: 64,
	radius: 0.5*cm,
	interpolate: true,
    });

    instructions = new TextStim({
	win: psychoJS.window,
	name: 'instructions',
	text: 'Keep your cursor (white dot) inside the target (grey circle) for as long as you possibly can\n\nClick the target when you are ready to begin',
	alignHoriz: 'center',
	units: 'height',
	pos: [0, -4*cm],
	// height: 0.7*cm,
	size: 0.5*cm,
	wrapWidth: true,
	color: new Color('white'),
    });

    download = new TextStim({
	win: psychoJS.window,
	name: 'download',
	text: 'We will now download data from the experiment onto your computer.\n\nIn order to begin the download  When your browser asks you if you want to download multiple files, please click yes.\n\nHit enter on your keyboard to begin the download.',
	alignHoriz: 'center',
	units: 'height',
	pos: [0, 0],
	height: 0.7*cm,
	wrapWidth: true,
	color: new Color('white'),
    });

    enter = new Keyboard({
	psychoJS: psychoJS
    });

    console.log(enter);
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
	//------Prepare to start Routine 'trial'-------
	mPos = mouse.getPos();
	cursor.setPos(mPos);
	t = 0;
	frameN = -1;
	
	// draw objects
	instructions.setAutoDraw(true);
	target.setAutoDraw(true);
	cursor.setAutoDraw(true);

	return Scheduler.Event.NEXT;
    };
}

function enterTarget(trials) {
    return function () {
	mPos = mouse.getPos();
	cursor.setPos(mPos);

	if (target.contains(mouse) && mouse.getPressed()[0] == 1) {
	    instructions.setAutoDraw(false);
	    trialClock.reset();
	    return Scheduler.Event.NEXT;
	} else
	    return Scheduler.Event.FLIP_REPEAT;
    };
}

let allData = [];
let data = [];
let scale;
let tX = new Array(3);
let tY = new Array(3);
let cX = new Array(3);
let cY = new Array(3);
let cPosX;
let cPosY;
let continueRoutine;
function tracking(trials) {
    return function () {
	//------Loop for each frame of Routine 'trial'-------
	
	let continueRoutine = true; // until we're told otherwise
	// get current time
	t = trialClock.getTime();
	frameN = frameN + 1;// number of completed frames (so 0 is the first frame)

	if (t < 5) {
	    scale = t/5;
	} else {
	    scale = 1;
	}

	// set cursor position
	mPos = mouse.getPos();
	if (perturbCursor) {
	    for (i=0; i<3; i++) {
		cX[i] = sines3[i+3] * Math.cos(2 * Math.PI * t * sines3[i] + sines3[i+6]);
		cY[i] = sines4[i+3] * Math.cos(2 * Math.PI * t * sines4[i] + sines4[i+6]);
	    }
	    cPosX = scale * 100 * cm * cX.reduce((a, b) => a + b, 0) + mPos[0];
	    cPosY = scale * 100 * cm * cY.reduce((a, b) => a + b, 0) + mPos[1];
	} else {
	    cPosX = mPos[0];
	    cPosY = mPos[1];
	}

	cursor.setPos([cPosX, cPosY]);

	// set target position
	for (i=0; i<3; i++) {
	    tX[i] = sines1[i+3] * Math.cos(2 * Math.PI * t * sines1[i] + sines1[i+6]);
	    tY[i] = sines2[i+3] * Math.cos(2 * Math.PI * t * sines2[i] + sines2[i+6]);
	}
	let tPosX = scale * 100 * cm * tX.reduce((a, b) => a + b, 0);
	let tPosY = scale * 100 * cm * tY.reduce((a, b) => a + b, 0);
	target.setPos([tPosX, tPosY]);

	// change target color if the cursor is inside the target
	if (target.contains(cursor))
	    target.setFillColor(new Color('yellow'));
	else
	    target.setFillColor(new Color([0.2, 0.2, 0.2]));

	// store cursor and target data
	data.push([t, cPosX, cPosY]);

	if (t > 2) {
	    allData.push(data);
	    console.log(allData);
	    
	    trial += 1;
	    continueRoutine = false;
	    target.setAutoDraw(false);
	    cursor.setAutoDraw(false);
	    waitTimer.reset();
	}
	
	// update/draw components on each frame
	// check for quit (typically the Esc key)
	if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
	    return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
	}
	
	// refresh the screen if continuing
	if (continueRoutine) {
	    return Scheduler.Event.FLIP_REPEAT;
	} else {
	    return Scheduler.Event.NEXT;
	}
    };
}

function intertrialInterval(trials) {
    return function () {
	mPos = mouse.getPos();
	cursor.setPos(mPos);
	if (waitTimer.getTime() > 1) {
	    data = [];
	    [sines[0], sines[1], sines[2], sines[3]] = [sines[3], sines[0], sines[1], sines[2]];
	    sines1 = sines[0];
	    sines2 = sines[1];
	    sines3 = sines[2];
	    sines4 = sines[3];
	    target.setPos([0, 0]);
	    perturbCursor = true;
	    routineTimer.reset();
	    return Scheduler.Event.NEXT;
	} else
	    return Scheduler.Event.FLIP_REPEAT;
    };
}

function downloadMessage(trials) {
    return function () {
	download.setAutoDraw(true);

	let keys = enter.getKeys({keyList: ['return']});
	
	if (Object.keys(keys).length === 1)
	    return Scheduler.Event.NEXT;
	else
	    return Scheduler.Event.FLIP_REPEAT;
    };
}


function quitPsychoJS(message, isCompleted) {
    document.body.style.cursor='default';
    download.setAutoDraw(false);
    
    for (const dat of allData) {
	// convert data into a `csv` content
	let csvContent = "data:text/csv;charset=utf-8,";
	dat.forEach(function(rowArray) {
	    let row = rowArray.join(",");
	    csvContent += row + "\r\n";
	});

	//calling the csv download via anchor tag(link) so we can provide a name for the file
	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.style.display = 'none';
	link.setAttribute("download", `Subj${expInfo.participant}_Day${expInfo.day}_Trial${trial}_${expInfo.date}.csv`);
	document.body.appendChild(link); // Required for FF
	link.click();
    }
    
    psychoJS.window.close();
    psychoJS.quit({message: message, isCompleted: isCompleted});
    
    return Scheduler.Event.QUIT;
}
