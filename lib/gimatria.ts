export const hebrewToRomanNumber = (heNum: string): number => {
  const letters: Record<string, number> = {
    א: 1,
    ב: 2,
    ג: 3,
    ד: 4,
    ה: 5,
    ו: 6,
    ז: 7,
    ח: 8,
    ט: 9,
    י: 10,
    כ: 20,
    ך: 20,
    ל: 30,
    מ: 40,
    ם: 40,
    נ: 50,
    ן: 50,
    ס: 60,
    ע: 70,
    פ: 80,
    ף: 80,
    צ: 90,
    ץ: 90,
    ק: 100,
    ר: 200,
    ש: 300,
    ת: 400,
  }

  if (!heNum) return 0
  return heNum
    .split('')
    .map(letter => letters[letter] || 0)
    .reduce((acc, val) => acc + val, 0)
}

export const romanToHebrewNumber = (num: number): string => {
  const hebrewNumbers: Record<number, string> = {
    1: 'א',
    2: 'ב',
    3: 'ג',
    4: 'ד',
    5: 'ה',
    6: 'ו',
    7: 'ז',
    8: 'ח',
    9: 'ט',
    10: 'י',
    20: 'כ',
    30: 'ל',
    40: 'מ',
    50: 'נ',
    60: 'ס',
    70: 'ע',
    80: 'פ',
    90: 'צ',
    100: 'ק',
    200: 'ר',
    300: 'ש',
    400: 'ת',
  }

  if (num in hebrewNumbers) {
    return hebrewNumbers[num]
  }

  const thousands = Math.floor(num / 1000)
  const hundreds = Math.floor((num % 1000) / 100) * 100
  const tens = Math.floor((num % 100) / 10) * 10
  const units = num % 10

  return (
    (thousands ? hebrewNumbers[thousands] + ' אלף' : '') +
    (hundreds ? hebrewNumbers[hundreds] : '') +
    (tens ? hebrewNumbers[tens] : '') +
    (units ? hebrewNumbers[units] : '')
  ).trim()
}
