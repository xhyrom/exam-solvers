const Answer = require("./Answer");

class Answers {
    constructor() {
        this.answers = [];
    }

    get() {
        let name = window.location.pathname;

        if(name.includes('diktat')) {
            if(name.includes('mluvene')) this.answers = [{
                correct: items[itemOffset][_0x251e("0x17")]["sentences"][sentenceOffset][_0x251e("0x2")],
                id: "s0"
            }]
            else this.answers = Array.from(document.getElementsByTagName('span')).filter(s => s.id.includes('gap'));
        } else if(['doplnovacka', 'vpisovani'].some(o => name.includes(o))) this.answers = Array(questions.find(q => q.id == name.split("/")[2]));

        return this.answers.map(a => new Answer(a));
    }
}

module.exports = Answers;
