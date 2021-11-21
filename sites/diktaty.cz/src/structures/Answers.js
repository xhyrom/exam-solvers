const Answer = require("./Answer");

class Answers {
    #rawAnswers;
    constructor() {
        this.#rawAnswers = [];
        this.inputs = [];

        this.answers = [];
    }

    get() {
        this.#rawAnswers = document.getElementById('spravny_vysledek_celkem').value.split('#') || [];
        this.inputs = Array.from(document.getElementsByTagName('input')).filter(i => i.className === 'selnorm') || [];
        if(this.inputs.length === 0) this.inputs = Array.from(document.getElementsByTagName('select')).filter(i => i.className === 'selnorm') || [];
        if(this.inputs.length === 0) {
            this.checkingSame = true;
            this.inputs = Array.from(document.getElementsByTagName('span')).filter(s => s.className === 'pointer zn-sp-sl') || [];
        }

        this.answers = this.#rawAnswers.map((v, i) => {
            return {
                input: this.inputs[i],
                correct: this.#rawAnswers[i],
                checkingSame: this.checkingSame
            }
        })

        return this.answers.map(a => new Answer(a));
    }
}

module.exports = Answers;
