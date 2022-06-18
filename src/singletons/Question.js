class Question {
    constructor() {
        this.instance = this;
        this.data = "";
    }

    static get Instance() {
        if (Question.instance == null) {
            Question.instance = new Question();
        }
        return Question.instance;
    }

    getData() {
        return this.data;
    }

    setData(value) {
        this.data = value;
    }
}

export default Question;