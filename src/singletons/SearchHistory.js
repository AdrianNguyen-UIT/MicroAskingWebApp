class SearchHistory {
    constructor() {
        this.instance = this;
        this.data = JSON.parse(localStorage.getItem("search_history"));
        if (this.data == null) this.data = []
    }

    static get Instance() {
        if (SearchHistory.instance == null) {
            SearchHistory.instance = new SearchHistory();
        }
        return SearchHistory.instance;
    }

    getData() {
        return this.data;
    }

    addData(question) {
        let addSignal = true;
        for (const d of this.data) {
            if (question === d) addSignal = false
        }
        if (addSignal) this.data.unshift(question);

        localStorage.setItem("search_history", JSON.stringify(this.data));
    }
}

export default SearchHistory;