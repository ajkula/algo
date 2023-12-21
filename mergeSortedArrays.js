const testResult = require('./testAnswers');

testResult([
  [mergeSortedArrays, [[1, 3, 5], [2, 4, 6]], [1, 2, 3, 4, 5, 6], "Test 1 Failed"],
  [mergeSortedArrays, [[0, 3, 4, 31], [4, 6, 30]], [0, 3, 4, 4, 6, 30, 31], "Test 2 Failed"],
  [mergeSortedArrays, [[], [1, 2, 3]], [1, 2, 3], "Test 3 Failed"],
  [mergeSortedArrays, [[5, 6, 7], []], [5, 6, 7], "Test 4 Failed"],
  [mergeSortedArrays, [[], []], [], "Test 5 Failed"],
  [mergeSortedArrays, [[2, 2, 2], [2, 2, 2]], [2, 2, 2, 2, 2, 2], "Test 6 Failed"],
]);

/**
    Problème : Fusionner deux tableaux triés
    Énoncé : Vous avez deux tableaux triés arr1 et arr2.
    Écrivez une fonction qui fusionne ces deux tableaux en un seul tableau,
    qui doit également être trié.
    La fonction doit retourner le nouveau tableau fusionné.

    Exemples :

    Entrée : arr1 = [1, 3, 5], arr2 = [2, 4, 6]
    Sortie : [1, 2, 3, 4, 5, 6]

    Entrée : arr1 = [0, 3, 4, 31], arr2 = [4, 6, 30]
    Sortie : [0, 3, 4, 4, 6, 30, 31]
*/


function mergeSortedArrays(arr1, arr2) {
  if (arr1.length === 0) return arr2;
  if (arr2.length === 0) return arr1;

  const res = [];
  let cursor1 = 0, cursor2 = 0;

  while (cursor1 < arr1.length || cursor2 < arr2.length) {
    if (cursor1 < arr1.length && (cursor2 >= arr2.length || arr1[cursor1] <= arr2[cursor2])) {
      res.push(arr1[cursor1]);
      cursor1++;
    } else {
      res.push(arr2[cursor2]);
      cursor2++;
    }
  }

  return res;
}