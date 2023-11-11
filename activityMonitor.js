const os = require("os");
const fs = require("fs");
const { EventEmitter } = require("events");
const childProcess = require("child_process");

const LINUX = "linux";
const MACOS = "darwin";
const WINDOWS = "win32";
const UNIX_COMMAND = "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";
const WINDOWS_COMMAND = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;

const FILE_LOG_NAME = "activityMonitor.log";
const LOG_OUTPUT_INTERVAL = 100; // 0.1 sec
const FILE_OUTPUT_INTERVAL = 1000 * 60; // 1 min

const EVENTS = {
    LOG: "log",
    FILE: "file",
    ERROR: "error",
};

const exitWithError = (text) => {
    console.error(`\x1b[31m[Error]: ${text}\x1b[0m`);
    process.exit(0);
};

let command;
const platform = os.platform();
if (platform === WINDOWS) command = WINDOWS_COMMAND;
if (platform === LINUX || platform === MACOS) command = UNIX_COMMAND;

if (!command) exitWithError("Sorry, your OS doesn't supported");

const getUnixTimestamp = () => Math.floor(new Date().getTime() / 1000);

const logSingleLine = (text) => {
    const columns = process.stdout.columns;
    const output =
        text.length <= columns
            ? text.replace(/(?:\r\n|\r|\n)/g, "")
            : `${text.slice(0, columns - 3)}...`;

    process.stdout.clearLine(0);
    process.stdout.write(output);
    process.stdout.cursorTo(0);
};

const appendToFile = (filename, text) => {
    fs.appendFile(filename, text, (error) => {
        if (error) exitWithError(error);
    });
};

const activityMonitor = new EventEmitter();

let totalTime = 0;
setInterval(() => {
    totalTime += LOG_OUTPUT_INTERVAL;
    childProcess.exec(command, (error, stdout) => {
        if (error !== null) activityMonitor.emit(EVENTS.ERROR, error);
        if (totalTime % FILE_OUTPUT_INTERVAL === 0) activityMonitor.emit(EVENTS.FILE, stdout);
        activityMonitor.emit(EVENTS.LOG, stdout);
    });
}, LOG_OUTPUT_INTERVAL);

activityMonitor.on(EVENTS.LOG, logSingleLine);
activityMonitor.on(EVENTS.ERROR, exitWithError);
activityMonitor.on(EVENTS.FILE, (text) => appendToFile(FILE_LOG_NAME, `${getUnixTimestamp()}: ${text}`));
