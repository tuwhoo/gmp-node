const os = require("os");
const fs = require("fs");
const childProcess = require("child_process");

const LINUX = "linux";
const MACOS = "darwin";
const WINDOWS = "win32";
const UNIX_COMMAND = "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";
const WINDOWS_COMMAND = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;

const FILE_LOG_NAME = "activityMonitor.log";
const LOG_OUTPUT_INTERVAL = 100; // 0.1 sec
const FILE_OUTPUT_INTERVAL = 1000 * 60; // 1 min

const exitWithError = (error) => {
  console.error(`\x1b[31m[Error]: ${error}\x1b[0m`);
  process.exit(0);
};

let command;
const platform = os.platform();
if (platform === WINDOWS) command = WINDOWS_COMMAND;
if (platform === LINUX || platform === MACOS) command = UNIX_COMMAND;

if (!command) exitWithError("Sorry, your OS doesn't supported");

const getUnixTimestamp = () => Math.floor(new Date().getTime() / 1000);

const writeSingleLine = (string) => {
    const columns = process.stdout.columns;
    const output =
        string.length <= columns
            ? string.replace(/(?:\r\n|\r|\n)/g, "")
            : `${string.slice(0, columns - 3)}...`;

    process.stdout.clearLine(0);
    process.stdout.write(output);
    process.stdout.cursorTo(0);
};

const appendToFile = (filename, string) => {
    fs.appendFile(filename, string, (error) => {
        if (error) exitWithError(error);
    });
};

setInterval(() => {
    childProcess.exec(command, (error, stdout) => {
        if (error !== null) exitWithError(error);
        writeSingleLine(stdout);
    });
}, LOG_OUTPUT_INTERVAL);

setInterval(() => {
    childProcess.exec(command, (error, stdout) => {
        if (error !== null) exitWithError(error);
        appendToFile(FILE_LOG_NAME, `${getUnixTimestamp()}: ${stdout}`);
    });
}, FILE_OUTPUT_INTERVAL);
