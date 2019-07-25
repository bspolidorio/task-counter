import React from "react";
import "./App.css";
import Firebase from "./datasource/Firebase";
import Interface from "./components/Interface";

//const newTask = this.state.tasksByDate[this.state.tasksByDate.length - 1].tasks;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timerOn: false, timerStart: 0 };
    this.db = new Firebase();
  }
  componentDidMount() {
    this.db.readData(this.gotData);
  }

  gotData = data => {
    const database = data.val();
    const keys = Object.keys(database);
    let tasks = [];
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      const date = database[k].date;
      const timerTime = database[k].timerTime;

      tasks.push({
        date,
        key: k,
        timerTime,

        tasks: database[k].tasks
      });
    }
    if (this.db.getDate() === tasks[tasks.length - 1].date) {
      this.setState({
        todayTasks: tasks[tasks.length - 1].tasks,
        tasksByDate: tasks,
        total: this.db.getTotal(tasks[tasks.length - 1].tasks),
        actualDate: this.db.getDate(),
        timerTime: tasks[tasks.length - 1].timerTime
      });
    } else {
      this.setState({
        todayTasks: {
          addressV: 0,
          autoC: 0,
          poi: 0,
          routing: 0,
          search: 0,
          searchR: 0
        },
        tasksByDate: tasks,
        total: 0,
        actualDate: this.db.getDate(),
        timerTime: 0
      });
    }
  };

  errData = err => {
    console.log("Error!");
    console.log(err);
  };

  increaseTaskCounter = buttonName => {
    this.setState({
      todayTasks: {
        ...this.state.todayTasks,
        [buttonName]: this.state.todayTasks[buttonName] + 1
      },
      total: this.state.total + 1
    });
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 10);
  };

  stopTimer = () => {
    this.setState({ timerOn: false }, () => {
      if (
        this.state.actualDate ===
        this.state.tasksByDate[this.state.tasksByDate.length - 1].date
      ) {
        this.db.updateData(
          this.state.todayTasks,
          this.state.tasksByDate[this.state.tasksByDate.length - 1].key,

          this.state.timerTime
        );
      } else {
        this.db.writeData(
          this.state.todayTasks,

          this.state.timerTime
        );
      }
    });
    clearInterval(this.timer);
  };

  render() {
    if (this.state.todayTasks) {
      const { timerTime } = this.state;
      let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
      let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
      let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
      let tasksToDo = ("" + Math.floor(timerTime / 180000)).slice(-3);

      return (
        <Interface
          total={this.state.total}
          tasks={this.state.todayTasks}
          increaseTaskCounter={this.increaseTaskCounter}
          startTimer={this.startTimer}
          stopTimer={this.stopTimer}
          timerOn={this.state.timerOn}
          timerTime={this.state.timerTime}
          tasksToDo={tasksToDo}
          seconds={seconds}
          minutes={minutes}
          hours={hours}
        />
      );
    }
    return null;
  }
}

export default App;
