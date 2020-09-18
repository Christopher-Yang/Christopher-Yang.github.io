/********* 
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

// Use this code when working with Node.js
// let aRatioX;
// let aRatioY;
// let size;
// if (typeof aRatio == 'undefined') {
//     aRatioX = 16;
//     aRatioY = 9;
//     size = 15.6;
// } else {
//     aRatioX = parseInt(aRatioString.slice(0,aRatioString.indexOf(':')));
//     aRatioY = parseInt(aRatioString.slice(aRatioString.indexOf(':')+1));
//     size = parseFloat(sizeString);
// }

//------PARAMETERS TO CONTROL BLOCK STRUCTURE------//
// 1: Target sines only
// 2: Cursor sines only
// 3: Target + cursor sines, set 1
// 4: Target + cursor sines, set 2
const trialType = [1, 1, 2, 2, 3, 3, 4, 4];
const nTrials = trialType.length; // total number of trials
const trialLength = 2; // how many seconds each trial lasts (set to desired time + 6 secs)

const messageType = trialType.map((a) => a == 4 ? 3 : a);
let messageStart = messageType.map((current, i, all) => (current != all[i-1]) ? 1 : 0);
messageStart[0] = 0;

//-------DETECT BROWSER------//

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
let expName = 'Tracking';  // from the Builder filename that created this script
let expInfo = {'participant': '', 'size': ''};

// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
    text: "Welcome to the experiment. Press 'Ok' when you are ready to begin.",
    dictionary: expInfo,
    title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(tutorial);
for (let i=0; i<nTrials; i++) {
    if (messageStart[i])
    	flowScheduler.add(message());
    flowScheduler.add(trialRoutineBegin());
    flowScheduler.add(enterTarget());
    flowScheduler.add(tracking());
    flowScheduler.add(trialComplete());
    flowScheduler.add(intertrialInterval());
}
flowScheduler.add(message());
flowScheduler.add(quitPsychoJS, 'You are done with the experiment.', true);

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
    expInfo['date'] = MonotonicClock.getDateStr();  // add a simple timestamp
    expInfo['expName'] = expName;
    expInfo['psychopyVersion'] = '2020.1.3';
    expInfo['OS'] = window.navigator.platform;
    expInfo['browser'] = browser;
    expInfo['browserInfo'] = window.navigator.userAgent;

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


let freqsX = new Array;
let freqsY = new Array;
let ampsX = new Array;
let ampsY = new Array;
let phasesX = new Array;
let phasesY = new Array;
let aRatioX;
let aRatioY;
let time;
let Nstep;
let height2cm;
let cm2height;
let trial = 1;
let trialClock;
let itiTimer;
let routineTimer;
let cursor;
let target;
let fullScreen;
let startInstructions;
let goodJob;
let cursorOnlyInstructions;
let repeatInstructions;
let cursorTargetInstructions;
let mirrorInstructions;
let download;
let screen_size;
let trialCounter;
let fullScreenReminder;
let keyboard;
function experimentInit() {
    // Make mouse cursor invisible
    document.body.style.cursor='none';
    
    // Create some handy timers
    trialClock = new Clock(); // keeps time during each trial
    itiTimer = new Clock(); // keeps time for intertrial interval
    routineTimer = new util.CountdownTimer();

    // Set parameters for sum of sines
    const f = [0.1, 0.15, 0.25, 0.35, 0.55, 0.65, 0.85, 0.95, 1.15, 1.45, 1.55, 1.85];
    let a = f.map(f => 1/f);
    const threshold = a[5];
    a = a.map(a => a >= threshold ? threshold : a);
    const p = [-2.2973572091724623, 2.1829905511425176, 1.6573448103607546 ,-1.538946698747247, -0.02868219371247127, -0.3173569996006864, 0.9524867388833398, 1.8141023176943092, -2.551855477031973, -2.9634802056111047, 2.1096743676129526, -0.4224369710975715];

    // Divide x and y sinusoid parameters into different subarrays
    for (let i=0; i<12; i=i+2) {
	freqsX.push(f[i]);
	freqsY.push(f[i+1]);
	ampsX.push(a[i]);
	ampsY.push(a[i+1]);
	phasesX.push(p[i]);
	phasesY.push(p[i+1]);
    }

    // Calculate screen aspect ratio
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

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    // Calculate units for centimeters
    let size = parseFloat(expInfo['size']);
    let diagonal = Math.sqrt(Math.pow(aRatioX,2) + Math.pow(aRatioY,2));
    let widthCm = 2.54 * size * aRatioX / diagonal; // physical width of monitor (cm)
    let heightCm = 2.54 * size * aRatioY / diagonal; // physical height of monitor (cm)

    height2cm = heightCm; // use this to convert height units to centimeters
    cm2height = 1 / heightCm; // use this to convert centimeters to height units
    expInfo['cmConvert'] = cm2height;

    time = [...Array(frameRate*(trialLength)+20).keys()].map(a => a/frameRate);
    Nstep = time.length;

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
	radius: 0.1*cm2height,
	interpolate: true,
	autoLog: false,
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
	interpolate: true,
	autoLog: false,
    });

    fullScreen = new TextStim({
	win: psychoJS.window,
	name: 'fullScreen',
	text: 'This experiment must be performed in full screen. If the experiment window exits full screen during the experiment (by pressing "Esc"), press the "f" key on your keyboard to reenter full screen mode. Try exiting and entering full screen now.\n\nPress the "Enter" key when you are ready to continue.',
	alignHoriz: 'center',
	units: 'height',
	pos: [0, 0],
	height: 0.7*cm2height,
	wrapWidth: true,
	color: new Color('white'),
    });

    startInstructions = new TextStim({
	win: psychoJS.window,
	name: 'startInstructions',
	text: 'The target (grey circle) will move randomly on the screen for ~45 seconds, and you must try to keep your cursor (white dot) inside the target for as long as you possibly can.\n\nThis task is designed to be very difficult so just try your best.\n\nClick the target when you are ready to begin the first trial.',
	alignHoriz: 'center',
	units: 'height',
	pos: [0, -4*cm2height],
	height: 0.7*cm2height,
	wrapWidth: true,
	color: new Color('white'),
    });

    goodJob = new TextStim({
	win: psychoJS.window,
	name: 'goodJob',
	text: 'Trial complete, good job!',
	alignHoriz: 'center',
	units: 'height',
	pos: [0, 0],
	height: 0.7*cm2height,
	wrapWidth: true,
	color: new Color('white'),
    });
    
    repeatInstructions = new TextStim({
	win: psychoJS.window,
	name: 'repeatInstructions',
	text: 'Click the target to begin the next trial.',
	alignHoriz: 'center',
	units: 'height',
	pos: [0, -4*cm2height],
	height: 0.7*cm2height,
	wrapWidth: true,
	color: new Color('white'),
    });

    cursorOnlyInstructions = new TextStim({
	win: psychoJS.window,
	name: 'cursorOnlyInstructions',
	text: 'When you start the next trial, the target will remain still. Instead, the cursor will move randomly. Try your best to counteract the random cursor movement and keep the cursor in the target.\n\nPress the "Enter" key to continue.',
	alignHoriz: 'center',
	units: 'height',
	pos: [0, 0],
	height: 0.7*cm2height,
	wrapWidth: true,
	color: new Color('white'),
    });

    cursorTargetInstructions = new TextStim({
	win: psychoJS.window,
	name: 'cursorTargetInstructions',
	text: 'Now, both the cursor and the target will move randomly. Still try your best to keep the cursor inside the target.\n\nPress the "Enter" key to continue.',
	alignHoriz: 'center',
	units: 'height',
	pos: [0, 0],
	height: 0.7*cm2height,
	wrapWidth: true,
	color: new Color('white'),
    });
    
    mirrorInstructions = new TextStim({
	win: psychoJS.window,
	name: 'mirrorInstructions',
	text: 'The cursor will no longer move randomly. But now left-right cursor movement will be flipped (mouse left -> cursor left). Still do your best to keep the cursor in the target\n\nPress the "Enter" key to continue.',
	alignHoriz: 'center',
	units: 'height',
	pos: [0, 0],
	height: 0.7*cm2height,
	wrapWidth: true,
	color: new Color('white'),
    });
    
     download = new TextStim({
	win: psychoJS.window,
	name: 'download',
	text: 'We will now download data from the experiment onto your computer. The download process may take up to a minute.\n\nIf your browser asks if you want to open or save the data, please click Save.\n\nTo initiate the download, press the "Enter" key.',
	alignHoriz: 'center',
	units: 'height',
	pos: [0, 0],
	height: 0.7*cm2height,
	wrapWidth: true,
	color: new Color('white'),
    });

    screen_size = new TextStim({
	win: psychoJS.window,
	name: 'screen_size',
	alignHoriz: 'center',
	units: 'norm',
	pos: [0, 0],
	height: 0.075,
	wrapWidth: true,
	color: new Color('white'),
	options: true
    });
    screen_size.setText('You did not provide your screen size. Please refresh the page and input it into the "size" field.');
    
    trialCounter = new TextStim({
	win: psychoJS.window,
	name: 'trialCounter',
	text: `Trial 1/${nTrials}`,
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
    
    keyboard = new Keyboard({
	psychoJS: psychoJS
    });
    
    if (expInfo['size'] == '')
	screen_size.setAutoDraw(true);

    fullScreen.setAutoDraw(true);
    return Scheduler.Event.NEXT;
}


function tutorial() {
    let keys = keyboard.getKeys({keyList: ['f']});
    if (Object.keys(keys).length === 1)
	psychoJS.window.adjustScreenSize();
    
    keys = keyboard.getKeys({keyList: ['return']});
    if (Object.keys(keys).length === 1) {
	fullScreen.setAutoDraw(false);
	trialCounter.setAutoDraw(true);
	fullScreenReminder.setAutoDraw(true);
	return Scheduler.Event.NEXT;
    }

    return Scheduler.Event.FLIP_REPEAT;
}

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
let data;
let extraData;
let extraCount;
let tPosX = new Array(Nstep);
let tPosY;
let cPosX;
let cPosY;
let mirror = false;
let mPos;
let mouse = new Mouse({
    name: 'myMouse',
    win: psychoJS.window,
    autoLog: false
});
function trialRoutineBegin(trials) {
    return function () {
	//------Prepare to start trial------
	data = makeArray(5, Nstep+frameRate*2);
	extraData = makeArray(5, frameRate*2);
	extraCount = 0;

	mPos = mouse.getPos();
	if (mirror)
	    cursor.setPos([-mPos[0], mPos[1]]);
	else
	    cursor.setPos(mPos);

	// preallocate cursor sum of sinusoids
	tPosX = new Array(Nstep);
	tPosY = new Array(Nstep);
	cPosX = new Array(Nstep);
	cPosY = new Array(Nstep);

	// set sinusoid parameters based on trial type
	switch(trialType[trial-1]) {
	case 1: // target sinusoids only
	    tX_freq = freqsX;
	    tY_freq = freqsY;
	    tX_amp = ampsX;
	    tY_amp = ampsY;
	    tX_phase = phasesX;
	    tY_phase = phasesY;

	    cX_freq = new Array(6).fill(0);
	    cY_freq = new Array(6).fill(0);
	    cX_amp = new Array(6).fill(0);
	    cY_amp = new Array(6).fill(0);
	    cX_phase = new Array(6).fill(0);
	    cY_phase = new Array(6).fill(0);
	    break;

	case 2: // cursor sinusoids only
	    tX_freq = new Array(6).fill(0);
	    tY_freq = new Array(6).fill(0);
	    tX_amp = new Array(6).fill(0);
	    tY_amp = new Array(6).fill(0);
	    tX_phase = new Array(6).fill(0);
	    tY_phase = new Array(6).fill(0);

	    cX_freq = freqsX;
	    cY_freq = freqsY;
	    cX_amp = ampsX;
	    cY_amp = ampsY;
	    cX_phase = phasesX;
	    cY_phase = phasesY;
	    break;
	    
	case 3: // target and cursor sinusoids (set 1)
	    tX_freq = freqsX.filter((a, index) => index%2 == 0);
	    tY_freq = freqsY.filter((a, index) => index%2 == 0);
	    tX_amp = ampsX.filter((a, index) => index%2 == 0);
	    tY_amp = ampsY.filter((a, index) => index%2 == 0);
	    tX_phase = phasesX.filter((a, index) => index%2 == 0);
	    tY_phase = phasesY.filter((a, index) => index%2 == 0);

	    cX_freq = freqsX.filter((a, index) => index%2 == 1);
	    cY_freq = freqsY.filter((a, index) => index%2 == 1);
	    cX_amp = ampsX.filter((a, index) => index%2 == 1);
	    cY_amp = ampsY.filter((a, index) => index%2 == 1);
	    cX_phase = phasesX.filter((a, index) => index%2 == 1);
	    cY_phase = phasesY.filter((a, index) => index%2 == 1);
	    break;
	    
	case 4: // target and cursor sinusoids (set 2)
	    tX_freq = freqsX.filter((a, index) => index%2 == 1);
	    tY_freq = freqsY.filter((a, index) => index%2 == 1);
	    tX_amp = ampsX.filter((a, index) => index%2 == 1);
	    tY_amp = ampsY.filter((a, index) => index%2 == 1);
	    tX_phase = phasesX.filter((a, index) => index%2 == 1);
	    tY_phase = phasesY.filter((a, index) => index%2 == 1);

	    cX_freq = freqsX.filter((a, index) => index%2 == 0);
	    cY_freq = freqsY.filter((a, index) => index%2 == 0);
	    cX_amp = ampsX.filter((a, index) => index%2 == 0);
	    cY_amp = ampsY.filter((a, index) => index%2 == 0);
	    cX_phase = phasesX.filter((a, index) => index%2 == 0);
	    cY_phase = phasesY.filter((a, index) => index%2 == 0);
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
	    let tX = tX_amp.map((a, i) => a * Math.cos(2 * Math.PI * time[j] * tX_freq[i] + tX_phase[i]));
	    let tY = tY_amp.map((a, i) => a * Math.cos(2 * Math.PI * time[j] * tY_freq[i] + tY_phase[i]));
	    let cX = cX_amp.map((a, i) => a * Math.cos(2 * Math.PI * time[j] * cX_freq[i] + cX_phase[i]));
	    let cY = cY_amp.map((a, i) => a * Math.cos(2 * Math.PI * time[j] * cY_freq[i] + cY_phase[i]));

	    // add the individual sinusoids to create sum-of-sinusoids
	    cPosX[j] = scale * cm2height * cX.reduce((a, b) => a + b);
	    cPosY[j] = scale * cm2height * cY.reduce((a, b) => a + b);
	    tPosX[j] = scale * cm2height * tX.reduce((a, b) => a + b);
	    tPosY[j] = scale * cm2height * tY.reduce((a, b) => a + b);
	}
	
	// draw objects
	if (trial === 1)
	    startInstructions.setAutoDraw(true);
	else
	    repeatInstructions.setAutoDraw(true);

	trialCounter.setText(`Trial ${trial}/${nTrials}`);
	target.setAutoDraw(true);
	cursor.setAutoDraw(true);

	return Scheduler.Event.NEXT;
    };
}

function enterTarget(trials) {
    return function () {
	//------Wait for participant to click in the target to start trial------
	// allow participant to reenter fullscreen by pressing 'f'
	let keys = keyboard.getKeys({keyList: ['f']});
	if (Object.keys(keys).length === 1)
	    psychoJS.window.adjustScreenSize();

	mPos = mouse.getPos();
	
	if (mirror)
	    cursor.setPos([-mPos[0], mPos[1]]);
	else
	    cursor.setPos(mPos);

	if (target.contains(mouse) && mouse.getPressed()[0] == 1) {
	    if (trial === 1)
		startInstructions.setAutoDraw(false);
	    else {
		repeatInstructions.setAutoDraw(false);
	    }
	    trialClock.reset();

	    return Scheduler.Event.NEXT;
	} else
	    return Scheduler.Event.FLIP_REPEAT;
    };
}

let a;
let b;
let t;
let currentHit;
let lastHit = false;
function tracking(trials) {
    return function () {
	//------Sinusoidally perturb target (and cursor)------
	// if (typeof a != 'undefined') {
	//     console.timeEnd();
	// }
	// get current time
	// b = trialClock.getTime();
	// if (b-a > 0.05)
	//     console.log(b-a);

	// allow participant to reenter fullscreen by pressing 'f'
	let keys = keyboard.getKeys({keyList: ['f']});
	if (Object.keys(keys).length === 1)
	    psychoJS.window.adjustScreenSize();
	
	// make cursor invisible again if it has reappeared
	if (document.body.style.cursor != 'none')
	    document.body.style.cursor='none';
	
	t = trialClock.getTime();
	let index = Math.round(t*frameRate);
	
	// set cursor position
	mPos = mouse.getPos();
	let cX;
	let cY;
	if (mirror) {
	    cX = -(mPos[0] + cPosX[index]);
	} else {
	    cX = mPos[0] + cPosX[index];
	}
	cY = mPos[1] + cPosY[index];

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

	// store data
	if (typeof data[0][index] == 'undefined') {
	    data[0][index] = Math.round(t * 100000) / 100000;
	    data[1][index] = Math.round(cX * height2cm * 100000) / 100000;
	    data[2][index] = Math.round(cY * height2cm * 100000) / 100000;
	    data[3][index] = Math.round(tPosX[index] * height2cm * 100000) / 100000;
	    data[4][index] = Math.round(tPosY[index] * height2cm * 100000) / 100000;
	} else {
	    extraData[0][extraCount] = Math.round(t * 100000) / 100000;
	    extraData[1][extraCount] = Math.round(cX * height2cm * 100000) / 100000;
	    extraData[2][extraCount] = Math.round(cY * height2cm * 100000) / 100000;
	    extraData[3][extraCount] = Math.round(tPosX[index] * height2cm * 100000) / 100000;
	    extraData[4][extraCount] = Math.round(tPosY[index] * height2cm * 100000) / 100000;
	    extraCount++;
	}
	
	// check for quit (typically the Esc key)
	if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
	    return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
	}

	// refresh screen for trialLength seconds
	if (t <= trialLength) {
	    // a = trialClock.getTime();
	    return Scheduler.Event.FLIP_REPEAT;
	}

	// otherwise move to intertrial interval
	else {
	    target.setAutoDraw(false);
	    cursor.setAutoDraw(false);
	    target.setPos([0, 0]); // reset target position to center of screen
	    target.setFillColor(new Color([0.2, 0.2, 0.2]));
	    itiTimer.reset();
	    
	    return Scheduler.Event.NEXT;
	}
    };
}

function trialComplete(trials) {
    return function () {
	//------Tell the participant good job------

	// allow participant to reenter fullscreen by pressing 'f'
	let keys = keyboard.getKeys({keyList: ['f']});
	if (Object.keys(keys).length === 1)
	    psychoJS.window.adjustScreenSize();

	if (itiTimer.getTime() < 1.5) {
	    if (itiTimer.getTime() > 0.5 && goodJob.autoDraw === false) {
		goodJob.setAutoDraw(true);
	    }
	    return Scheduler.Event.FLIP_REPEAT;
	}
	else {
	    goodJob.setAutoDraw(false);
	    itiTimer.reset();
	    return Scheduler.Event.NEXT;
	}
    };
}


const iti = 1;
function intertrialInterval(trials) {
    return function () {
	//------Wait for a few seconds before moving to next part of experiment------

	// allow participant to reenter fullscreen by pressing 'f'
	let keys = keyboard.getKeys({keyList: ['f']});
	if (Object.keys(keys).length === 1)
	    psychoJS.window.adjustScreenSize();

	if (itiTimer.getTime() > iti) {
	    // calculate idx, the last index in data which is not null
	    let tFilt = data[0].filter(d => {return d != null;});
	    let num = tFilt[tFilt.length - 1];
	    let idx = data[0].lastIndexOf(num);
	    
	    psychoJS.experiment.addData('trial',trial);
	    psychoJS.experiment.addData('trialType',trialType[trial-1]);
	    psychoJS.experiment.addData('time',data[0].slice(0,idx+1));
	    psychoJS.experiment.addData('cursorX',data[1].slice(0,idx+1));
	    psychoJS.experiment.addData('cursorY',data[2].slice(0,idx+1));
	    psychoJS.experiment.addData('targetX',data[3].slice(0,idx+1));
	    psychoJS.experiment.addData('targetY',data[4].slice(0,idx+1));
	    psychoJS.experiment.addData('extraTime',extraData[0]);
	    psychoJS.experiment.addData('extraCursorX',extraData[1]);
	    psychoJS.experiment.addData('extraCursorY',extraData[2]);
	    psychoJS.experiment.addData('extraTargetX',extraData[3]);
	    psychoJS.experiment.addData('extraTargetY',extraData[4]);
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
	    data = makeArray(5, Nstep+100);
	    trial++;

	    switch (trial) {
	    case 3:
		cursorOnlyInstructions.setAutoDraw(true);
		break;

	    case 5:
		cursorTargetInstructions.setAutoDraw(true);
		break;

	    case nTrials+1:
		download.setAutoDraw(true);
	    }
	    
	    return Scheduler.Event.NEXT;
	} else
	    return Scheduler.Event.FLIP_REPEAT;
    };
}


function message(trials) {
    return function () {
	//------Display messages to the participant------

	// allow participant to reenter fullscreen by pressing 'f'
	let keys = keyboard.getKeys({keyList: ['f']});
	if (Object.keys(keys).length === 1)
	    psychoJS.window.adjustScreenSize();
	
	// download data files once the participant has pressed the RET key
	keys = keyboard.getKeys({keyList: ['return']});
	if (Object.keys(keys).length === 1) {
	    switch (trial) {
	    case 3:
		cursorOnlyInstructions.setAutoDraw(false);
		break;

	    case 5:
		cursorTargetInstructions.setAutoDraw(false);
		break;

	    case nTrials+1:
		download.setAutoDraw(false);
	    }

	    // if (trial === perturbStart)
	    // 	cursorOnlyInstructions.setAutoDraw(false);
	    // else if (trial === mirrorStart)
	    // 	mirrorInstructions.setAutoDraw(false);
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
