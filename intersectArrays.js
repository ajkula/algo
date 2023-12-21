const testResult = require('./testAnswers');

testResult([
  [intersectArrays, [[1, 2, 3, 4], [2, 3, 5, 6]], [2, 3], "Test 1"],
  [intersectArrays, [[7, 8, 9], [10, 11, 12]], [], "Test 2 (pas d'intersection)"],
  [intersectArrays, [[1, 1, 2, 2], [2, 2, 3, 3]], [2], "Test 3 (avec doublons)"],
  [intersectArrays, [[], [1, 2, 3]], [], "Test 4 (premier tableau vide)"],
  [intersectArrays, [[1, 2, 3], []], [], "Test 5 (second tableau vide)"],
]);

/**
    Exercice : Intersection de Deux Tableaux

    Problème : Écrivez une fonction intersectArrays qui prend deux 
    tableaux d'entiers et retourne un tableau contenant les éléments 
    communs aux deux tableaux.
    
    Les éléments dans le tableau résultant doivent être uniques (sans doublons).
*/

function intersectArrays(arr1, arr2) {
  const set1 = new Set(arr1);
  const intersection = new Set(arr2.filter(item => set1.has(item)));
  return Array.from(intersection);
}
