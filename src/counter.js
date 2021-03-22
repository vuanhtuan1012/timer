import React, { useState } from 'react';
import screenfull from 'screenfull';
import beep from './beep.wav';

let counterId;
let alarm = new Audio(beep);
let initialValue = 0;

const UseStateCounter = () => {
  const [value, setValue] = useState(initialValue);
  const [txtStart, setTextStart] = useState('Start');
  let interval = 100;

  function start() {
    if (txtStart.toLowerCase() === 'stop') {
      clearInterval(counterId);
      setTextStart('Start');
    }
    if (txtStart.toLowerCase() === 'ok') {
      // stopAlarm();
      // let minutes = document.getElementById('minutes');
      // minutes.readOnly = false;
      // setTextStart('Start');
      reset();
    }
    if (txtStart.toLowerCase() === 'start') {
      // console.log(value);
      if (value === 0) {
        let minutes = document.getElementById('minutes');
        initialValue = Number(minutes.value);
        if (initialValue === 0) {
          return;
        }
        setValue(initialValue * 60 * 1000);
        minutes.value = initialValue;
        minutes.readOnly = true;
      }
      setTextStart('Stop');
      counterId = setInterval(() => {
        setValue((preValue) => {
          let progress = document.getElementById('progress');
          let w = getWidth() + (interval * 100) / (initialValue * 60 * 1000);
          // console.log(w);
          progress.style.width = w + '%';
          let ms = (preValue - interval) / 60 / 1000;
          // let phut = Math.floor(ms);
          // let miligiay = ms - phut * 60 * 1000;
          // let giay = Math.round((miligiay / 1000) * 100 + Number.EPSILON) / 100;
          // minutes.value = phut.toString() + ':' + giay;
          let minutes = document.getElementById('minutes');
          minutes.value = Math.round(ms * 1000 + Number.EPSILON) / 1000;
          if (preValue <= interval) {
            setTextStart('OK');
            playAlarm();
            clearInterval(counterId);
            return 0;
          }
          if (preValue > interval) {
            return preValue - interval;
          }
        });
      }, interval);
    }
  }

  function reset() {
    if (typeof counterId !== 'undefined') {
      clearInterval(counterId);
    }
    setTextStart('Start');
    setValue(0);
    stopAlarm();
    initialValue = 0;
    let progress = document.getElementById('progress');
    progress.style.width = 0;
    let minutes = document.getElementById('minutes');
    minutes.value = '';
    minutes.readOnly = false;
    // if (initialValue === 0) {
    //   minutes.value = '';
    // } else {
    //   minutes.value = initialValue;
    // }
  }

  function fullscreenToggler() {
    if (screenfull.isEnabled) {
      // let container = document.getElementById('container');
      // if (!screenfull.isFullscreen) {
      //   screenfull.request(container);
      //   // TODO: center text
      //   console.log('center');
      // } else {
      //   screenfull.exit();
      //   // TODO: back to normal
      //   console.log('normal');
      // }
      screenfull.toggle();
    }
  }

  function playAlarm() {
    alarm.play();
    alarm.addEventListener(
      'ended',
      () => {
        alarm.currentTime = 0;
        alarm.play();
      },
      false
    );
  }

  function stopAlarm() {
    alarm.pause();
    alarm.currentTime = 0;
  }

  function getWidth() {
    let progress = document.getElementById('progress');
    let w = progress.style.width;
    if (w.includes('%')) {
      return Number(w.slice(0, -1));
    }
    return 0;
  }

  return (
    <>
      <main className="container">
        <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Timer</h1>
        </div>
      </main>
      <main className="container" id="container">
        <div className="row row-cols-1 row-cols-md-1 mb-3">
          <div className="col">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <div className="form-group col-md-4 mb-3">
                  <input
                    type="number"
                    className="form-control-lg no-border col-lg-10"
                    placeholder="minute(s)"
                    min="0"
                    max="59"
                    id="minutes"
                  ></input>
                </div>

                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    id="progress"
                  ></div>
                </div>
                <div className="my-3">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={start}
                  >
                    {txtStart}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-primary mx-2"
                    onClick={reset}
                  >
                    Reset
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-primary float-end"
                    onClick={fullscreenToggler}
                  >
                    Fullscreen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UseStateCounter;
