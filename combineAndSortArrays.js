const testResult = require('./testAnswers');

testResult([
  [combineAndSortArrays, [[1, 3, 5], [2, 4, 6]], [1, 2, 3, 4, 5, 6], "Test 1"],
  [combineAndSortArrays, [[10, 20, 30], [15, 25, 35]], [10, 15, 20, 25, 30, 35], "Test 2"],
  [combineAndSortArrays, [[], [1, 2, 3]], [1, 2, 3], "Test 3 (premier tableau vide)"],
  [combineAndSortArrays, [[4, 5, 6], []], [4, 5, 6], "Test 4 (deuxième tableau vide)"],
  [combineAndSortArrays, [[], []], [], "Test 5 (deux tableaux vides)"],
]);

/**
    Problème : Combiner et trier deux tableaux 
    Énoncé : Écrivez une fonction qui prend deux tableaux triés arr1 et arr2 
    et retourne un nouveau tableau qui combine les deux tableaux et les trie.

    Exemples :

    Entrée : arr1 = [1, 3, 5], arr2 = [2, 4, 6]
    Sortie : [1, 2, 3, 4, 5, 6]

    Entrée : arr1 = [10, 20, 30], arr2 = [15, 25, 35]
    Sortie : [10, 15, 20, 25, 30, 35]

    Conseils :
    Pensez à utiliser des méthodes de tableau comme concat et sort.
    Assurez-vous que la fonction fonctionne correctement même si un des tableaux
    est vide.
*/


function combineAndSortArrays(arr1, arr2) {
  let combined = [];
  let i = 0, j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      combined.push(arr1[i]);
      i++;
    } else {
      combined.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    combined.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    combined.push(arr2[j]);
    j++;
  }

  return combined;
}