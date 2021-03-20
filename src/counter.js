import React, { useState } from 'react';
import screenfull from 'screenfull';
import beep from './beep.wav';

let counterId;
let alarm = new Audio(beep);

const UseStateCounter = () => {
  const initialValue = 10;
  const [value, setValue] = useState(initialValue);
  const [txtStart, setTextStart] = useState('Start');

  function start() {
    if (txtStart.toLowerCase() === 'stop') {
      clearInterval(counterId);
      setTextStart('Start');
    }
    if (txtStart.toLowerCase() === 'ok') {
      stopAlarm();
    }
    if (txtStart.toLowerCase() === 'start') {
      setTextStart('Stop');
      counterId = setInterval(() => {
        setValue((preValue) => {
          if (preValue === 1) {
            setTextStart('OK');
            playAlarm();
            clearInterval(counterId);
            return preValue - 1;
          }
          if (preValue > 1) {
            return preValue - 1;
          }
        });
      }, 1000);
    }
  }

  function reset() {
    if (typeof counterId !== 'undefined') {
      clearInterval(counterId);
    }
    setTextStart('Start');
    setValue(initialValue);
  }

  function fullscreenToggler() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      if (!screenfull.isFullscreen) {
        // TODO: center text
        console.log('center');
      } else {
        // TODO: back to normal
        console.log('normal');
      }
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

  return (
    <>
      <section style={{ margin: '4rem 1rem' }}>
        <h1>{value}</h1>
        <div className="progress-bar">
          <span className="bar">
            <span
              id="progress"
              style={{
                width: ((initialValue - value) / initialValue) * 100 + '%',
              }}
            ></span>
          </span>
        </div>
        <button className="btn" onClick={start}>
          {txtStart}
        </button>
        <button className="btn" onClick={reset}>
          reset
        </button>
        <button className="btn" onClick={fullscreenToggler}>
          fullscreen
        </button>
      </section>
    </>
  );
};

export default UseStateCounter;
