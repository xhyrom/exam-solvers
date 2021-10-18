const Answers = require("./structures/Answers");
const Error = require("./structures/Error");

const allAnswers = (new Answers()).get();

for(let answer of allAnswers) {
    answer.resolve();
    answer.canResolve ? new Error('[RESOLVE]', `Answer ${answer.id} has been resolved!`) : new Error('[RESOLVE]', `Answer ${answer.id} I can't resolve!`);
}