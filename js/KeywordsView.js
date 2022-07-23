import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js';
import { getDatabase, ref, orderByValue, onValue, query } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";

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

export default class KeywordsView {
    constructor(root, { onKeywordSelect, onKeywordAdd, onKeywordEdit, onKeywordDelete } = {}) {
        this.root = root;
        this.onKeywordSelect = onKeywordSelect;
        this.onKeywordAdd = onKeywordAdd;
        this.onKeywordEdit = onKeywordEdit;
        this.onKeywordDelete = onKeywordDelete;
        this.root.innerHTML = `
            <section class="keywords__sidebar">
                <button class="keywords__add" type="button">Add Keyword</button>
                <div class="keywords__list"></div>
            </section>
            <section class="content__sidebar">
                <div class="keywords__preview">
                    <input class="keywords__title" type="text" placeholder="Add keyword">
                    <textarea class="keywords__body" placeholder="Add content"></textarea>
                </div>
            </section>
        `;

        const btnAddKeyword = this.root.querySelector(".keywords__add");

        btnAddKeyword.addEventListener("click", () => {
            this.onKeywordAdd();
        });
        
        this.updateKeywordPreviewVisibility(false);

    }

    _createListItemHTML(id, keyword) {
        return `
            <div class="keywords__list-item" data-note-id="${id}">
                <div class="keywords__small-title">${keyword}</div>
            </div>
        `;
    }

    updateKeywordList() {

        const keywordsListContainer = this.root.querySelector(".keywords__list");

        keywordsListContainer.innerHTML = "";

        onValue(databaseRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
          
              const childKey = childSnapshot.key;
              const childData = childSnapshot.val();
              const key = childData.key;
          
              const html = this._createListItemHTML(childKey, key);
              keywordsListContainer.insertAdjacentHTML("beforeend", html);
            });

            const keywords = keywordsListContainer.querySelectorAll(".keywords__list-item");


            keywords.forEach(keyword => {

                keyword.addEventListener("click", () => {
                    this.root.querySelectorAll(".keywords__list-item").forEach(noteListItem => {
                        noteListItem.classList.remove("keywords__list-item--selected");
                    });
                    this.root.querySelector(`.keywords__list-item[data-note-id="${keyword.dataset.noteId}"]`).classList.add("keywords__list-item--selected");
                    this.onKeywordSelect(keyword.dataset.noteId);
                    // this.showKeywordContent(keyword.dataset.noteId)
                });

                keyword.addEventListener("dblclick", () => {
                    const doDelete = confirm("You sure?");
                    if (doDelete) {
                        this.onKeywordDelete(keyword.dataset.noteId)
                    }
                });

            });
          }, {
            onlyOnce: true
          });

        console.log("Updated view");
    }

    showKeywordContent(id) {    
        const keywordsPreviewContainer = this.root.querySelector(".keywords__preview");

        const inpTitle = keywordsPreviewContainer.querySelector(".keywords__title");
        const inpBody = keywordsPreviewContainer.querySelector(".keywords__body");
        const keywordDatabaseRef = ref(database, 'keywords/' + id);
        onValue(keywordDatabaseRef, (snapshot) => {
            const childData = snapshot.val();
            inpTitle.value = childData.key;
            inpBody.value = childData.content;
        }, {
            onlyOnce: true
        });

        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("change", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();
                this.onKeywordEdit(updatedTitle, updatedBody)
            });
        });
    }

    

    updateKeywordPreviewVisibility(visible) {
        this.root.querySelector(".keywords__preview").style.visibility = visible ? "visible" : "hidden";
    }
}