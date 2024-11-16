/*
Функция для проверки длины строки.
Пригодится для валидации формы.
*/
const checkLengthString = (checkedString, maxlength) => checkedString.length <= maxlength;

checkLengthString('проверяемая строка', 20); // true
checkLengthString('проверяемая строка', 10); // false

/*
Функция для проверки, является ли строка палиндромом.
*/
const checkPalindrome = function(string) {
  const withoutSpaces = string.replaceAll(' ', '').toUpperCase();
  let reverseString = '';
  for (let i = withoutSpaces.length - 1; i >= 0; i --) {
    reverseString += withoutSpaces.at(i)
  }
  return reverseString === withoutSpaces;
}

checkPalindrome('топот'); // true
checkPalindrome('Кекс');  // false
checkPalindrome('Лёша на полке клопа нашёл '); // true
