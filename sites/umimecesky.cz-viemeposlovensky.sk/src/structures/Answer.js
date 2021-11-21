const Error = require("./Error");
class Answer {
    #data;
    constructor(data) {
        this.#data = data;

        this.name = window.location.pathname;
    }

    get canResolve() {
        return true;
    }

    get id() {
        return this.#data.id;
    }

    resolve() {
        if(this.name.includes('doplnovacka')) {
            let element = $(`span:contains(${this.#data.options.find(o => o.correct === 1)?.option?.[0]?.[1]})`);
            element.click();
        } else if(this.name.includes('vpisovani')) {
            let element = this.#data.question.find(a => a[0] === 'input')?.[1];

            document.getElementById('answer0').value = element.answer[0];
            document.getElementById('evaluate').click();

            //$(`span:contains(Další)`).click();
        } else if(this.name.includes('diktat')) {
            if(this.name.includes('mluvene')) {
                let correct = this.#data.correct;

                document.getElementById('sentence').value = correct;
                document.getElementById('evaluate').click();
                //document.getElementById('nextSentence').click();
            } else {
                let childNodesFirst = Array.from(this.#data.childNodes)[1];
                let childNodesSecond = Array.from(childNodesFirst.childNodes).find(s => s.getAttribute('correct') === '1');
                childNodesSecond.click();
            }
        }
    }
}

module.exports = Answer;
