import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js';
import { getDatabase, ref, onValue, update, remove, push } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";

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

// window.addKeyword = function(){
//     var addInput = document.createElement('input');
//     push(ref(database, 'keywords/'),{
//       key: "",
//       content: ""
//     });
//     var keywords = document.getElementById("keywords");
//     keywords.appendChild(addInput);
// }

window.addKeyword = function(){
  var addInput = document.createElement('input');
  var keywords = document.getElementById("keywords");
  keywords.appendChild(addInput);
}

//count data

// onValue(ref(database, 'keywords/'), (snapData) => {
//     console.log(Object.keys(snapData.val()).length) // 👈
//   })

const databaseRef = ref(database, 'keywords/');

//read data

onValue(databaseRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {

      const childKey = childSnapshot.key;
      
      const findKey = ref(database, 'keywords/' + childKey + '/key');
      var keyword = "";

      onValue(findKey, (snapshot) => {
        keyword = snapshot.val();
      });

      var newInput = document.createElement('input');

      newInput.value = keyword;
      newInput.id = childKey;

      var keywords = document.getElementById("keywords");
      keywords.appendChild(newInput);

      console.log(childKey);
    });
  },);

//update data

window.updateKeyword = function(key, newKey){
  update(ref(database, 'keywords/' + newKey),{
    content: newKey
  });
  // remove(ref(database, 'keywords/' + key),{
  //   content: newKey
  // });
  alert("Updated");
}


//select an input
const delegate = (selector) => (cb) => (e) => e.target.matches(selector) && cb(e);
const inputDelegate = delegate('input');
const container = document.getElementById("keywords")
container.addEventListener('change', inputDelegate((el) => updateKeyword(el.target.id, el.target.value)));
container.addEventListener('focusin', inputDelegate((el) => showContent(el.target.id)));



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