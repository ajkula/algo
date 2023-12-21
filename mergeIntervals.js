const testResult = require('./testAnswers');

testResult([
  [mergeIntervals, [[[1, 3], [2, 6], [8, 10], [15, 18]]], [[1, 6], [8, 10], [15, 18]], "Test 1"],
  [mergeIntervals, [[[1, 4], [4, 5]]], [[1, 5]], "Test 2"],
  [mergeIntervals, [[[6, 8], [1, 9], [2, 4], [4, 7]]], [[1, 9]], "Test 3"],
  [mergeIntervals, [[[1, 4], [2, 3]]], [[1, 4]], "Test 4"],
  [mergeIntervals, [[[]]], [], "Test 5 (liste vide)"],
]);


/**
    Problème : Fusion de plages horaires 

    Énoncé : Vous avez une liste de plages horaires représentées par 
    des paires de nombres entiers, où chaque paire représente le début
    et la fin d'une plage horaire.
    Votre tâche est de fusionner toutes les plages horaires qui se chevauchent
    et de retourner une liste consolidée.

    Exemple :

    Entrée : [[1, 3], [2, 6], [8, 10], [15, 18]]
    Sortie : [[1, 6], [8, 10], [15, 18]]

    Explication : Les plages horaires [1, 3] et [2, 6] se chevauchent,
    donc elles sont fusionnées en [1, 6].

    Conseils :
    Triez d'abord les plages horaires par leur heure de début.
    Parcourez la liste triée et fusionnez les plages horaires si nécessaire.
 */

function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];
  
  intervals.sort((a, b) => a[0] - b[0]);
  const consumer = provider(intervals);

  let item = consumer.next();
  if (!Array.isArray(item.value) || item.value.length === 0) return [];
  const result = [item.value];
  let cursor = 0;

  while (!item.done) {
    if (result[cursor][1] >= item.value[0]) {
      result[cursor][1] = Math.max(result[cursor][1], item.value[1]);
    } else {
      result.push(item.value);
      cursor++;
    }

    item = consumer.next();
  }

  return result;
}

function* provider(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i];
  }
}
