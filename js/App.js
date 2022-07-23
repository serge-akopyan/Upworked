import KeywordsAPI from "./KeywordsAPI.js";
import KeywordsView from "./KeywordsView.js";

export default class App {
    constructor(root) {
        this.keywords = [];
        this.activeKeyword = null;
        this.view = new KeywordsView(root, this._handlers());

        this._refreshKeywords();
    }

    _refreshKeywords() {
        this.view.updateKeywordList();
    }

    _handlers() {
        return {
            onKeywordSelect: keywordId => {
                this.view.updateKeywordPreviewVisibility("visible");
                this.view.showKeywordContent(keywordId);
                this.activeKeyword = keywordId;
            },

            onKeywordAdd: () => {
                KeywordsAPI.addKeyword();
                this._refreshKeywords();
            },

            onKeywordEdit: (key, content) => {
                KeywordsAPI.updateKeyword(this.activeKeyword, key, content);
                this._refreshKeywords();
            },

            onKeywordDelete: keywordId => {
                console.log("Note deleted: " + keywordId);
            }
        };
    }
}

