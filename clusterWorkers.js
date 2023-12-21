const testResult = require('./testAnswers');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');


/**
 * A function must be applied to each elements of an array concurrently
 * resulting array must have similar indexes positions with source array.
 */

const processData = (data) => {
    return data * 2;
};

if (isMainThread) {
    const doCalculations = async (data) => {
        const results = new Array(data.length);
        const promises = data.map((value, index) => {
            return new Promise((resolve, reject) => {
                const worker = new Worker(__filename, { workerData: { value, index } });
                worker.on('message', ({ result, index }) => {
                    results[index] = result;
                    resolve();
                });
                worker.on('error', reject);
                worker.on('exit', (code) => {
                    if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
                });
            });
        });

        await Promise.all(promises);
        return results;
    };

    (async () => {
        testResult([
            [doCalculations, [[1, 3, 5, 2, 4, 6]], [2, 6, 10, 4, 8, 12], "Test 1"],
            [doCalculations, [[10, 20, 30, 15, 25, 35]], [20, 40, 60, 30, 50, 70], "Test 2"],
            [doCalculations, [[1, 2, 3]], [2, 4, 6], "Test 3"],
            [doCalculations, [[4, 5, 6]], [8, 10, 12], "Test 4"],
            [doCalculations, [[]], [], "Test 5 (tableau vide)"],
        ]);
    })();
} else {
    const { value, index } = workerData;
    const result = processData(value);
    parentPort.postMessage({ result, index });
}