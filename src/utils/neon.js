function randomFromInterval(from,to) {
    return Math.floor(Math.random()*(to - from) + from);
}


function hasClass(element, cls) {
    return element.classList.contains(cls)
}

function flicker(randomLetter, flickerNumber) {
    if (flickerNumber === 0) return;

    setTimeout(function () {
        if (hasClass(randomLetter, 'off')) randomLetter.className = '';
        else randomLetter.className = 'off';

        flicker(randomLetter, flickerNumber - 1);
    }, 30);
}

export default function loop(letters) {
    let flickers = [5, 8, 9, 12];

    let randInterval = randomFromInterval(1000, 5000);

    let randomLetter = letters[randomFromInterval(0, letters.length)];
    let flickerNumber = flickers[randomFromInterval(0, flickers.length)];

    setTimeout(function () {
        flicker(randomLetter, flickerNumber);
        loop(letters);
    }, randInterval)
}