import computerData from '../Resources/computerData.json';
import { endOfMonth } from 'date-fns';
export const capitlaizeWord = (word) => word[0].toUpperCase() + word.slice(1);

export const getFullName = () => computerData && `${computerData.vars.FIRSTNAME} ${computerData.vars.LASTNAME}`;

const insertGlobalDataIntoString = (line) => {
    let newLine = line;
    computerData && Object.keys(computerData.vars).forEach((k) => {
        let keyName = `%${k}%`;
        newLine = newLine.replaceAll(keyName, computerData.vars[k]);
    });
    return newLine;
}

export const insertGlobalData = (text) => {
    let replacedText = text;
    if (Array.isArray(text)) {
        text.forEach((line, index) => {
            replacedText[index] = insertGlobalDataIntoString(line);
        });
        return replacedText;
    } else {
        return insertGlobalDataIntoString(replacedText);
    }
}

export function fadeLockScreen() {
    const lockScreen = document.getElementsByClassName('login-screen-container')[0];
    if (lockScreen) {
        if (lockScreen.classList.contains("fade-out")) {
            lockScreen.classList.remove("fade-out");
            lockScreen.classList.add("fade-in");
        } else {
            lockScreen.classList.remove("fade-in");
            lockScreen.classList.add("fade-out");
        }
    }
}

export function slideStartScreen() {
    const startScreen = document.getElementsByClassName('start-screen')[0];
    if (startScreen) {
        if (startScreen.classList.contains("slide-up")) {
            startScreen.classList.remove("slide-up");
            startScreen.classList.add("slide-down");
        } else {
            startScreen.classList.remove("slide-down");
            startScreen.classList.add("slide-up");
        }
    }
}

export const parseDate = (dateText) => {
  let [parsedMonth, parsedDay, parsedYear] = dateText.split(/\//);
  // Dates can be in the format of M/D/Y, where M and Y can be relative to the current month and year, respectively. 
  // For example, if the current month is May (5) and the current year is 2024, then:
  // - M+1 would represent June (6)
  // - M-1 would represent April (4)
  // Dates can also be explicitly set
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  if (parsedMonth.startsWith('M') && parsedMonth.length > 1) {
    let distance = parseInt(parsedMonth.slice(1));
    // To prevent overflow, if the distance is greater than 12 or less than -12, we can cap it at 11 or -11,
    // If the distance is exactly 12 or -12 -> 0 bc same month.
    if (distance > 12) {
        distance = 11;
    } else if (distance < -12) {
        distance = -11;
    } else if (Math.abs(distance) === 12) {
        distance = 0;
    }

    parsedMonth = currentMonth + distance;
    // Handle month overflow
    if (parsedMonth > 12) {
        parsedMonth = parsedMonth % 12;
    }
  } else if (parsedMonth === 'M') {
    parsedMonth = currentMonth;
  }
  
  if (parsedYear.startsWith('Y') && parsedYear.length > 1) {
    let distance = parseInt(parsedYear.slice(1));
    parsedYear = currentYear + distance;
  } else if (parsedYear === 'Y') {
    parsedYear = currentYear;
  }

  // Handle day overflow
  let intendedDate = new Date(parsedYear, parsedMonth - 1, parsedDay);
  if (intendedDate.getMonth() !== parsedMonth - 1) {
    intendedDate = endOfMonth(new Date(parsedYear, parsedMonth - 1, 1));
  }
  
  return intendedDate;
}