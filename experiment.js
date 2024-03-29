﻿/********* 
 *  Test *
 *********/

import { PsychoJS } from '../lib/core-2020.1.js';
import { Scheduler } from '../lib/util-2020.1.js';
import { Color } from '../lib/util-2020.1.js';
import { Clock } from '../lib/util-2020.1.js';
import { MonotonicClock } from '../lib/util-2020.1.js';
import * as util from '../lib/util-2020.1.js';
import { Mouse } from '../lib/core-2020.1.js';
import { Polygon } from '../lib/visual-2020.1.js';
import { TextStim } from '../lib/visual-2020.1.js';
import { Keyboard } from '../lib/core-2020.1.js';

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

// get canvas to view use requestPointerLock (gets raw mouse position)
let canvas = psychoJS.window._renderer.view;
canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;

// set length of trial in seconds (set desired time + 6 secs)
const trialLength = 10;

// store info about the experiment session:
let expName = 'Tracking';  // from the Builder filename that created this script
let expInfo = {'participant': '', 'size': ''};

// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
    text: "Welcome to the experiment. Please make sure you are using either Chrome or Firefox to run the experiment. Please enter a random number for your participant number and the diagonal length of your computer monitor (in inches). Press 'Ok' when you are ready to begin.",
    dictionary: expInfo,
    title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
// argument to tracking() is as follows:
// 0: tutorial block
// 1: regular block
// 2: last block to download data
//
// argument to p2p() is as follows:
// 0: tutorial block
// 1: baseline block that initiates mirror reversal
// 2: p2p block that transitions to another p2p block
// 3: p2p block that transitions to tracking
flowScheduler.add(updateInfo);
flowScheduler.add(experimentInit);
flowScheduler.add(fullscreenTutorial);
flowScheduler.add(click);
flowScheduler.add(taskTutorial);
flowScheduler.add(tracking(0));
flowScheduler.add(p2p(0));
// flowScheduler.add(tracking(1));
// flowScheduler.add(p2p(1));
// flowScheduler.add(tracking(1));
// flowScheduler.add(p2p(2));
// flowScheduler.add(p2p(2));
// flowScheduler.add(p2p(2));
// flowScheduler.add(p2p(3));
// flowScheduler.add(tracking(1));
// flowScheduler.add(p2p(2));
// flowScheduler.add(p2p(2));
// flowScheduler.add(p2p(2));
// flowScheduler.add(p2p(3));
// flowScheduler.add(tracking(1));
// flowScheduler.add(p2p(2));
// flowScheduler.add(p2p(2));
// flowScheduler.add(p2p(2));
// flowScheduler.add(p2p(3));
// flowScheduler.add(tracking(2));
flowScheduler.add(wait);
flowScheduler.add(quitPsychoJS, 'Thank you for your patience, the data has finished downloading. You may now close this webpage.', true);

// count the total number of blocks to perform
const tasks = flowScheduler._taskList;
let nBlocks = 0;
for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].name=="")
	nBlocks++;
}

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
    expName: expName,
    expInfo: expInfo,
});

//------------DETAILS OF TRIAL STRUCTURE------------//
function updateInfo() {
    const browser = detectBrowser(); // detect browser

    expInfo['date'] = MonotonicClock.getDateStr();  // add a simple timestamp
    expInfo['expName'] = expName;
    expInfo['psychopyVersion'] = '2020.1.3';
    expInfo['OS'] = window.navigator.platform;
    expInfo['browser'] = browser;
    expInfo['browserInfo'] = window.navigator.userAgent;
    util.addInfoFromUrl(expInfo); // add info from URL
    return Scheduler.Event.NEXT;
}


let x = 0.2;
let y = 0;
let height2cm;
let cm2height;
let pix2height;
let trialClock;
let stationaryTimer;
let displayTimer;
let cursor;
let target;
let instructions;
let goodJob;
let stayInstructions;
let centerText;
let pressEnter;
let trialCounter;
let fullScreenReminder;
let blockCounter;
let keyboard;
let mouse;
let moveOn;
let heightLim;
let widthLim;
let targetRadius;
function experimentInit() {
    // Make mouse cursor invisible
    document.body.style.cursor='none';
    
    // Create some handy timers
    trialClock = new Clock(); // keeps time during each trial
    stationaryTimer = new Clock(); // keeps time for interval between p2p reaches
    displayTimer = new Clock();

    // Calculate screen aspect ratio
    let aRatioX;
    let aRatioY;
    let resratio = (window.screen.width/window.screen.height);
    if (1.32 < resratio && resratio < 1.34) {
	aRatioX = 4;
	aRatioY = 3;
    } else if (1.77 < resratio && resratio < 1.79) {
	aRatioX = 16;
	aRatioY = 9;
    } else if (1.59 < resratio && resratio < 1.61) {
	aRatioX = 16;
	aRatioY = 10;
    } else {
	aRatioX = Math.round(resratio * 100) / 100;
	aRatioY = 1;
    }
    expInfo['aspectRatio'] = aRatioX + ':' + aRatioY;

    // Calculate units for centimeters
    let size = parseFloat(expInfo['size']);
    let diagonal = Math.sqrt(Math.pow(aRatioX,2) + Math.pow(aRatioY,2));
    let widthCm = 2.54 * size * aRatioX / diagonal; // physical width of monitor (cm)
    let heightCm = 2.54 * size * aRatioY / diagonal; // physical height of monitor (cm)

    if (aRatioX > aRatioY) {
	heightLim = 0.5;
	widthLim = (aRatioX / aRatioY) / 2;
    } else if (aRatioX < aRatioY) {
	heightLim = (aRatioY / aRatioX) / 2;
	widthLim = 0.5;
    } else {
	heightLim = 0.5;
	widthLim = 0.5;
    }
    
    height2cm = heightCm; // use this to convert height units to centimeters
    cm2height = 1 / heightCm; // use this to convert centimeters to height units
    pix2height = 1 / window.screen.height;
    expInfo['cmConvert'] = cm2height;

    // Create display objects
    cursor = new Polygon ({
	win: psychoJS.window,
	name: 'cursor',
	units : 'height',
	pos: [0, 0],
	lineWidth: 0,
	fillColor: new Color('white'),
	edges: 32,
	radius: 0.1*cm2height,
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
	radius: 0.5*cm2height,
    });
    targetRadius = target.radius;

    goodJob = new TextStim({
	win: psychoJS.window,
	name: 'goodJob',
	alignHoriz: 'center',
	units: 'norm',
	pos: [0, 0],
	height: 0.06,
	wrapWidth: true,
	color: new Color('white'),
    });

    stayInstructions = new TextStim({
	win: psychoJS.window,
	name: 'stayInstructions',
	text: 'Stay in the target to make it move to a new location.',
	alignHoriz: 'center',
	units: 'norm',
	pos: [0, -0.75],
	height: 0.075,
	wrapWidth: true,
	color: new Color('white'),
    });

    instructions = new TextStim({
	win: psychoJS.window,
	name: 'instructions',
	alignHoriz: 'center',
	units: 'norm',
	pos: [0, -0.4],
	height: 0.06,
	wrapWidth: true,
	color: new Color('white'),
    });
    
    centerText = new TextStim({
	win: psychoJS.window,
	name: 'centerText',
	alignHoriz: 'center',
	units: 'norm',
	pos: [0, 0],
	height: 0.06,
	wrapWidth: true,
	color: new Color('white'),
    });
    
    pressEnter = new TextStim({
	win: psychoJS.window,
	name: 'p2p_tracking',
	text: 'Press the "Enter" key to continue.',
	alignHoriz: 'center',
	units: 'norm',
	pos: [0, -0.55],
	height: 0.06,
	wrapWidth: true,
	color: new Color('white'),
    });
    
    trialCounter = new TextStim({
	win: psychoJS.window,
	name: 'trialCounter',
	text: 'Trial 0/2',
	alignHoriz: 'center',
	units: 'norm',
	pos: [0.83, 0.85],
	height: 0.075,
	wrapWidth: true,
	color: new Color('white'),
	options: true
    });

    fullScreenReminder = new TextStim({
	win: psychoJS.window,
	name: 'fullScreenReminder',
	text: `f: full screen`,
	alignHoriz: 'center',
	units: 'norm',
	pos: [-0.78, 0.85],
	height: 0.075,
	wrapWidth: true,
	color: new Color('white'),
	options: true
    });
    
    blockCounter = new TextStim({
	win: psychoJS.window,
	name: 'blockCounter',
	text: `Block 0/${nBlocks}`,
	alignHoriz: 'center',
	units: 'norm',
	pos: [0, 0.85],
	height: 0.075,
	wrapWidth: true,
	color: new Color('white'),
	options: true
    });

    keyboard = new Keyboard({
	psychoJS: psychoJS
    });

    mouse = new Mouse({
	name: 'myMouse',
	win: psychoJS.window,
	autoLog: false
    });
    
    if (expInfo['size'] == '') {
	psychoJS.quit({message: 'You did not provide your screen size. Please refresh the page and type it into the "size" field. You may delete the data file that was just downloaded to your computer.'});
	return Scheduler.Event.QUIT;
    }

    centerText.setText('This experiment must be performed in full screen. If the experiment window exits full screen during the experiment (by pressing "Esc"), press the "f" key on your keyboard to reenter full screen mode. Try pressing "Esc" and "f" now.');
    centerText.setAutoDraw(true);
    moveOn = false;
    return Scheduler.Event.NEXT;
}


let start;
function fullscreenTutorial() {
    // allow participant to reenter fullscreen by pressing 'f'
    let keys = keyboard.getKeys({keyList: ['f']});
    if (Object.keys(keys).length === 1) {
	psychoJS.window.adjustScreenSize();
	moveOn = true;

	if (pressEnter.autoDraw === false) {
	    pressEnter.setAutoDraw(true);
	    keyboard.clearEvents();
	}

    }

    // if 'f' is pressed, allow participant to move on to next block
    if (moveOn) {

	// move on if 'return' is pressed
	keys = keyboard.getKeys({keyList: ['return']});
	if (Object.keys(keys).length === 1) {

	    // begin monitoring mouse position
	    canvas.onclick = function() {
		canvas.requestPointerLock();
	    };
	    document.addEventListener('pointerlockchange', lockChangeAlert, false);
	    document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

	    // change displayed objects
	    centerText.setText('Please use a computer mouse to complete this experiment. If your mouse is not currently connected, please connect it now. If you do not have a computer mouse, you will not be able to complete the experiment.\n\nPlease make sure you have a clear space to move your mouse about 8-10 inches horizontally and vertically.\n\nClick the left mouse button to make your cursor appear.');
	    pressEnter.setAutoDraw(false);
	    fullScreenReminder.setAutoDraw(true);
	    return Scheduler.Event.NEXT;
	}
    }
    return Scheduler.Event.FLIP_REPEAT;
}


function click() {
    // allow participant to reenter fullscreen by pressing 'f'
    let keys = keyboard.getKeys({keyList: ['f']});
    if (Object.keys(keys).length === 1)
	psychoJS.window.adjustScreenSize();

    // move onto next block if LMB is pressed
    if (mouse.getPressed()[0] == 1) {
	centerText.setText(`This experiment will be divided into ${nBlocks} blocks of trials, and in each block, you will perform one of two tasks: 1) a tracking task, and 2) a point-to-point reaching task. You can keep track of which block and trial of the experiment you are currently in at the top of the screen.\n\nThe experiment will take about 60-90 mins to complete. There will be sections during the experiment where you can take a short break if you wish to. Please do not take breaks unless the experiment notifies you that you can do so.\n\nBefore the real experiment starts, we will let you try out both tasks, starting with the tracking task.`);

	// change display objects
	trialCounter.setAutoDraw(true);
	blockCounter.setAutoDraw(true);
	cursor.setAutoDraw(true);
	displayTimer.reset();
	trialClock.reset();
	start = trialClock.getTime();
	return Scheduler.Event.NEXT;
    }
    return Scheduler.Event.FLIP_REPEAT;
}


let frameRate;
let time;
let Nstep;
let timeCount = 0;
let timeBetweenFrames = new Array(240*20); // 240 Hz * 20 seconds
function taskTutorial() {
    // allow participant to reenter fullscreen by pressing 'f'
    let keys = keyboard.getKeys({keyList: ['f']});
    if (Object.keys(keys).length === 1)
	psychoJS.window.adjustScreenSize();

    // draw cursor
    cursor.setPos([x, y]);
    
    // calculate time between frames
    if (timeCount < timeBetweenFrames.length) {
	let end = trialClock.getTime();
	timeBetweenFrames[timeCount] = end - start;
	start = end;
	timeCount++;
    }

    //  allow participant to move on if 10 secs have passed
    if (displayTimer.getTime() > 10) {
	if (pressEnter.autoDraw === false) {
	    pressEnter.setAutoDraw(true);
	    keyboard.clearEvents();
	}

	// move on if return key is pressed
	keys = keyboard.getKeys({keyList: ['return']});
	if (Object.keys(keys).length === 1) {

	    // calculate frame rate
	    timeBetweenFrames = timeBetweenFrames.filter(x => x != null);
	    let frameDur = timeBetweenFrames.reduce((a, b) => a + b) / timeBetweenFrames.length;
	    frameRate = Math.round(1 / frameDur);
	    expInfo['frameRate'] = frameRate;

	    // when to draw frames
	    time = [...Array(frameRate*(trialLength)+20).keys()].map(a => a/frameRate);
	    Nstep = time.length;

	    // change display objects
	    cursor.setAutoDraw(false); // must turn off cursor to ensure cursor is drawn over target
	    centerText.setAutoDraw(false);
	    pressEnter.setAutoDraw(false);
	    return Scheduler.Event.NEXT;
	}
    }

    return Scheduler.Event.FLIP_REPEAT;
}
    

let trialType;
let nTrials;
let tFile;
let tX_freq;
let tY_freq;
let tX_amp;
let tY_amp;
let tX_phase;
let tY_phase;
let cX_freq;
let cY_freq;
let cX_amp;
let cY_amp;
let cX_phase;
let cY_phase;
let freqs = new Array;
let amps = new Array;
let phases = new Array;
let data;
let extraData;
let extraCount;
let cX;
let cY;
let tPosX;
let tPosY;
let cPosX;
let cPosY;
let mirror = false;
let t;
let currentHit;
let lastHit;
let trialNumber;
let blockTracking = 0;
let totalBlockCounter = 1;
let state = 1;
function tracking(blockType) {
    return function () {
	// allow participant to reenter fullscreen by pressing 'f'
	let keys = keyboard.getKeys({keyList: ['f']});
	if (Object.keys(keys).length === 1)
	    psychoJS.window.adjustScreenSize();

	// mirror cursor position based on current block
	if (mirror) {
	    cX = y;
	    cY = x;
	} else {
	    cX = x;
	    cY = y;
	}

	//------Main loop for tracking task------
	switch (state) {

        //------Import sinusoid parameters------
	case 1:

	    // set types of tracking trials; numbers correspond to different mixtures of freqs, amps, and phases
	    if (blockType) // trial type order for main experiment
		// trialType = [1, 2, 1, 2, 3, 4, 3, 4];
		// trialType = [5, 5, 5, 5];
		trialType = [1, 2, 3, 4, 1, 2, 3, 4];
	    else // trial type order for tutorial
		// trialType = [1, 2];
		// trialType = [5, 5];
		trialType = [1, 2];
	    
	    nTrials = trialType.length; // total number of trials in the block
	    trialNumber = 1; // initialize current trial number

	    // import .csv file contianing sinusoid parameters
	    tFile = [];
	    $.ajax({
		url: `../tFiles/tracking${blockTracking}.csv`,
		dataType: 'text',
		async: false,
	    }).done(parseCSV);

	    // store sinusoid parameters in variables
	    freqs = [];
	    amps = [];
	    phases = [];
	    for (let i=0; i<tFile.length; i++) {
		freqs.push(tFile[i].freq);
		amps.push(tFile[i].amp);
		phases.push(tFile[i].phase);
	    }
	    
	    state = 2;
	    blockCounter.setText(`Block ${totalBlockCounter}/${nBlocks}`); // update display of current block
	    return Scheduler.Event.FLIP_REPEAT;
	    break;
	    
        //------Prepare to start trial------
	case 2:

	    // preallocate variables for storing data
	    data = makeArray(9, Nstep+frameRate*2);
	    extraData = makeArray(9, frameRate*2);
	    extraCount = 0; // index for storing data into extraData

	    // set target and cursor position
	    target.setPos([0, 0]); // set target to center of screen
	    cursor.setPos([cX, cY]);
	    
	    // preallocate variables for sum of sines perturbations
	    tPosX = new Array(Nstep); // perturbation to target position
	    tPosY = new Array(Nstep);
	    cPosX = new Array(Nstep); // perturbation to cursor position
	    cPosY = new Array(Nstep);

	    // set sinusoid parameters based on trial type
	    switch(trialType[trialNumber-1]) {

	    // target and cursor sinusoids (set 1)
	    case 1: 
		tX_freq = freqs.filter((a, index) => index%4 == 0);
		tY_freq = freqs.filter((a, index) => index%4 == 2);
		tX_amp = amps.filter((a, index) => index%4 == 0);
		tY_amp = amps.filter((a, index) => index%4 == 2);
		tX_phase = phases.filter((a, index) => index%4 == 0);
		tY_phase = phases.filter((a, index) => index%4 == 2);

		cX_freq = freqs.filter((a, index) => index%4 == 1);
		cY_freq = freqs.filter((a, index) => index%4 == 3);
		cX_amp = amps.filter((a, index) => index%4 == 1);
		cY_amp = amps.filter((a, index) => index%4 == 3);
		cX_phase = phases.filter((a, index) => index%4 == 1);
		cY_phase = phases.filter((a, index) => index%4 == 3);
		break;

	    // target and cursor sinusoids (set 2)
	    case 2:
		tX_freq = freqs.filter((a, index) => index%4 == 1);
		tY_freq = freqs.filter((a, index) => index%4 == 3);
		tX_amp = amps.filter((a, index) => index%4 == 1);
		tY_amp = amps.filter((a, index) => index%4 == 3);
		tX_phase = phases.filter((a, index) => index%4 == 1);
		tY_phase = phases.filter((a, index) => index%4 == 3);

		cX_freq = freqs.filter((a, index) => index%4 == 2);
		cY_freq = freqs.filter((a, index) => index%4 == 0);
		cX_amp = amps.filter((a, index) => index%4 == 2);
		cY_amp = amps.filter((a, index) => index%4 == 0);
		cX_phase = phases.filter((a, index) => index%4 == 2);
		cY_phase = phases.filter((a, index) => index%4 == 0);
		break;

	    // target and cursor sinusoids (set 3)
	    case 3: 
		tX_freq = freqs.filter((a, index) => index%4 == 2);
		tY_freq = freqs.filter((a, index) => index%4 == 0);
		tX_amp = amps.filter((a, index) => index%4 == 2);
		tY_amp = amps.filter((a, index) => index%4 == 0);
		tX_phase = phases.filter((a, index) => index%4 == 0);
		tY_phase = phases.filter((a, index) => index%4 == 2);

		cX_freq = freqs.filter((a, index) => index%4 == 3);
		cY_freq = freqs.filter((a, index) => index%4 == 1);
		cX_amp = amps.filter((a, index) => index%4 == 3);
		cY_amp = amps.filter((a, index) => index%4 == 1);
		cX_phase = phases.filter((a, index) => index%4 == 1); // change mod operation to change phases for the frequencies
		cY_phase = phases.filter((a, index) => index%4 == 3); // if phases aren't changed, case 3 will be mirror reversal of case 1
		break;

	    // target and cursor sinusoids (set 4)
	    case 4:
		tX_freq = freqs.filter((a, index) => index%4 == 3);
		tY_freq = freqs.filter((a, index) => index%4 == 1);
		tX_amp = amps.filter((a, index) => index%4 == 3);
		tY_amp = amps.filter((a, index) => index%4 == 1);
		tX_phase = phases.filter((a, index) => index%4 == 1);
		tY_phase = phases.filter((a, index) => index%4 == 3);

		cX_freq = freqs.filter((a, index) => index%4 == 0);
		cY_freq = freqs.filter((a, index) => index%4 == 2);
		cX_amp = amps.filter((a, index) => index%4 == 0);
		cY_amp = amps.filter((a, index) => index%4 == 2);
		cX_phase = phases.filter((a, index) => index%4 == 2); // if phases aren't changed, case 4 will be mirror reversal of case 2
		cY_phase = phases.filter((a, index) => index%4 == 0);
		break;

	    // target sinusoids only
	    case 5:
		tX_freq = freqs.filter((a, index) => index%2 == 0);
		tY_freq = freqs.filter((a, index) => index%2 == 1);
		tX_amp = amps.filter((a, index) => index%2 == 0);
		tY_amp = amps.filter((a, index) => index%2 == 1);
		tX_phase = phases.filter((a, index) => index%2 == 0);
		tY_phase = phases.filter((a, index) => index%2 == 1);

		cX_freq = new Array(6).fill(0);
		cY_freq = new Array(6).fill(0);
		cX_amp = new Array(6).fill(0);
		cY_amp = new Array(6).fill(0);
		cX_phase = new Array(6).fill(0);
		cY_phase = new Array(6).fill(0);
		break;

	    // cursor sinusoids only
	    case 6:
		tX_freq = new Array(6).fill(0);
		tY_freq = new Array(6).fill(0);
		tX_amp = new Array(6).fill(0);
		tY_amp = new Array(6).fill(0);
		tX_phase = new Array(6).fill(0);
		tY_phase = new Array(6).fill(0);

		cX_freq = freqs.filter((a, index) => index%2 == 0);
		cY_freq = freqs.filter((a, index) => index%2 == 1);
		cX_amp = amps.filter((a, index) => index%2 == 0);
		cY_amp = amps.filter((a, index) => index%2 == 1);
		cX_phase = phases.filter((a, index) => index%2 == 0);
		cY_phase = phases.filter((a, index) => index%2 == 1);
	    }

	    // loop through all time points to build 2D sum-of-sines
	    for (let j=0; j<Nstep; j++) {
		let scale;

		// linear ramp for first 5 secs of trajectory
		if (time[j] < 5) {
		    scale = time[j]/5;
		} else {
		    scale = 1;
		}

		// create sinusoids for individual frequencies
		let tX_all = tX_amp.map((a, i) => a * Math.cos(2 * Math.PI * time[j] * tX_freq[i] + tX_phase[i]));
		let tY_all = tY_amp.map((a, i) => a * Math.cos(2 * Math.PI * time[j] * tY_freq[i] + tY_phase[i]));
		let cX_all = cX_amp.map((a, i) => a * Math.cos(2 * Math.PI * time[j] * cX_freq[i] + cX_phase[i]));
		let cY_all = cY_amp.map((a, i) => a * Math.cos(2 * Math.PI * time[j] * cY_freq[i] + cY_phase[i]));

		// add the individual sinusoids to create sum-of-sinusoids
		cPosX[j] = scale * cm2height * cX_all.reduce((a, b) => a + b);
		cPosY[j] = scale * cm2height * cY_all.reduce((a, b) => a + b);
		tPosX[j] = scale * cm2height * tX_all.reduce((a, b) => a + b);
		tPosY[j] = scale * cm2height * tY_all.reduce((a, b) => a + b);
	    }

	    // tracking instructions for main experiment
	    if (blockType) { 
		instructions.setText('Click the target to begin the trial');
	    }
	    
	    // tracking instructions for tutorial block
	    else {

		// first tracking tutorial
		if (trialNumber == 1)
		    instructions.setText('In the tracking task, you will use a cursor (white dot) to track a moving target (grey circle) for ~45 seconds. During the trial, both the target and cursor will move randomly. Try your best to counteract the random cursor movement and keep your cursor inside the target for as long as possible.\n\nThis task is designed to be very difficult so just do the best you can. Click the target to try out the task.');
		    // instructions.setText('In the tracking task, you will use a cursor (white dot) to track a moving target (grey circle) for ~45 seconds. During the trial, the target will move randomly on the screen. Try your best to keep your cursor inside the target for as long as possible.\n\nThis task is designed to be very difficult so just try your best. Click the target to try out the task.');

		// second tracking tutorial
		else
		    instructions.setText('Try the tracking task one more time. Click the target to begin the trial.');
	    }

	    // draw objects
	    trialCounter.setText(`Trial ${trialNumber}/${nTrials}`);
	    instructions.setAutoDraw(true);
	    target.setAutoDraw(true);
	    cursor.setAutoDraw(true);
	    state = 3;
	    lastHit = false; // keeps track of history of cursor being inside target
	    return Scheduler.Event.FLIP_REPEAT;
	    break;

	//------Wait for participant to click in the target to start trial------
	case 3:
	    
	    // set cursor position
	    cursor.setPos([cX, cY]);

	    // start trial if participant clicks target
	    if (target.contains(cursor) && mouse.getPressed()[0] == 1) {
		if (instructions.autoDraw == true)
		    instructions.setAutoDraw(false);
		
		trialClock.reset(); // reset clock for tracking how long the trials has lasted

		// store data at time of trial initiation
		data[0][0] = Math.round(trialClock.getTime() * 100000) / 100000;
		data[1][0] = Math.round(cX * height2cm * 100000) / 100000;
		data[2][0] = Math.round(cY * height2cm * 100000) / 100000;
		data[3][0] = Math.round(x * height2cm * 100000) / 100000;
		data[4][0] = Math.round(y * height2cm * 100000) / 100000;
		data[5][0] = Math.round(tPosX[0] * 100000) / 100000;
		data[6][0] = Math.round(tPosY[0] * 100000) / 100000;
		data[7][0] = Math.round(cPosX[0] * height2cm * 100000) / 100000;
		data[8][0] = Math.round(cPosY[0] * height2cm * 100000) / 100000;

		state = 4;
	    }	    
	    return Scheduler.Event.FLIP_REPEAT;
	    break;

	    
	//------Sinusoidally perturb target (and cursor)------
	case 4:
	    // make cursor invisible again if it has reappeared
	    if (document.body.style.cursor != 'none')
		document.body.style.cursor='none';
	    
	    // find index of data array that is closest to current time
	    t = trialClock.getTime();
	    let index = Math.round(t*frameRate);

	    // set cursor and target positions
	    cursor.setPos([cX + cPosX[index], cY + cPosY[index]]);
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

	    // store data
	    if (typeof data[0][index] == 'undefined') {
		data[0][index] = Math.round(t * 100000) / 100000;
		data[1][index] = Math.round(cX * height2cm * 100000) / 100000;
		data[2][index] = Math.round(cY * height2cm * 100000) / 100000;
		data[3][index] = Math.round(x * height2cm * 100000) / 100000;
		data[4][index] = Math.round(y * height2cm * 100000) / 100000;
		data[5][index] = Math.round(tPosX[index] * height2cm * 100000) / 100000;
		data[6][index] = Math.round(tPosY[index] * height2cm * 100000) / 100000;
		data[7][index] = Math.round(cPosX[index] * height2cm * 100000) / 100000;
		data[8][index] = Math.round(cPosY[index] * height2cm * 100000) / 100000;
	    } else {
		extraData[0][extraCount] = Math.round(t * 100000) / 100000;
		extraData[1][extraCount] = Math.round(cX * height2cm * 100000) / 100000;
		extraData[2][extraCount] = Math.round(cY * height2cm * 100000) / 100000;
		extraData[3][extraCount] = Math.round(x * height2cm * 100000) / 100000;
		extraData[4][extraCount] = Math.round(y * height2cm * 100000) / 100000;
		extraData[5][extraCount] = Math.round(tPosX[index] * height2cm * 100000) / 100000;
		extraData[6][extraCount] = Math.round(tPosY[index] * height2cm * 100000) / 100000;
		extraData[7][extraCount] = Math.round(cPosX[index] * height2cm * 100000) / 100000;
		extraData[8][extraCount] = Math.round(cPosY[index] * height2cm * 100000) / 100000;
		extraCount++;
	    }

	    // check for quit (typically the Esc key)
	    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
		return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
	    }

	    // end trial after trialLength seconds
	    if (t > trialLength) {
		target.setAutoDraw(false);
		cursor.setAutoDraw(false);
		target.setFillColor(new Color([0.2, 0.2, 0.2]));
		displayTimer.reset();
		state = 5;
	    }
	    
	    return Scheduler.Event.FLIP_REPEAT;
	    break;

        //------Tell the participant good job------
	case 5:

	    // display good job message for 1 second
	    if (displayTimer.getTime() > 0.5 && goodJob.autoDraw === false) {
		goodJob.setText('Trial complete, good job!');
		goodJob.setAutoDraw(true);
	    }

	    // move on to next block after 1.5 seconds
	    if (displayTimer.getTime() > 1.5) {
		goodJob.setAutoDraw(false);
		displayTimer.reset();
		state = 6;
	    }

	    return Scheduler.Event.FLIP_REPEAT;
	    break;

        //------Wait for a few seconds before moving to next part of experiment------
	case 6:
	    if (displayTimer.getTime() > 1) {
		// calculate idx and idx2, the last indices in data and extraData which are not null
		let idx = data[0].length;
		while (idx-- && !data[0][idx]);

		let idx2 = extraData[0].length;
		while (idx2-- && !extraData[0][idx2]);

		// store data in .csv
		if (blockType) {
		    psychoJS.experiment.addData('task','tracking');
		    psychoJS.experiment.addData('block',blockTracking);
		} else {
		    psychoJS.experiment.addData('task','tracking (tutorial)');
		    psychoJS.experiment.addData('block',0);
		}
		psychoJS.experiment.addData('trialType',trialType[trialNumber-1]);
		psychoJS.experiment.addData('mirror',mirror);
		psychoJS.experiment.addData('time',data[0].slice(0,idx+1));
		psychoJS.experiment.addData('cursorX',data[1].slice(0,idx+1));
		psychoJS.experiment.addData('cursorY',data[2].slice(0,idx+1));
		psychoJS.experiment.addData('handX',data[3].slice(0,idx+1));
		psychoJS.experiment.addData('handY',data[4].slice(0,idx+1));
		psychoJS.experiment.addData('targetX',data[5].slice(0,idx+1));
		psychoJS.experiment.addData('targetY',data[6].slice(0,idx+1));
		psychoJS.experiment.addData('cursorX_input',data[7].slice(0,idx+1));
		psychoJS.experiment.addData('cursorY_input',data[8].slice(0,idx+1));
		psychoJS.experiment.addData('extraTime',extraData[0].slice(0,idx2+1));
		psychoJS.experiment.addData('extraCursorX',extraData[1].slice(0,idx2+1));
		psychoJS.experiment.addData('extraCursorY',extraData[2].slice(0,idx2+1));
		psychoJS.experiment.addData('extraHandX',extraData[3].slice(0,idx2+1));
		psychoJS.experiment.addData('extraHandY',extraData[4].slice(0,idx2+1));
		psychoJS.experiment.addData('extraTargetX',extraData[5].slice(0,idx2+1));
		psychoJS.experiment.addData('extraTargetY',extraData[6].slice(0,idx2+1));
		psychoJS.experiment.addData('extraCursorX_input',extraData[7].slice(0,idx2+1));
		psychoJS.experiment.addData('extraCursorY_input',extraData[8].slice(0,idx2+1));
		psychoJS.experiment.addData('tX_freq',tX_freq);
		psychoJS.experiment.addData('tY_freq',tY_freq);
		psychoJS.experiment.addData('tX_amp',tX_amp);
		psychoJS.experiment.addData('tY_amp',tY_amp);
		psychoJS.experiment.addData('tX_phase',tX_phase);
		psychoJS.experiment.addData('tY_phase',tY_phase);
		psychoJS.experiment.addData('cX_freq',cX_freq);
		psychoJS.experiment.addData('cY_freq',cY_freq);
		psychoJS.experiment.addData('cX_amp',cX_amp);
		psychoJS.experiment.addData('cY_amp',cY_amp);
		psychoJS.experiment.addData('cX_phase',cX_phase);
		psychoJS.experiment.addData('cY_phase',cY_phase);
		psychoJS.experiment.nextEntry();

		trialNumber++; // increment trial number

		// decide message for transitioning out of tracking task
		if (trialNumber == nTrials+1) {
		    if (blockType == 1) {

			// transition to first point-to-point after introducing new mapping
			if (blockTracking == 2)
			    centerText.setText('You will now do the point-to-point reaching task using the new cursor mapping you just experienced. This task is designed to be very difficult, but just try your best to reach towards each target in a straight line, as quickly and accurately as possible.');

			// transition to point-to-point in other blocks
			else
			    centerText.setText('We will now move to the point-to-point reaching task. Remember to reach towards each target in a straight line, as quickly and accurately as possible.');
		    }

		    // transition to end of experiment
		    else if (blockType == 2) {
			centerText.setText('We will now download data from the experiment onto your computer. The download process will take several minutes.\n\nIf your browser asks if you want to open or save the data, please click Save.');
		    }

		    // transition to point-to-point during tutorial blocks
		    else {
			centerText.setText('Now you will now try out the point-to-point reaching task.');
		    }
		    centerText.setAutoDraw(true);
		    displayTimer.reset();
		    state = 7;
		} else
	    	    state = 2;
	    }
	    return Scheduler.Event.FLIP_REPEAT;
	    break;

	//------Transition out of tracking task------
	case 7:
	    if (displayTimer.getTime() > 4) {
		if (pressEnter.autoDraw === false) {
		    pressEnter.setAutoDraw(true);
		    keyboard.clearEvents();
		}

		// move to next block if 'return' was pressed
		keys = keyboard.getKeys({keyList: ['return']});
		if (Object.keys(keys).length === 1) {
		    pressEnter.setAutoDraw(false);
		    if (blockType == 2) {
			centerText.setText('The download has started. Do not close or navigate away from this webpage. The experiment will transition to a new page once the download has completed.\n\nPlease wait for several minutes...');
			displayTimer.reset();
		    } else
			centerText.setAutoDraw(false);
		    state = 1;
		    totalBlockCounter++;
		    blockTracking++;
		    return Scheduler.Event.NEXT;
		}
	    }
	    return Scheduler.Event.FLIP_REPEAT;
	}
    };
}


let lastPos;
let lastTime;
let save;
let blockP2p = 0;
let begin;
let startX;
let startY;
function p2p(blockType) {
    return function () {
	// allow participant to reenter fullscreen by pressing 'f'
	let keys = keyboard.getKeys({keyList: ['f']});
	if (Object.keys(keys).length === 1)
	    psychoJS.window.adjustScreenSize();

	if (mirror) {
	    cX = y;
	    cY = x;
	} else {
	    cX = x;
	    cY = y;
	}

	switch (state) {

	//------Load target positions------
	case 1:
	    // set target and cursor positions
	    target.setPos([0, 0]);
	    cursor.setPos([cX, cY]);
	    
	    // get target positions
	    tFile = [];
	    $.ajax({
		url: `../tFiles/p2p${blockP2p}.csv`,
		dataType: 'text',
		async: false,
	    }).done(parseCSV);

	    // get number of trials
	    nTrials = tFile.length;
	    trialCounter.setText(`Trial 1/${nTrials}`);

	    // draw objects
	    target.setAutoDraw(true);
	    cursor.setAutoDraw(true);
	    blockCounter.setText(`Block ${totalBlockCounter}/${nBlocks}`);
	    if (blockType)
		instructions.setText('Click the target to begin the task.');
	    else
		instructions.setText('The target (grey circle) will appear at random locations on the screen. When a new target appears, move your cursor (white dot) towards it in a straight line as quickly and accurately as possible and click on it. The target will then move to a new location.\n\nClick the target to begin the task.');
	    instructions.setAutoDraw(true);
	    
	    state = 2;
	    return Scheduler.Event.FLIP_REPEAT;
	    break;

	//------Wait for participant to enter target------
	case 2:
	    // set cursor position
	    cursor.setPos([cX, cY]);

	    // if participant clicks target, begin block
	    if (target.contains(cursor) && mouse.getPressed()[0] == 1) {
		// set variables to track progress
		trialNumber = 1;
		extraCount = 0;
		startX = 0;
		startY = 0;

		// preallocate data
		data = makeArray(6, 60*frameRate);
		extraData = makeArray(6, 20*frameRate);

		// set new target position
		tPosX = tFile[trialNumber-1].xPos*cm2height;
		tPosY = tFile[trialNumber-1].yPos*cm2height;
		target.setPos([tPosX, tPosY]);

		instructions.setAutoDraw(false);
		begin = 0;
		state = 3;
		trialClock.reset();

		// store data at time of trial initiation
		data[0][0] = Math.round(trialClock.getTime() * 100000) / 100000;
		data[1][0] = Math.round(cX * height2cm * 100000) / 100000;
		data[2][0] = Math.round(cY * height2cm * 100000) / 100000;
		data[3][0] = Math.round(x * height2cm * 100000) / 100000;
		data[4][0] = Math.round(y * height2cm * 100000) / 100000;
		data[5][0] = 0;
	    }
	    return Scheduler.Event.FLIP_REPEAT;
	    break;

	//------Record position during reach------
	case 3:
	    // find index of data array that is closest to current time
	    t = trialClock.getTime();
	    let index = Math.round(t*frameRate);

	    // set cursor position
	    cursor.setPos([cX, cY]);
	    
	    let distance = Math.sqrt(Math.pow(startX - cX, 2) + Math.pow(startY - cY, 2));

	    // check to see whether cursor has left the target radius
	    if (distance > targetRadius && begin == 0)
		begin = 1;
	    
	    // store cursor position
	    if (typeof data[0][index] == 'undefined') {
		data[0][index] = Math.round(t * 100000) / 100000;
		data[1][index] = Math.round(cX * height2cm * 100000) / 100000;
		data[2][index] = Math.round(cY * height2cm * 100000) / 100000;
		data[3][index] = Math.round(x * height2cm * 100000) / 100000;
		data[4][index] = Math.round(y * height2cm * 100000) / 100000;
		data[5][index] = begin;
	    } else {
		extraData[0][extraCount] = Math.round(t * 100000) / 100000;
		extraData[1][extraCount] = Math.round(cX * height2cm * 100000) / 100000;
		extraData[2][extraCount] = Math.round(cY * height2cm * 100000) / 100000;
		extraData[3][extraCount] = Math.round(x * height2cm * 100000) / 100000;
		extraData[4][extraCount] = Math.round(y * height2cm * 100000) / 100000;
		extraData[5][extraCount] = begin;
	    }

	    // transition to next trial if participant clicks the target
	    if (target.contains(cursor) && mouse.getPressed()[0] == 1) {
		// measure last recorded time and position to compute speed
		lastTime = t;
		lastPos = [cX, cY];
		
		target.setFillColor(new Color('darkorchid'));
		lastHit = true;
		save = true;
		stationaryTimer.reset();
		state = 4;
	    }

	    return Scheduler.Event.FLIP_REPEAT;
	    break;

	//------Save data and transition to next trial------
	case 4:
	    // save data on the first time running through this loop
	    if (save) {
		// calculate idx and idx2, the last indices in data and extraData which are not null
		let idx = data[0].length;
		while (idx-- && !data[0][idx]);

		let idx2 = extraData[0].length;
		while (idx2-- && !extraData[0][idx2]);

		// store data
		if (blockType) {
		    psychoJS.experiment.addData('task','p2p');
		    psychoJS.experiment.addData('block',blockP2p);
		} else {
		    psychoJS.experiment.addData('task','p2p (tutorial)');
		    psychoJS.experiment.addData('block',0);
		}
		psychoJS.experiment.addData('mirror',mirror);
		psychoJS.experiment.addData('time',data[0].slice(0,idx+1));
		psychoJS.experiment.addData('cursorX',data[1].slice(0,idx+1));
		psychoJS.experiment.addData('cursorY',data[2].slice(0,idx+1));
		psychoJS.experiment.addData('handX',data[3].slice(0,idx+1));
		psychoJS.experiment.addData('handY',data[4].slice(0,idx+1));
		psychoJS.experiment.addData('begin',data[5].slice(0,idx+1));
		psychoJS.experiment.addData('targetX',tFile[trialNumber-1].xPos);
		psychoJS.experiment.addData('targetY',tFile[trialNumber-1].yPos);
		psychoJS.experiment.addData('extraTime',extraData[0].slice(0,idx2+1));
		psychoJS.experiment.addData('extraCursorX',extraData[1].slice(0,idx2+1));
		psychoJS.experiment.addData('extraCursorY',extraData[2].slice(0,idx2+1));
		psychoJS.experiment.addData('extraHandX',extraData[3].slice(0,idx2+1));
		psychoJS.experiment.addData('extraHandY',extraData[4].slice(0,idx2+1));
		psychoJS.experiment.addData('extraBegin',extraData[5].slice(0,idx2+1));
		psychoJS.experiment.nextEntry();
		save = false;
	    }

	    // get current time and position
	    t = trialClock.getTime();
	    cursor.setPos([cX, cY]);

	    // compute speed of cursor
	    let diffPos = Math.sqrt(Math.pow(cX-lastPos[0],2) + Math.pow(cY-lastPos[1],2));
	    let speed = height2cm * diffPos/Math.abs(t - lastTime);

	    // if speed is too high, make participant stay in target longer
	    if (speed > 5)
	    	stationaryTimer.reset();

	    // store current time and position for next speed calculation
	    lastTime = t;
	    lastPos = [cX, cY];

	    // change target color if the cursor is inside the target
	    currentHit = target.contains(cursor);
	    if (currentHit && currentHit != lastHit) {
		target.setFillColor(new Color('darkorchid'));
		lastHit = currentHit;
		stayInstructions.setAutoDraw(false);
	    } else if (!currentHit && currentHit != lastHit) { 
		target.setFillColor(new Color([0.2, 0.2, 0.2]));
		lastHit = currentHit;
		stayInstructions.setAutoDraw(true);
	    }

	    // if stationary for some time and cursor is in target, move the target
	    if (stationaryTimer.getTime() > 0.5 && currentHit) {
		if (trialNumber-1 < tFile.length-1) {
		    // store starting position of reach
		    startX = tPosX;
		    startY = tPosY;

		    // set new target position
	    	    trialNumber++;
		    tPosX = tFile[trialNumber-1].xPos*cm2height;
		    tPosY = tFile[trialNumber-1].yPos*cm2height;
		    target.setPos([tPosX, tPosY]);
	    	    trialCounter.setText(`Trial ${trialNumber}/${nTrials}`);
		    target.setFillColor(new Color([0.2, 0.2, 0.2]));

		    // preallocate arrays
		    data = makeArray(6, 60*frameRate);
		    extraData = makeArray(6, 20*frameRate);

		    // reset trial timer
		    begin = 0;
		    state = 3;
		    trialClock.reset();

		    // set data for the first timepoint
		    data[0][0] = Math.round(trialClock.getTime() * 100000) / 100000;
		    data[1][0] = Math.round(cX * height2cm * 100000) / 100000;
		    data[2][0] = Math.round(cY * height2cm * 100000) / 100000;
		    data[3][0] = Math.round(x * height2cm * 100000) / 100000;
		    data[4][0] = Math.round(y * height2cm * 100000) / 100000;
		    data[5][0] = 0;
		} else {
	    	    cursor.setAutoDraw(false);
	    	    target.setAutoDraw(false);
	    	    displayTimer.reset();
	    	    state = 5;
		}
	    }
	    return Scheduler.Event.FLIP_REPEAT;

        //------Tell the participant good job------
	case 5:

	    // display good job for 1 second
	    if (displayTimer.getTime() > 0.5 && goodJob.autoDraw === false) {
		goodJob.setText('Block complete, good job!');
		goodJob.setAutoDraw(true);
	    }

	    // move to next block after 1.5 seconds
	    if (displayTimer.getTime() > 1.5) {
		goodJob.setAutoDraw(false);
		displayTimer.reset();
		state = 6;
	    }

	    return Scheduler.Event.FLIP_REPEAT;
	    break;

	//------Intertrial interval------
	case 6:

	    // change display message based on current block
	    if (displayTimer.getTime() > 1) {

		// messages for main experiment
		if (blockType) {

		    // explanation for new mapping
		    if (blockType == 1) {
			mirror = true;
			centerText.setText('We will now move to the tracking task. However, for the rest of the experiment, we will change how your hand movements map into cursor movements.\n\nMoving your hand up and down will make the cursor move right and left, and moving your hand right and left will make the cursor will move up and down.\n\nThis will be very difficult, but just try your best to do the tracking task as best as you can.');
		    }

		    // message for another block of point-to-point
		    else if (blockType == 2)
			centerText.setText('We will do the point-to-point reaching task again. If needed, please take a short break.');

		    // message for transitioning to tracking
		    else if (blockType == 3)
			centerText.setText('We will now move to the tracking task. If needed, please take a short break.');
		}

		// message to transition out of tutorial
		else {
		    centerText.setText('We will now move to the real experiment. If you are confused about how to perform any of these tasks, please close out this experiment and contact the BLAM Lab with your questions.\n\nWe will begin with the tracking task.');
		}

		centerText.setAutoDraw(true);
		displayTimer.reset();
		state = 7;
	    }
	    return Scheduler.Event.FLIP_REPEAT;

	//------Transition out of point-to-point task------
	case 7:
	    if (displayTimer.getTime() > 4) {
		if (pressEnter.autoDraw === false) {
		    pressEnter.setAutoDraw(true);
		    keyboard.clearEvents();
		}

		// move to next block if 'return' is pressed
		keys = keyboard.getKeys({keyList: ['return']});
		if (Object.keys(keys).length === 1) {
		    pressEnter.setAutoDraw(false);
		    centerText.setAutoDraw(false);
			
		    target.setFillColor(new Color([0.2, 0.2, 0.2]));
		    trialNumber = 1;
		    state = 1;
		    totalBlockCounter++;
		    blockP2p++;
		    return Scheduler.Event.NEXT;
		}
	    }
	    return Scheduler.Event.FLIP_REPEAT;
	}
    };
}


function wait() {
    if (displayTimer.getTime() > 2) {
	centerText.setAutoDraw(false);
	return Scheduler.Event.NEXT;
    }
    return Scheduler.Event.FLIP_REPEAT;
}


function quitPsychoJS(message, isCompleted) {
    //------Download data and end experiment------

    // make the mouse cursor visible again
    document.body.style.cursor='default';

    // Check for and save orphaned data
    if (psychoJS.experiment.isEntryEmpty()) {
	psychoJS.experiment.nextEntry();
    }
    
    psychoJS.window.close();
    psychoJS.quit({message: message, isCompleted: isCompleted});
    
    return Scheduler.Event.QUIT;
}


// detect what browser participants are using
function detectBrowser() {    
    const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0; // Opera 8.0+
    const isFirefox = typeof InstallTrigger !== 'undefined'; // Firefox 1.0+
    const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)); // Safari 3.0+ "[object HTMLElementConstructor]"
    const isIE = /*@cc_on!@*/false || !!document.documentMode; // Internet Explorer 6-11
    const isEdge = !isIE && !!window.StyleMedia; // Edge 20+
    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime); // Chrome 1 - 79
    const isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1); // Edge (based on chromium) detection
    const isBlink = (isChrome || isOpera) && !!window.CSS; // Blink engine detection

    let browser;
    if (isOpera)
	browser = 'Opera';
    else if (isFirefox)
	browser = 'Firefox';
    else if (isSafari)
	browser = 'Safari';
    else if (isIE)
	browser = 'IE';
    else if (isEdge)
	browser = 'Edge';
    else if (isChrome)
	browser = 'Chrome';
    else if (isEdgeChromium)
	browser = 'Edge Chromium';
    else if (isBlink)
	browser = 'Blink';
    else
	browser = 'Could not identify browser';
    return browser;
}


// make an empty nested array
function makeArray(d1, d2) {
    let arr = [];
    for(let i = 0; i < d1; i++) {
	arr.push(new Array(d2));
    }
    return arr;
}


// parse csv input
function parseCSV(data) {
    var allRows = data.split('\n'); // split rows at new line
    var headerRows = allRows[0].split(',');

    for (let header of headerRows) {
        if (header != 'freq' && header.trim() == 'freq') {
	    let id = headerRows.indexOf(header);
	    headerRows[id] = 'freq';
	} else if (header != 'amp' && header.trim() == 'amp') {
	    let id = headerRows.indexOf(header);
	    headerRows[id] = 'amp';
	} else if (header != 'phase' && header.trim() == 'phase') {
	    let id = headerRows.indexOf(header);
	    headerRows[id] = 'phase';
	} else if (header != 'xPos' && header.trim() == 'xPos') {
	    let id = headerRows.indexOf(header);
	    headerRows[id] = 'xPos';
	} else if (header != 'yPos' && header.trim() == 'yPos') {
	    let id = headerRows.indexOf(header);
	    headerRows[id] = 'yPos';
	} 
    }
        
    for (var i=1; i<allRows.length-1; i++) {
	var obj = {};
	var currentLine = allRows[i].split(',');
	for(var j=0;j<headerRows.length;j++){
	    obj[headerRows[j]] = parseFloat(currentLine[j]);
	}
	tFile.push(obj);
    }
}

function lockChangeAlert() {
    if (document.pointerLockElement === canvas ||
	document.mozPointerLockElement === canvas) {
	document.addEventListener("mousemove", updatePosition, false);
    }
}

const gain = 0.15;
function updatePosition(e) {
    x += gain * e.movementX * pix2height;
    y -= gain * e.movementY * pix2height;

    let xLim;
    let yLim;
    if (mirror) {
    	xLim = heightLim;
    	yLim = widthLim;
    } else {
    	xLim = widthLim;
    	yLim = heightLim;
    }
    
    if (x > xLim)
    	x = xLim;
    if (x < -xLim)
    	x = -xLim;
    if (y > yLim)
    	y = yLim;
    if (y < -yLim)
    	y = -yLim;
}
