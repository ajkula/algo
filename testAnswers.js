const { performance } = require('perf_hooks');
const async = require('async');

module.exports = function testResult(args, callback) {
  let testsFailed = false;

  // Valeurs de référence (idéales)
  const idealTime = 200; // en ms
  const idealMemory = 102400; // 1 MB en bytes

  const funcs = args.map(test => {
    return async function(callback) {
      const [func, args, expected, testDescription] = test;

      const startTime = performance.now();
      const initialMemoryUsage = process.memoryUsage().heapUsed;

      const result = await func(...args);

      const endTime = performance.now();
      const finalMemoryUsage = process.memoryUsage().heapUsed;

      const timeTaken = endTime - startTime;
      const memoryUsed = finalMemoryUsage - initialMemoryUsage;

      // Calcul du score
      const timeScore = Math.max(0, 100 - (timeTaken / idealTime) * 100);
      const memoryScore = Math.max(0, 100 - (memoryUsed / idealMemory) * 100);
      const overallScore = (timeScore + memoryScore) / 2;

      console.log(`\nTest: ${testDescription}`);
      console.log(`Temps d'exécution: ${timeTaken.toFixed(2)} ms, Score: \x1b[31m${timeScore.toFixed(2)}\x1b[0m`);
      console.log(`Mémoire utilisée: ${memoryUsed} bytes, Score: \x1b[31m${memoryScore.toFixed(2)}\x1b[0m`);
      console.log(`\x1b[32mScore global: ${overallScore.toFixed(2)}\x1b[0m`);

      if (JSON.stringify(result) !== JSON.stringify(expected)) {
        console.log("Test échoué:", testDescription);
        console.log("Attendu:", expected, "Obtenu:", result);
        testsFailed = true;
      }

      callback();
    };
  });

  async.parallel(funcs, () => {
    if (testsFailed) {
      console.log("\x1b[31mCertains tests ont échoué.\x1b[0m\n");
    } else {
      console.log("\x1b[32mTous les tests sont passés!\x1b[0m\n");
    }
    if (callback) callback(testsFailed);
  });
}
