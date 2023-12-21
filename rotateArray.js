const testResult = require('./testAnswers');

testResult([
  [rotateArray, [[1, 2, 3, 4, 5, 6, 7], 3], [5, 6, 7, 1, 2, 3, 4], "Test 1"],
  [rotateArray, [[-1, -100, 3, 99], 2], [3, 99, -1, -100], "Test 2"],
  [rotateArray, [[1, 2, 3, 4, 5], 10], [1, 2, 3, 4, 5], "Test 3 (k égal à la longueur du tableau)"],
  [rotateArray, [[1, 2, 3, 4, 5], 0], [1, 2, 3, 4, 5], "Test 4 (pas de rotation)"],
  [rotateArray, [[], 3], [], "Test 5 (tableau vide)"],
]);


/**
    Problème : Rotation d'un tableau 
    Énoncé : Écrivez une fonction qui effectue une rotation à droite
    d'un tableau arr de k pas.
    Chaque pas de rotation déplace chaque élément du tableau vers la droite,
    et le dernier élément devient le premier.

    Exemples :

    Entrée : arr = [1, 2, 3, 4, 5, 6, 7], k = 3
    Sortie : [5, 6, 7, 1, 2, 3, 4]

    Entrée : arr = [-1, -100, 3, 99], k = 2
    Sortie : [3, 99, -1, -100]

    Conseils :
    Pensez à utiliser des méthodes de tableau comme slice et concat.
    N'oubliez pas de gérer les cas où k est plus grand que la longueur du tableau.
*/

function rotateArray(arr, k) {
  if (arr.length === 0) return arr;
  k %= arr.length;
  let cutPoint = arr.length - k;
  return [...arr.slice(cutPoint), ...arr.slice(0, cutPoint)];
}