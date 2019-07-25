import React from "react";

function Interface(props) {
  return (
    <div className="container">
      <div className="timer-body">
        <div className="timer-screen">
          <div className="tasks-container">
            <div className="tasks">To do</div>
            <div className="tasks">{props.tasksToDo}</div>
            <div className="tasks">Done</div>
            <div className="tasks">{props.total}</div>
          </div>
          <div className="timer-time">
            {props.hours} : {props.minutes} : {props.seconds}
          </div>
        </div>
        <div className="timer-button-row">
          {props.timerOn === false && props.timerTime === 0 && (
            <button className="play button" onClick={props.startTimer}>
              Start
            </button>
          )}
          {props.timerOn === true && (
            <button className="pause button" onClick={props.stopTimer}>
              Pause
            </button>
          )}
          {props.timerOn === false && props.timerTime > 0 && (
            <button className="play button" onClick={props.startTimer}>
              Resume
            </button>
          )}
        </div>
        <div className="timer-button-row">
          <div
            className="button"
            onClick={() => props.increaseTaskCounter("search")}
          >
            Search
          </div>
          <div className="counter">{props.tasks.search}</div>
        </div>
        <div className="timer-button-row">
          <div
            className="button"
            onClick={() => props.increaseTaskCounter("autoC")}
          >
            AutoC
          </div>
          <div className="counter">{props.tasks.autoC}</div>
        </div>
        <div className="timer-button-row">
          <div
            className="button"
            onClick={() => props.increaseTaskCounter("addressV")}
          >
            Address V
          </div>
          <div className="counter">{props.tasks.addressV}</div>
        </div>
        <div className="timer-button-row">
          <div
            className="button"
            onClick={() => props.increaseTaskCounter("routing")}
          >
            Routing
          </div>
          <div className="counter">{props.tasks.routing}</div>
        </div>
        <div className="timer-button-row">
          <div
            className="button"
            onClick={() => props.increaseTaskCounter("searchR")}
          >
            Search R
          </div>
          <div className="counter">{props.tasks.searchR}</div>
        </div>
        <div className="timer-button-row">
          <div
            className="button"
            onClick={() => props.increaseTaskCounter("poi")}
          >
            POI
          </div>
          <div className="counter">{props.tasks.poi}</div>
        </div>
      </div>
    </div>
  );
}

export default Interface;
