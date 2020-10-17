// let document = window.document;
// console.log('document', document.getElementsByClassName('neon_on_off'))
// let textHolder = document.getElementsByClassName('neon_on_off')[0],
//     text = textHolder.innerHTML,
//     chars = text.length,
//     newText = '',
//     i;
//
// for (i = 0; i < chars; i += 1) {
//     newText += '<i>' + text.charAt(i) + '</i>';
// }
//
// textHolder.innerHTML = newText;
//
// let letters = document.getElementsByTagName('i'),
//     flickers = [5, 7, 9, 11];
//
//
// let randomLetter,
//     flickerNumber,
//     counter;
//
// export function randomFromInterval(from,to) {
//     return Math.floor(Math.random()*(to-from+1)+from);
// }
//
// export function hasClass(element, cls) {
//     return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
// }
//
// export function flicker() {
//     counter += 1;
//
//     if (counter === flickerNumber) {
//         return;
//     }
//
//     setTimeout(function () {
//         if(hasClass(randomLetter, 'off')) {
//             randomLetter.className = '';
//         }
//         else {
//             randomLetter.className = 'off';
//         }
//
//         flicker();
//     }, 30);
// }
//
//
// export default function neon_loop() {
//     let rand = randomFromInterval(500,2000);
//     let randomLetter, flickerNumber, counter;
//
//     randomLetter = randomFromInterval(0, 5);
//     randomLetter = letters[randomLetter];
//
//     flickerNumber = randomFromInterval(0, 3);
//     flickerNumber = flickers[flickerNumber];
//
//     setTimeout(function() {
//         counter = 0;
//         flicker();
//         neon_loop();
//     }, rand);
// }