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

/*
Функция для проверки, не выходит ли встреча за рамки рабочего дня.
*/
function checkMeetingTime (workStart, workEnd, meetingStart, meetingDuration) {
  function timeToMinutes (time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
  const workStartMinutes = timeToMinutes(workStart);
  const workEndMinutes = timeToMinutes(workEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
}

checkMeetingTime('08:00', '17:30', '14:00', 90); // true
checkMeetingTime('8:0', '10:0', '8:0', 120);     // true
checkMeetingTime('08:00', '14:30', '14:00', 90); // false
checkMeetingTime('14:00', '17:30', '08:0', 90);  // false
checkMeetingTime('8:00', '17:30', '08:00', 900); // false
