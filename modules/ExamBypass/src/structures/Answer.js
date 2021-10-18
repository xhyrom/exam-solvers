const Error = require("./Error");

const classes = {
    "InputAnswerETestWidget": "input",
    "ConnectAnswerETestWidget": "connect",
    "OrderingAnswerETestWidget": "ordering",
    "MapAnswerETestWidget": "map",
    "AbcdAnswerETestWidget": "abcd",
    "GroupsAnswerETestWidget": "groups",
    "ElaborationETestWidget": "elaboration"
}

class Answer {
    #data;
    constructor(data) {
        this.#data = data;

        this.id = this.#data.id;
    }

    get class() {
        return classes[this.#data.getWidgetClass()];
    }

    get canResolve() {
        return this.class === "elaboration" ? false : true; 
    }

    resolve() {
        if(this.class === "input") {
            let answers = this.#data.props.correctAnswers;

            for (let i = 0; i < answer.length; i++) {
                this.#data.element.before(this.#createElement(answers, i))
            }
        }

        else if(this.class === "connect") {
            let answers = this.#data.props.pairs;
            let ret = '<div style="background-color: #03a9fc; color:white; padding: 5px; margin: 0px;">Valid answers:<ol style="list-style-type: decimal; padding-left: 30px;">';

            for (let i = 0; i < answer.length; i++) {
                ret += `<li>${answers[i].l}`;
                ret += `${answers[i].r}</li>`
            }

            ret += '</ol></div>';
            this.#data.element.before(ret);
            this.#data.element[0].style = 'border: 2px solid #03a9fc;';
        }

        else if(this.class === "ordering") {
            let answers = this.#data.props.answers;
            let ret = '<div style="background-color: #03a9fc; color:white; padding: 5px; margin: 0px;">Valid order:<ol style="list-style-type: decimal; padding-left: 30px;">';

            for (let i = 0; i < answer.length; i++) {
                ret += `<li>${answers[i].text}</li>`;
            }

            ret += '</ol></div>';
            this.#data.element.before(ret);
            this.#data.element[0].style = 'border: 2px solid #03a9fc; padding: 15px;';
        }

        else if(this.class === "abcd") {
            let answers = this.#data.props.answers;
            if(!answers) return;

            for (let i = 0; i < answers.length; i++) {
                let element = document.querySelector(`[data-wid='${this.id}']`)?.querySelectorAll(`[data-answerid='${answers[i]}']`);
                if(!element) return;

                for (let x = 0; x < element.length; x++) {
                    element[x].style.border = "border: 2px solid #03a9fc;";
                }
            }
        }

        else if(this.class === "groups") {
            let groups = this.#data.props.groups;

            let ret = '<div style="background-color: #03a9fc; color:white; padding: 5px; margin: 0px;">Correct grouping:<ol style="list-style-type: decimal; padding-left: 30px;">';
            for (let i = 0; i < groups.length; i++) {
                let group = groups[i].items;

                ret += `<div> ${groups[i].title} </div><ol style='list-style-type: decimal; padding-left: 30px;'>`
                for (let x = 0; x < groups.length; x++) {
                    ret += `<li> ${group[x].text} </li>`;
                }

                ret += `</ol>`;
            }

            ret += `</div>`

            this.#data.element.before(ret);
        }

        else if(this.class === "map") {
            let points = this.#data.props.points;

            for (let i = 0; i < points.length; i++) {
                let { pointid, r_pointid } = points[i];

                let answer = document.querySelectorAll(`[data-id="${pointid}"]`)[0];
                let point = document.querySelectorAll(`[data-id="${r_pointid}"]`)[0];

                answer.addEventListener("mouseenter", () => point.style.backgroundColor = "green");
                answer.addEventListener("mouseleave", () => point.style.backgroundColor = "");
            }
        }

        else {
            this.#data.element.before(this.#createElement(null, null, false));
        }
    }

    #createElement(answers, i, resolve = true) {
        const copy = (a) => {
            navigator.clipboard.writeText(a).catch(e => new Error('[COPY]', e));
        }

        return resolve ? 
        `<span style="border: 2px solid #03a9fc; background: white; color: black; padding: 5px; margin: 5px;">${answers[i]} <button style="border: none; background: none; border-left: 2px solid #03a9fc;" onclick="copy('${answers[i]}')">Copy</button></span>`
        : '<div style="background: #eb4034; color: white; padding: 5px;">Sorry, I can\'t resolve it.</div>'
    }
}

module.exports = Answer;
