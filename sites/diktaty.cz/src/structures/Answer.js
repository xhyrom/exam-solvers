const Error = require("./Error");
class Answer {
    #data;
    constructor(data) {
        this.#data = data;

        this.checkingSame = this.#data.checkingSame;
        this.input = this.#data.input;
        this.correct = this.#data.correct
    }

    get canResolve() {
        return true;
    }

    get id() {
        return this.input.id;
    }

    resolve() {
        if(this.checkingSame && this.input.innerText !== this.correct) this.input.click();
        else this.input.value = this.correct;
    }
}

module.exports = Answer;
