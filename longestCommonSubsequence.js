const { text } = require('node:stream/consumers');
const testResult = require('./testAnswers');

testResult([
  [longestCommonSubsequence, ["abcde", "ace"], 3, "Test 1"],
  [longestCommonSubsequence, ["abc", "abc"], 3, "Test 2 (séquences identiques)"],
  [longestCommonSubsequence, ["abc", "def"], 0, "Test 3 (pas de sous-séquence commune)"],
  [longestCommonSubsequence, ["", "abc"], 0, "Test 4 (première chaîne vide)"],
  [longestCommonSubsequence, ["abc", ""], 0, "Test 5 (seconde chaîne vide)"],
  [longestCommonSubsequence, ["blablabla", "alabala"], 6, "Test 6 (séquences complexes)"],
]);

/**
    Exercice : Longueur de la plus longue sous-séquence commune
    (LCS - Longest Common Subsequence)

    Problème : Écrivez une fonction longestCommonSubsequence qui prend
    deux chaînes de caractères et retourne la longueur
    de la plus longue sous-séquence commune entre elles.
    
    Une sous-séquence est une séquence qui apparaît dans la même
    ordre relative, mais pas nécessairement de manière consécutive,
    dans les deux chaînes.
*/

function longestCommonSubsequence(text1, text2) {
  return lcs(text1, text2);
}

function lcs(seq1, seq2) {
  const len1 = seq1.length;
  const len2 = seq2.length;
  const dynProg = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (seq1[i - 1] === seq2[j - 1]) {
        dynProg[i][j] = dynProg[i - 1][j - 1] + 1;
      } else {
        dynProg[i][j] = Math.max(dynProg[i - 1][j], dynProg[i][j - 1]);
      }
    }
  }

  // console.log('\n'+dynProg.map(e => e.join(' ')).join('\n'));

  let i = len1, j = len2;
  const lcsString = [];

  while (i > 0 && j > 0) {
    if (seq1[i - 1] === seq2[j - 1]) {
      lcsString.unshift(seq1[i - 1]);
      i--;
      j--;
    } else {
      if (dynProg[i - 1][j] > dynProg[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }
  }

  return lcsString.join('').length;
}