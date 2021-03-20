import React, { useState } from 'react';

let counterId;

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
      // TODO: stop ring
    }
    if (txtStart.toLowerCase() === 'start') {
      setTextStart('Stop');
      counterId = setInterval(() => {
        setValue((preValue) => {
          if (preValue === 1) {
            setTextStart('OK');
            // TODO: ring
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
        <button className="btn">fullscreen</button>
      </section>
    </>
  );
};

export default UseStateCounter;
