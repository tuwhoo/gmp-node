const repl = require("repl");

function getRandomNumber() {
    return Math.ceil(Math.random() * 100);
}
const local = repl.start({
    prompt: "Write your code here > ",
    useGlobal: true,
});

local.context.getRandomNumber = getRandomNumber;

local.on("exit", () => {
    console.log("Bye!");
    process.exit();
});
