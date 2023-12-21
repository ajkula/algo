const testResult = require('./testAnswers');

testResult([
  [smallestRange, [[[1, 2, 3], [1, 2, 3, 4], [1, 2, 3, 4, 5]]], [1, 1], "Test 1"],
  [smallestRange, [[[4, 10, 15, 24, 26], [0, 9, 12, 20], [5, 18, 22, 30]]], [20, 24], "Test 2"],
  [smallestRange, [[[1, 3, 5], [2, 4], [3, 6]]], [3, 3], "Test 3"],
  [smallestRange, [[[1], [2], [3]]], [1, 3], "Test 4"],
  [smallestRange, [[[1, 2, 3], [], [1, 2, 3, 4, 5]]], [], "Test 5 (une liste vide)"],
]);

/**
    Problème : Trouver le plus petit intervalle contenant au moins un élément
    de chaque liste.
    Énoncé : Vous avez k listes d'entiers triées en ordre croissant.
    Trouvez le plus petit intervalle numérique qui contient au moins
    un nombre de chaque liste. Si plusieurs intervalles de même taille
    sont possibles, retournez celui avec le plus petit nombre de départ.

    Exemple :

    Entrée : [[1, 2, 3], [1, 2, 3, 4], [1, 2, 3, 4, 5]]
    Sortie : [1, 1] (l'intervalle [1, 1] contient au moins un élément de chaque 
    liste et est le plus petit possible)

    Conseils :
    Pensez à utiliser une structure de données comme un tas (heap) pour garder 
    une trace du plus petit élément et de l'indice de sa liste.
    Vous devrez peut-être garder une trace de la plage actuelle
    et la mettre à jour à chaque fois que vous trouvez un intervalle plus petit.
*/


function smallestRange(lists) {
  if (lists.some(list => list.length === 0)) {
    return [];
  }

  let minHeap = [];
  let max = -Infinity;
  let rangeStart = 0, rangeEnd = Infinity;

  // Initialiser le tas minimum et trouver la valeur maximale initiale
  for (let i = 0; i < lists.length; i++) {
    minHeap.push({ value: lists[i][0], listIndex: i, elementIndex: 0 });
    max = Math.max(max, lists[i][0]);
  }

  // Fonction pour maintenir les propriétés du tas minimum
  const heapify = (index) => {
    let smallest = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    if (left < minHeap.length && minHeap[left].value < minHeap[smallest].value) {
      smallest = left;
    }
    if (right < minHeap.length && minHeap[right].value < minHeap[smallest].value) {
      smallest = right;
    }

    if (smallest !== index) {
      [minHeap[smallest], minHeap[index]] = [minHeap[index], minHeap[smallest]];
      heapify(smallest);
    }
  };

  // Construire le tas minimum
  for (let i = Math.floor(minHeap.length / 2) - 1; i >= 0; i--) {
    heapify(i);
  }

  while (true) {
    const { value, listIndex, elementIndex } = minHeap[0];

    // Mettre à jour la plage si nécessaire
    if (max - value < rangeEnd - rangeStart) {
      rangeStart = value;
      rangeEnd = max;
    }

    // Vérifier si nous avons atteint la fin d'une des listes
    if (elementIndex === lists[listIndex].length - 1) {
      break;
    }

    // Mettre à jour le tas minimum avec le prochain élément de la liste actuelle
    minHeap[0] = {
      value: lists[listIndex][elementIndex + 1],
      listIndex,
      elementIndex: elementIndex + 1
    };

    // Mettre à jour la valeur maximale
    max = Math.max(max, lists[listIndex][elementIndex + 1]);

    // Maintenir les propriétés du tas minimum
    heapify(0);
  }

  return [rangeStart, rangeEnd];
}





// Fonction pour comparer deux intervalles et retourner le plus petit
function diffVal(arr1, arr2) {
  return arr1[1] - arr1[0] < arr2[1] - arr2[0] ? arr1 : arr2;
}