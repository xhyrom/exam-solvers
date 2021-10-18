const Answer = require("./Answer");

class Answers {
    constructor() {
        this.answers = [];
    }

    get() {
        this.answers = materialObj.getAllAnswerWidgets() || [];

        return this.answers.map(a => new Answer(a));
    }
}

module.exports = Answers;
