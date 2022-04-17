'use strict';
exports.__esModule = true;
var fs_1 = require("fs");
process.stdin.resume();
process.stdin.setEncoding('utf-8');
var inputString = '';
var inputLines = [];
var currentLine = 0;
process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});
process.stdin.on('end', function () {
    inputLines = inputString.split('\n');
    inputString = '';
    main();
});
function readLine() {
    return inputLines[currentLine++];
}
/*
 * Complete the 'countingValleys' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER steps
 *  2. STRING path
 */
function countingValleys(steps, path) {
    var altitude = 0;
    var beginValey = false;
    var endValey = false;
    var countValey = 0;
    for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
        var l = path_1[_i];
        var altitudeIncrement = l === "U" ? 1 : -1;
        altitude = altitude + altitudeIncrement;
        if (altitude === -1 && endValey === false) {
            beginValey = true;
        }
        else if (altitude === 0 && beginValey === true) {
            endValey = true;
        }
        if (beginValey && endValey) {
            countValey = countValey += 1;
            endValey = false;
            beginValey = false;
        }
    }
    return countValey;
}
function main() {
    var ws = fs_1.createWriteStream(process.env['OUTPUT_PATH']);
    var steps = parseInt(readLine().trim(), 10);
    var path = readLine();
    var result = countingValleys(steps, path);
    ws.write(result + '\n');
    ws.end();
}
