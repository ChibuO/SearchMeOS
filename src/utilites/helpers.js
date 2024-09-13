import computerData from '../Resources/computerData.json';

export const capitlaizeWord = (word) => word[0].toUpperCase() + word.slice(1);

export const getFullName = () => computerData && `${computerData.vars.FIRSTNAME} ${computerData.vars.LASTNAME}`;

const insertDataIntoString = (line) => {
    let newLine = line;
    computerData && Object.keys(computerData.vars).forEach((k) => {
        let keyName = `%${k}%`;
        newLine = newLine.replaceAll(keyName, computerData.vars[k]);
    });
    return newLine;
}

export const insertData = (text) => {
    let replacedText = text;
    if (Array.isArray(text)) {
        text.forEach((line, index) => {
            replacedText[index] = insertDataIntoString(line);
        });
        return replacedText;
    } else {
        return insertDataIntoString(replacedText);
    }
}

export function fadeLockScreen() {
    const lockScreen = document.getElementsByClassName('login-screen-container')[0];
    if (lockScreen.classList.contains("fade-out")) {
        lockScreen.classList.remove("fade-out");
        lockScreen.classList.add("fade-in");
    } else {
        lockScreen.classList.remove("fade-in");
        lockScreen.classList.add("fade-out");
    }
}

export function slideStartScreen() {
    const startScreen = document.getElementsByClassName('start-screen')[0];
    if (startScreen.classList.contains("slide-up")) {
        startScreen.classList.remove("slide-up");
        startScreen.classList.add("slide-down");
    } else {
        startScreen.classList.remove("slide-down");
        startScreen.classList.add("slide-up");
    }
}