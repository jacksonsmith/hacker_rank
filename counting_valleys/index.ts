'use strict';

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
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

function countingValleys(steps: number, path: string): number {
    let altitude = 0
    let beginValey = false
    let endValey = false
    let countValey = 0
    
    for (const l of path) {
        let altitudeIncrement = l === "U" ? 1 : -1
        
        altitude = altitude + altitudeIncrement
        
        if (altitude === -1 && endValey === false) {
            beginValey = true;
        } else if (altitude === 0 && beginValey === true) {
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
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const steps: number = parseInt(readLine().trim(), 10);

    const path: string = readLine();

    const result: number = countingValleys(steps, path);

    ws.write(result + '\n');

    ws.end();
}
