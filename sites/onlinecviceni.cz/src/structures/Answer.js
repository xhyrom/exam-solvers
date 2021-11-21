const Error = require("./Error");
class Answer {
    #data;
    constructor(data) {
        this.#data = data;

        this.selecting = this.#data.selecting;
        this.input = this.#data.input;
        this.correct = this.#data.correct
    }

    get canResolve() {
        return true;
    }

    get id() {
        return this.input.id;
    }

    getDuplicate(arr){
        let obj = {}, dup = [];
        for(let i = 0, l = arr.length; i < l; i++){
            let val = arr[i];
            if(obj[val]) {
                if(dup.find(a => a == val)) continue;
                dup.push(val);
                continue;
            };

            obj[val] = true;
        }
        return dup;
    };

    resolve() {
        if(this.selecting) this.correct = this.getDuplicate(this.correct.replaceAll('+', ' ').split('>')[0].split(';'))[0];
        if(this.correct === '(lt)') this.correct = '<';
        if(this.correct === '(gt)') this.correct = '>';

        this.input.value = this.correct;
    }
}

module.exports = Answer;
