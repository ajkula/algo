const testResult = require('./testAnswers');

testResult([
  [findCommonElements, [[1, 2, 3], [2, 3, 4], [3, 4, 5]], [3], "Test 1"],
  [findCommonElements, [[1, 2, 3], [4, 5, 6], [7, 8, 9]], [], "Test 2 (un tableau vide)"],
  [findCommonElements, [[1, 2, 3, 4, 5], [2, 3, 4], [3, 4, 5, 6]], [3, 4], "Test 3"],
  [findCommonElements, [[], [2, 3, 4], [3, 4, 5]], [], "Test 4 (un tableau vide)"],
  [findCommonElements, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], [1], "Test 5 (éléments identiques)"],
]);


/**
    Problème : Écrire une fonction findCommonElements qui prend trois
    tableaux triés en ordre croissant et retourne un tableau contenant
    les éléments communs aux trois tableaux.

    Si aucun élément commun n'est trouvé,
    la fonction doit retourner un tableau vide.
*/ 

function findCommonElements(arr1, arr2, arr3) {
  const result = [];
  let cur1 = 0, cur2 = 0, cur3 = 0;

  // Vérifie si l'un des tableaux est vide
  if (arr1.length === 0 || arr2.length === 0 || arr3.length === 0) {
    return result;
  }

  while (cur1 < arr1.length && cur2 < arr2.length && cur3 < arr3.length) {
    const val1 = arr1[cur1], val2 = arr2[cur2], val3 = arr3[cur3];

    // Si les trois valeurs sont égales et non présentes dans le résultat
    if (val1 === val2 && val1 === val3) {
      if (result.length === 0 || result[result.length - 1] !== val1) {
        result.push(val1);
      }
      cur1++; cur2++; cur3++;
    } else {
      // Avance le curseur de la plus petite valeur
      if (val1 <= Math.min(val2, val3)) cur1++;
      else if (val2 <= Math.min(val1, val3)) cur2++;
      else cur3++;
    }
  }

  return result;
}
