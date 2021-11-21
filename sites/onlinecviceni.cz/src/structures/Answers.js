const Answer = require("./Answer");

class Answers {
    #rawAnswers;
    constructor() {
        this.#rawAnswers = [];
        this.inputs = [];

        this.answers = [];
    }

    #getEveryElement(array, i) {
        const selectedIndicesLength = Math.floor(array.length / i);
        return [...Array(selectedIndicesLength)].map((item, index) => array[index * i + 1]);
    }

    get() {
        this.#rawAnswers = this.#getEveryElement(decodeURIComponent(document.getElementById("id_form2").firstElementChild.value).split(';'), 2) || [];
        this.inputs = Array.from(document.getElementsByTagName('input')).filter(i => i.name === 'res[]' && i.id.includes('idField')) || [];
        if(this.inputs.length === 0) {
            this.inputs = Array.from(document.getElementsByTagName('select')).filter(i => i.name === 'res[]' && i.className === 'optfield') || [];
            this.#rawAnswers = decodeURIComponent(document.getElementById("id_form2").firstElementChild.value).split(';+');
            this.#rawAnswers.shift();
            this.selecting = true;
        }

        this.answers = this.#rawAnswers.map((v, i) => {
            return {
                input: this.inputs[i],
                correct: this.#rawAnswers[i],
                selecting: this.selecting
            }
        })

        return this.answers.map(a => new Answer(a));
    }
}

module.exports = Answers;
