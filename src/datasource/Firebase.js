import app from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDGQBzq1eUpPu5GqoH5_9PUTcMxohb86Ms",
  authDomain: "jaky-counter.firebaseapp.com",
  databaseURL: "https://jaky-counter.firebaseio.com",
  projectId: "jaky-counter",
  storageBucket: "",
  messagingSenderId: "658310962156",
  appId: "1:658310962156:web:6ffe358ce5d4559b"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.db = app.database();
  }

  writeData = (tasks, timerTime) => {
    this.db.ref("tasks").push({
      tasks: tasks,
      date: this.getDate(),

      timerTime: timerTime
    });
  };

  updateData = (tasks, key, timerTime) => {
    this.db.ref("tasks/" + key).update({
      tasks: tasks,

      timerTime: timerTime
    });
  };

  readData = (onSuccess, onError) => {
    this.db.ref("tasks").on("value", onSuccess, onError);
  };

  getDate = () => {
    const x = new Date();
    const y = x.getFullYear().toString();
    let m = (x.getMonth() + 1).toString();
    let d = x.getDate().toString();
    d.length === 1 && (d = "0" + d);
    m.length === 1 && (m = "0" + m);
    const date = d + "/" + m + "/" + y;
    return date;
  };

  getTotal = obj => Object.values(obj).reduce((a, b) => a + b);
}
export default Firebase;
