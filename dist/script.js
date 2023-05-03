"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayJokes = exports.getJokes = void 0;
// https://www.sohamkamani.com/typescript/rest-http-api-call/?utm_content=cmp-true
// API USE
function getJokes() {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
            const jokeArray = [data];
            // console.log(jokeArray);
            return jokeArray;
        });
    });
}
exports.getJokes = getJokes;
function displayJokes() {
    return __awaiter(this, void 0, void 0, function* () {
        const reportJokes = [];
        const jokeText = document.getElementById('jokeText');
        const rating = document.getElementById("rating");
        //rating = contenedor de los botones
        rating.style.display = 'flex';
        const joke = getJokes()
            .then(jokeData => {
            jokeData.map(j => { reportJokes.push(Object.assign(Object.assign({}, j), { joke: j.joke })); jokeText.innerText = j.joke; });
            //agregamos el joke al innerText de jokeText;
        });
        const ratingBtn = document.querySelectorAll(".app__jokes-container_ratings-buttons button");
        const voteBtn = document.getElementById("voteBtn");
        const nextBtn = document.getElementById("nextBtn");
        const voteContainer = document.querySelector('.app__jokes-container_ratings-vote');
        const btnContainer = document.querySelector('.app__jokes-container_ratings-buttons');
        voteBtn.addEventListener('click', () => {
            voteContainer.style.display = 'none';
            btnContainer.style.display = 'flex';
        });
        nextBtn.addEventListener('click', () => {
            voteContainer.style.display = 'none';
            btnContainer.style.display = 'flex';
        });
        ratingBtn.forEach(btn => {
            btn.addEventListener('click', (btn) => {
                voteContainer.style.display = 'flex';
                btnContainer.style.display = 'none';
                const date = new Date();
                reportJokes.push({ joke: joke, score: btn, date: date.toISOString() });
            });
        });
        console.log("reportJokes e => ", reportJokes);
    });
}
exports.displayJokes = displayJokes;
// for some reason this doesnt work in ts but it does work in a normal script like in the testing.js
// const nextBtn = document.getElementById("btn") as HTMLElement | null;
//   nextBtn?.addEventListener('click', () => {
//     console.log("hello!");   
//   }) 
// generar array reportJokes
// {
//   joke: ...displayJokes,
//   score: 1,
//   date: ... (date toISOString());
// }
// -campos del 1 al 3 para puntuarlo 1<3
// - botones no se muestran inicialmente.
// - votacion opcional. Se puede pasar al siguiente chiste sin votar.
// - una vez se vota, el usuario tiene la opcion de cambiar la votacion antes de pasar al siguiente joke.
// - añadir toda la data al nuevo Array. 
// - Enseñar el array por consola.
