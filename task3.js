const fs = require("fs");
const csv = require("csvtojson");
const { pipeline } = require("stream");

const CSV_DIRECTORY = "./csvdirectory";
const CSV_FILE_NAME = "nodejs-hw1-ex1.csv";
const TXT_FILE_NAME = "nodejs-hw1-ex1.txt";

const transformCsvToTxt = ({
    input,
    output,
    omitColumns = [],
    numberColumns = [],
}) => {
    const normalizeDataRow = (dataRow) => {
        for (let [originalKey, originalValue] of Object.entries(dataRow)) {
            const key = originalKey.toLowerCase();
            const value = numberColumns.includes(key)
                ? parseFloat(originalValue.replace(",", "."))
                : originalValue;

            if (!omitColumns.includes(key)) dataRow[key] = value;
            delete dataRow[originalKey];
        }
    };

    pipeline(
        csv({ delimiter: ";" }).fromFile(input).subscribe(normalizeDataRow),
        fs.createWriteStream(output),
        (err) => {
            if (err) {
                console.error("An error occurred during CSV file transformation: ", err);
            } else {
                console.log("CSV file was successfully transformed to TXT");
            }
        }
    );
};

transformCsvToTxt({
    input: `${CSV_DIRECTORY}/${CSV_FILE_NAME}`,
    output: `${CSV_DIRECTORY}/${TXT_FILE_NAME}`,
    omitColumns: ["amount"],
    numberColumns: ["price"],
});
