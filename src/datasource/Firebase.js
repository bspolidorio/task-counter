import app from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
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
