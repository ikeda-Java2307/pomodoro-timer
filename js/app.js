var min = 25, sec = 0, phase = 1;
var isWorking = true;
var breaktime_p_t = [5, 1];
var timer;
var time_p_t = [1500, 300];

// DOM
var workBtn = document.querySelector('.pomodoro__btn--work');
var pauseBtn = document.querySelector('.pomodoro__btn--pause');
var resetBtn = document.querySelector('.pomodoro__btn--reset');
var timeMin = document.querySelector('.pomodoro__time--min');
var timeSec = document.querySelector('.pomodoro__time--sec');
var phaseDisp = document.querySelector('.pomodoro__btn--phase');

// Display the default time
displayMin(min);
displaySec(sec);

// Start countdown when the work button is pressed
workBtn.addEventListener('click', function() {
	/*
    // Display the phase
    dispPhase();

    // Change the UI of the button
    workBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    
    // Countdown the timer
    timer = setInterval(countTimer, 1000);

    // Stop the timer when pause button is pressed 
    pauseBtn.addEventListener('click', function() {
        stopTimer(timer);
    });
	*/

	startTime = new Date().getTime();

	setInterval(countTimer, 1000);
});

// Stop the timer when pause button is pressed 
resetBtn.addEventListener('click', function() {
    init();
});


///// UI Control
// Display the phase
function dispPhase() {
    return phaseDisp.textContent = `${phase}/4`;
}

// Hide the phase
function hidePhase() {
    return phaseDisp.textContent = '';
}


// Display minutes in Pomodoro
function displayMin(min) {
	/*
    min = min.toString();
    if (min.length === 1) {
        minute = '0' + min;
    } else {
        minute = min;
    }
	*/
    timeMin.textContent = min.toString();
}

// Display seconds in Pomodoro
function displaySec(sec) {
    /*
	sec = sec.toString();
    if (sec.length === 1) {
        second = '0' + sec;
    } else {
        second = sec;
    }
	*/
    timeSec.textContent = '0' + sec.toString();
}

///// App control
// Initialize the timer setting
function init() {
    // Initialize the data
    stopTimer(timer);
    min = 25;
    sec = 0;
    phase = 1;
    isWorking = true;

    // Initialize the UI
    hidePhase();
    displayMin(min);
    displaySec(sec);
    timeMin.style.color = "#ecf0f1";
    timeSec.style.color = "#ecf0f1";
}

// Count time
function countTimer(timer) {
	/*
    if (sec !== 0) {
        sec--;
        displaySec(sec); 
    } else {
        sec = 59;
        displaySec(sec); 
        min--;
        displayMin(min); 
    }
    if (sec === 0 && min === 0) {
        if (isWorking) {
            isWorking = false;
            startBreak(_[phase - 1]);
        } else {
            phase++;
            if (phase > 4) {
                stopTimer(timer);
                init();
            } else {
                isWorking = true;           
                min = 25;
                sec = 0;
                dispPhase();
                timeMin.style.color = "#ecf0f1";
                timeSec.style.color = "#ecf0f1";
            }
        }
    }
	*/

	// 現在の時刻を取得
	const nowTime = new Date().getTime();

	// タイマーの表示を更新
	msecToSecString(nowTime - startTime);
}

// ミリ秒を経過時間の文字列に直す関数
function msecToSecString(time) {
	// 単位をミリ秒から秒へ変換
	time = time_p_t[0] - Math.floor(time / 1000);
  
	// 秒数
	const seconds = time % 60;
	// 分数
	const minutes = Math.floor(time / 60);
  
	// 取得した数値をも2桁の文字列になるように、必要に応じて0を補う
	timeSec.textContent = (seconds < 10 ? '0' : '') + String(seconds);
	timeMin.textContent = (minutes < 10 ? '0' : '') + String(minutes);
}

// Stop the timer
function stopTimer() {
    // Stop countdown
    clearInterval(timer);

    // Change the UI of the button 
    workBtn.style.display = 'block'; 
    pauseBtn.style.display = 'none';
}

// Set the timer for _
function startBreak(_) {
    var time = _;
    min = time;
    sec = 0;
    timeMin.style.color = "#f1c40f";
    timeSec.style.color = "#f1c40f";
    countTimer(timer);
}