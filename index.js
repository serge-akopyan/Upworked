import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js';
import { getDatabase, ref, set, onValue, get, child, update } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";

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

//add data

window.addKeyword = function(){
    var key = document.getElementById("key").value;
    var content = document.getElementById("content").value;
    set(ref(database, 'keywords/' + key),{
        content: content
    });
    alert('Saved')
}

//count data

onValue(ref(database, 'keywords/'), (snapData) => {
    console.log(Object.keys(snapData.val()).length) // 👈
  })

const databaseRef = ref(database, 'keywords/');

//read data

onValue(databaseRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {

      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();

      var newInput = document.createElement('input');

      newInput.value = childKey;
      newInput.id = childKey;

      var keywords = document.getElementById("keywords");
      keywords.appendChild(newInput);

      console.log(childKey);
      console.log(childData);
    });
  }, {
    onlyOnce: true
});

//update data

window.updateKeyword = function(key, newKey){
  update(ref(database, 'keywords/' + key),{
    key: newKey
  });
}


//select an input
const delegate = (selector) => (cb) => (e) => e.target.matches(selector) && cb(e);
const inputDelegate = delegate('input');
const container = document.getElementById("keywords")
container.addEventListener('change', inputDelegate((el) => updateKeyword(el.target.id, el.target.value)));