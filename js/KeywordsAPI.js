import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js';
import { getDatabase, ref, get, child, onValue, update, remove, push, set } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyA0talSsClqVn3WYI7HG73G1VgMw0FC2AI",
    authDomain: "uplose-bdb6d.firebaseapp.com",
    databaseURL: "https://uplose-bdb6d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "uplose-bdb6d",
    storageBucket: "uplose-bdb6d.appspot.com",
    messagingSenderId: "93804520560",
    appId: "1:93804520560:web:0d8f48ad4a3eb7616800b5"
  };    

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const databaseRef = ref(database, 'keywords/');

export default class KeywordsAPI {

    static addKeyword() {
      push(ref(database, 'keywords/'), {
        key: "",
        content: "",
      });
    }

    static updateKeyword(keywordId, newkey, newcontent) {

      update(ref(database, 'keywords/' + keywordId), {
        key: newkey,
        content: newcontent
      });

    }

    static deleteKeyword(id) {
      remove(ref(database, 'keywords/' + id));
    }
}