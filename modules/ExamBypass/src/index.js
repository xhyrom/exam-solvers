const Answers = require("./structures/Answers");
const Error = require("./structures/Error");

const allAnswers = (new Answers()).get();

let i = 1;
for(let answer of allAnswers) {
    answer.resolve();
    answer.canResolve ? new Error('[RESOLVE]', `Answer ${i} (${answer.id}) has been resolved!`) : new Error('[RESOLVE]', `I can't resolve answer ${i} (${answer.id})!`);
    i++;
}