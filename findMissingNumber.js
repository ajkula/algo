const testResult = require('./testAnswers');

testResult([
  [findMissingNumbers, [[1, 2, 4, 6, 3, 7, 8], 8], [5], "Test 1"],
  [findMissingNumbers, [[1, 2, 3, 5], 5], [4], "Test 2"],
  [findMissingNumbers, [[1, 2, 3, 4, 5], 5], [], "Test 3 (aucun nombre manquant)"],
  [findMissingNumbers, [[], 3], [1, 2, 3], "Test 4 (tableau vide)"],
  [findMissingNumbers, [[2, 3, 4], 4], [1], "Test 5 (manque le premier nombre)"],
  [findMissingNumbers, [[1, 3, 4, 5], 5], [2], "Test 6"],
]);


/**
    Problème : Trouver les nombres manquants dans un tableau 
    Énoncé : Vous avez un tableau arr qui contient des nombres de 1 à n,
    mais certains nombres sont manquants.
    Écrivez une fonction qui retourne tous les nombres manquants dans le tableau.

    Exemples :

    Entrée : arr = [1, 2, 4, 6, 3, 7, 8], n = 8
    Sortie : [5]

    Entrée : arr = [1, 2, 3, 5], n = 5
    Sortie : [4]

    Conseils :
    Pensez à utiliser un ensemble (Set) pour stocker et vérifier rapidement
    les éléments.
    Vous pouvez également essayer une approche mathématique en calculant
    la somme attendue de 1 à n et en la comparant à la somme des éléments
    du tableau.
*/

function findMissingNumbers(arr, n) {
  if (arr.length === 0) {
    return Array.from({ length: n }, (_, i) => i + 1);
  }

  const set = new Set(arr);
  const missing = [];

  for (let i = 1; i <= n; i++) {
    if (!set.has(i)) {
      missing.push(i);
    }
  }

  return missing;
}