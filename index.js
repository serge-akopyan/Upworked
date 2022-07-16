import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js';
import { getDatabase, ref, onValue, update, remove, push, set } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";

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

//add input

window.addInputs = function(){
  var addInput = document.createElement('input');
  var keywords = document.getElementById("keywords");
  keywords.appendChild(addInput);
}

//save data

const databaseRef = ref(database, 'keywords/');

//read data

onValue(databaseRef, (snapshot) => {
  snapshot.forEach((childSnapshot) => {

    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();
    const key = childData.key;

    var newInput = document.createElement('input');

    newInput.value = key;
    newInput.id = childKey;

    var keywords = document.getElementById("keywords");
    keywords.appendChild(newInput);

    console.log(childKey);
    console.log(key);
  });
}, {
  onlyOnce: true
});

//update data

window.updateKeyword = function(keyword){
  update(ref(database, 'keywords/' + keyword), {
    key: keyword,
  });
};

// window.updateKeyword = function(keyword){
//   const lookfordata = ref(database, 'keywords/' + keyword);
//   onValue(lookfordata, (snapshot) => {
//     set(lookfordata, {
//       key: keyword
//     })
//   })
// };

//select an input
const delegate = (selector) => (cb) => (e) => e.target.matches(selector) && cb(e);
const inputDelegate = delegate('input');
const container = document.getElementById("keywords")
// container.addEventListener('change', inputDelegate((el) => updateKeyword(el.target.value)));
// container.addEventListener('focusin', inputDelegate((el) => showContent(el.target.id)));

//show content

var viewport = document.getElementById("viewport");

window.showContent = function(inputID){
  const keyContent = ref(database, 'keywords/' + inputID + "/content");
  onValue(keyContent, (snapshot) => {
    const data = snapshot.val();
    viewport.value = data;
  })
}

//update content

window.updateContent = function(){
  //alert("Content updated");
}

viewport.addEventListener('input', updateContent());

