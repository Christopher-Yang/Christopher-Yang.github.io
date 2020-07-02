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

//------PARAMETERS TO CONTROL BLOCK STRUCTURE------//
const nTrials = 4; // total number of trials
const trialLength = 46; // how many seconds each trial lasts (set to desired time + 6 secs)
const perturbStart = 6; // which trial the cursor sines start (must be >= 2)
const mirrorStart = 5; // which trial to apply mirror reversal


//------------PSYCHOJS SETUP-------------//
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

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
for (let i=1; i<=nTrials; i++) {
    flowScheduler.add(trialRoutineBegin());
    flowScheduler.add(enterTarget());
    flowScheduler.add(tracking());
    flowScheduler.add(intertrialInterval());
    //    if (i === perturbStart-1 || i === mirrorStart-1)
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


//------------DETAILS OF TRIAL STRUCTURE------------//
let frameRate;
let frameDur;
function updateInfo() {
    expInfo['date'] = Clock.MonotonicClock.getDateStr();  // add a simple timestamp
    expInfo['expName'] = expName;
    expInfo['psychopyVersion'] = '2020.1.3';
    expInfo['OS'] = window.navigator.platform;

    // store frame rate of monitor if we can measure it successfully
    frameRate = psychoJS.window.getActualFrameRate();
    expInfo['frameRate'] = frameRate;
    if (typeof expInfo['frameRate'] !== 'undefined')
	frameDur = 1.0 / Math.round(expInfo['frameRate']);
    else
	frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

    // add info from the URL:
    util.addInfoFromUrl(expInfo);
    
    return Scheduler.Event.NEXT;
}


let sines = [new Array, new Array, new Array, new Array];
let tPosX;
let tPosY;
let cPosX;
let cPosY;
let time;
let Nstep;
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
let instructions3;
let instructions4;
let download;
let trialCounter;
let enter;
function experimentInit() {
    // Make mouse cursor invisible
    document.body.style.cursor='none';
    
    // Create some handy timers
    trialClock = new Clock.Clock(); // keeps time during each trial
    itiTimer = new Clock.Clock(); // keeps time for intertrial interval

    // Set parameters for sum of sines
    const freqs = [0.1, 0.15, 0.25, 0.35, 0.55, 0.65, 0.85, 0.95, 1.15, 1.45, 1.55, 1.85];
    const amplitudes = [0.023076923076923075, 0.023076923076923075, 0.023076923076923075, 0.023076923076923075, 0.023076923076923075, 0.023076923076923075, 0.01764705882352941, 0.015789473684210527, 0.013043478260869566, 0.010344827586206896, 0.009677419354838708, 0.008108108108108107];
    const phases = [-2.2973572091724623, 2.1829905511425176, 1.6573448103607546 ,-1.538946698747247, -0.02868219371247127, -0.3173569996006864, 0.9524867388833398, 1.8141023176943092, -2.551855477031973, -2.9634802056111047, 2.1096743676129526, -0.4224369710975715];
    let params = freqs.concat(amplitudes,phases);
    for (let i=0; i<36; i=i+4) { // sines contains all of the sinusoid parameters broken up into 4 different arrays
	sines[0].push(params[i]);
	sines[1].push(params[i+1]);
	sines[2].push(params[i+2]);
	sines[3].push(params[i+3]);
    }

    // Calculate units for centimeters
    let aRatioX = parseInt(expInfo['aspectRatio'].slice(0,expInfo['aspectRatio'].indexOf(':')));
    let aRatioY = parseInt(expInfo['aspectRatio'].slice(expInfo['aspectRatio'].indexOf(':')+1));
    let size = parseFloat(expInfo['size']);
    let diagonal = Math.sqrt(Math.pow(aRatioX,2) + Math.pow(aRatioY,2));
    let widthCm = 2.54 * size * aRatioX / diagonal; // physical width of monitor (cm)
    let heightCm = 2.54 * size * aRatioY / diagonal; // physical height of monitor (cm)
    cm = 1 / heightCm; // use this to convert height units to centimeters

    time = [...Array(frameRate*(trialLength)+20).keys()].map(a => a/frameRate);
    Nstep = time.length;

    tPosX = new Array(Nstep);
    tPosY = new Array(Nstep);
    cPosX = new Array(Nstep);
    cPosY = new Array(Nstep);
    
    for (let j=0; j<Nstep; j++) {
	let scale;
	let tX = new Array(3);
	let tY = new Array(3);
	let cX = new Array(3);
	let cY = new Array(3);
	
	if (time[j] < 5) {
	    scale = time[j]/5;
	} else {
	    scale = 1;
	}
	for (let i=0; i<3; i++) {
	    cX[i] = sines[0][i+3] * Math.cos(2 * Math.PI * time[j] * sines[0][i] + sines[0][i+6]);
	    cY[i] = sines[1][i+3] * Math.cos(2 * Math.PI * time[j] * sines[1][i] + sines[1][i+6]);
	    tX[i] = sines[2][i+3] * Math.cos(2 * Math.PI * time[j] * sines[2][i] + sines[2][i+6]);
	    tY[i] = sines[3][i+3] * Math.cos(2 * Math.PI * time[j] * sines[3][i] + sines[3][i+6]);
	}
	cPosX[j] = scale * 100 * cm * cX.reduce((a, b) => a + b);
	cPosY[j] = scale * 100 * cm * cY.reduce((a, b) => a + b);
	tPosX[j] = scale * 100 * cm * tX.reduce((a, b) => a + b);
	tPosY[j] = scale * 100 * cm * tY.reduce((a, b) => a + b);
    }
    
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

    instructions3 = new TextStim({
	win: psychoJS.window,
	name: 'instructions3',
	text: 'Click the target to begin the trial',
	alignHoriz: 'center',
	units: 'height',
	pos: [0, -4*cm],
	height: 0.7*cm,
	wrapWidth: true,
	color: new Color('white'),
    });

    instructions4 = new TextStim({
	win: psychoJS.window,
	name: 'instructions4',
	text: 'The cursor will no longer move randomly. But now left-right cursor movement will be flipped (mouse left -> cursor left). Still do your best to keep the cursor in the target\n\nPress the enter key to continue.',
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
	text: 'We will now download data from the experiment onto your computer.\n\nIf your browser asks you if you want to download multiple files, please click Yes.\n\nTo initiate the download, press the Enter key.',
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


let mirror = false;
let mPos;
let t;
let mouse = new Mouse({
    name: 'myMouse',
    win: psychoJS.window,
});
function trialRoutineBegin(trials) {
    return function () {
	//------Prepare to start trial------
	mPos = mouse.getPos();
	if (mirror)
	    cursor.setPos([-mPos[0], mPos[1]]);
	else
	    cursor.setPos(mPos);
	t = 0;
	
	// draw objects
	if (trial === 1)
	    instructions.setAutoDraw(true);
	else
	    instructions3.setAutoDraw(true);

	trialCounter.setText(`Trial ${trial}/${nTrials}`);
	target.setAutoDraw(true);
	cursor.setAutoDraw(true);

	return Scheduler.Event.NEXT;
    };
}

let timeCount;
let data = makeArray(5, 4000);
function enterTarget(trials) {
    //------Wait for participant to click in the target to start trial------
    return function () {
	mPos = mouse.getPos();

	if (mirror)
	    cursor.setPos([-mPos[0], mPos[1]]);
	else
	    cursor.setPos(mPos);
	// cursor.setPos(mPos.map(pos => pos*0.7));

	if (target.contains(mouse) && mouse.getPressed()[0] == 1) {
	    if (trial === 1)
		instructions.setAutoDraw(false);
	    else {
		instructions3.setAutoDraw(false);
		if (trial === perturbStart)
		    instructions2.setAutoDraw(false);
		// else if (trial === mirrorStart)
		//     instructions4.setAutoDraw(false);
	    }
	    timeCount = 0;
	    trialClock.reset();
	    return Scheduler.Event.NEXT;
	} else
	    return Scheduler.Event.FLIP_REPEAT;
    };
}


let a;
let b;
let currentHit;
let lastHit = false;
let dataFilt;
// let cursorHistory = new Array(nTrials);
// let allData = new Array(nTrials);
function tracking(trials) {
    return function () {
	//------Sinusoidally perturb target (and cursor)------
	// if (typeof a != 'undefined') {
	//     console.timeEnd();
	// }
	// get current time
	b = trialClock.getTime();
	if (b-a > 0.05)
	    console.log(b-a);
	t = trialClock.getTime();
	let index = Math.round((t/trialLength)*frameRate*trialLength);
	
	// set cursor position
	mPos = mouse.getPos();
	let cX;
	let cY;
	if (perturbCursor && mirror) {
	    cX = -(mPos[0]+cPosX[index]);
	    cY = mPos[1]+cPosY[index];
	}
	else if (perturbCursor && !mirror) {
	    cX = mPos[0]+cPosX[index];
	    cY = mPos[1]+cPosY[index];
	}
	else if (!perturbCursor && mirror) {
	    cX = -mPos[0];
	    cY = mPos[1];
	}
	else {
	    cX = mPos[0];
	    cY = mPos[1];
	}
	cursor.setPos([cX, cY]);

	// set target position
	target.setPos([tPosX[index], tPosY[index]]);

	// change target color if the cursor is inside the target
	currentHit = target.contains(cursor);
	if (currentHit && currentHit != lastHit) {
	    target.setFillColor(new Color('darkorchid'));
	    lastHit = currentHit;
	} else if (!currentHit && currentHit != lastHit) { 
	    target.setFillColor(new Color([0.2, 0.2, 0.2]));
	    lastHit = currentHit;
	}

	a = trialClock.getTime();
	// store data
	data[0][timeCount] = t*cm;
	data[1][timeCount] = cX*cm;
	data[2][timeCount] = cY*cm;
	data[3][timeCount] = tPosX[index]*cm;
	data[4][timeCount] = tPosY[index]*cm;	
	b = trialClock.getTime();
	if (b-a > 0.05)
	    console.log(b-a);

	// check for quit (typically the Esc key)
	if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
	    return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
	}

	// refresh screen for trialLength seconds
	if (t <= trialLength) {
	    timeCount++;
	    a = trialClock.getTime();
	    return Scheduler.Event.FLIP_REPEAT;
	}

	// otherwise move to intertrial interval
	else {
	    // dataFilt = data.filter(d => {return d != null;});
	    // allData[trial-1] = dataFilt;
    	    // cursorHistory[trial-1] = perturbCursor;
	    timeCount = 0;
	    target.setAutoDraw(false);
	    cursor.setAutoDraw(false);
	    target.setPos([0, 0]); // reset target position to center of screen
	    target.setFillColor(new Color([0.2, 0.2, 0.2]));
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
	    psychoJS.experiment.addData('trial',trial);
	    psychoJS.experiment.addData('cursor sines',perturbCursor);
	    psychoJS.experiment.addData('time',data[0].filter(d => {return d != null;}));
	    psychoJS.experiment.addData('cursorX',data[1].filter(d => {return d != null;}));
	    psychoJS.experiment.addData('cursorY',data[2].filter(d => {return d != null;}));
	    psychoJS.experiment.addData('targetX',data[3].filter(d => {return d != null;}));
	    psychoJS.experiment.addData('targetY',data[4].filter(d => {return d != null;}));
	    psychoJS.experiment.nextEntry();
	    data = makeArray(5, 4000);
	    trial++;
	    
	    [sines[0], sines[1], sines[2], sines[3]] = [sines[3], sines[0], sines[1], sines[2]]; // exchange target and cursor sines
	    for (let j=0; j<Nstep; j++) {
		let scale;
		let tX = new Array(3);
		let tY = new Array(3);
		let cX = new Array(3);
		let cY = new Array(3);
		
		if (time[j] < 5) {
		    scale = time[j]/5;
		} else {
		    scale = 1;
		}
		for (let i =0; i<3; i++) {
		    cX[i] = sines[0][i+3] * Math.cos(2 * Math.PI * time[j] * sines[0][i] + sines[0][i+6]);
		    cY[i] = sines[1][i+3] * Math.cos(2 * Math.PI * time[j] * sines[1][i] + sines[1][i+6]);
		    tX[i] = sines[2][i+3] * Math.cos(2 * Math.PI * time[j] * sines[2][i] + sines[2][i+6]);
		    tY[i] = sines[3][i+3] * Math.cos(2 * Math.PI * time[j] * sines[3][i] + sines[3][i+6]);
		}
		cPosX[j] = scale * 100 * cm * cX.reduce((a, b) => a + b);
		cPosY[j] = scale * 100 * cm * cY.reduce((a, b) => a + b);
		tPosX[j] = scale * 100 * cm * tX.reduce((a, b) => a + b);
		tPosY[j] = scale * 100 * cm * tY.reduce((a, b) => a + b);
	    }

	    
	    if (trial === perturbStart) { // at trial "perturbStart," display new instructions to participant
		perturbCursor = true;
		instructions2.setAutoDraw(true);
	    // } else if (trial === mirrorStart) {
	    // 	mirror = true;
	    // 	perturbCursor = false;
	    // 	instructions4.setAutoDraw(true);
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
	    if (trial === perturbStart)
		instructions2.setAutoDraw(false);
	    // else if (trial === mirrorStart)
	    // 	instructions4.setAutoDraw(false);
	    return Scheduler.Event.NEXT;
	}
	else
	    return Scheduler.Event.FLIP_REPEAT;
    };
}


function quitPsychoJS(message, isCompleted) {
    //------Download data and end experiment------

    // make the mouse cursor visible again
    document.body.style.cursor='default';
    download.setAutoDraw(false);
    // loop for downloading data from each trial in separate csv file
    // for (const dat of allData) {
	// psychoJS.experiment.addData('trial',dat);
	// // convert data into a `csv` content
	// let csvContent = "data:text/csv;charset=utf-8,";
	// csvContent += `cursor_sines?,${cursorHistory[j]}\r\ntime,cursorX,cursorY,targetX,targetY\r\n`;
	// j++;
	// dat.forEach(function(rowArray) {
	//     let row = rowArray.join(",");
	//     csvContent += row + "\r\n";
	// });

	// var encodedUri = encodeURI(csvContent);
	// var link = document.createElement("a");
	// link.setAttribute("href", encodedUri);
	// link.style.display = 'none';
	// link.setAttribute("download", `Subj${expInfo.participant}_Day${expInfo.day}_Trial${j}_${expInfo.date}.csv`);
	// document.body.appendChild(link); // Required for FF
	// link.click();
    // }

    // Check for and save orphaned data
    if (psychoJS.experiment.isEntryEmpty()) {
	psychoJS.experiment.nextEntry();
    }
    
    psychoJS.window.close();
    psychoJS.quit({message: message, isCompleted: isCompleted});
    
    return Scheduler.Event.QUIT;
}


function makeArray(d1, d2) {
    let arr = [];
    for(let i = 0; i < d1; i++) {
	arr.push(new Array(d2));
    }
    return arr;
}    
