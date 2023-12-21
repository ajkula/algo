const testResult = require('./testAnswers');

testResult([
  [isPalindrome, ["radar"], true, "'radar' should be a palindrome"],
  [isPalindrome, ["Bonjour"], false, "'Bonjour' should not be a palindrome"],
  [isPalindrome, ["Race car"], true, "'Race car' should be a palindrome"],
  [isPalindrome, ["A man, a plan, a canal, Panama"], true, "'A man, a plan, a canal, Panama' should be a palindrome"],
  [isPalindrome, ["No lemon, no melon"], true, "'No lemon, no melon' should be a palindrome"],
  [isPalindrome, [""], true, "Empty string should be a palindrome"],
  [isPalindrome, [" "], true, "Single space should be a palindrome"],
]);


/**
    Problème : Vérifier si une chaîne est un palindrome
    Énoncé : Écrivez une fonction qui prend une chaîne de caractères en entrée
    et retourne true si cette chaîne est un palindrome
    (elle se lit de la même manière de gauche à droite et de droite à gauche),
    et false sinon.

    Exemples :

    Entrée : "radar"
    Sortie : true

    Entrée : "Bonjour"
    Sortie : false

    Vous pouvez ignorer la casse et les espaces pour simplifier le problème.
    Par exemple, "Race car" devrait retourner true.
*/

function isPalindrome(arg) {
  let result = true;
  let str = arg.replace(/[^A-Za-z]/g, "");
  loop: for (let i = 0; i < Math.round(str.length / 2); i++) {
    const cursor = str.length - i - 1;
    if (str[i].toLowerCase() !== str[cursor].toLowerCase()) {
      result = false;
      break loop;
    }
  }
  return result
}