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
;
function getJokes(type) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = type === 'dadJoke' ? 'https://icanhazdadjoke.com/' : 'https://api.chucknorris.io/jokes/random';
        const res = yield fetch(url, {
            headers: {
                'Accept': 'application/json',
            }
        });
        const data = yield res.json();
        let joke; /* iniciar fuera del if */
        if (type === 'dadJoke') {
            const dadJokeData = data;
            joke = dadJokeData.joke;
        }
        else {
            const norrisJokeData = data;
            joke = norrisJokeData.value;
        }
        console.log(joke);
        return joke;
        // .then(response => response.json())
        // .then(data => {
        //   const jokeArray: jokeData[] = [data as jokeData];
        //   // console.log(jokeArray);
        //   return jokeArray
        //     })
    });
}
exports.getJokes = getJokes;
function displayJokes() {
    return __awaiter(this, void 0, void 0, function* () {
        const reportJokes = [];
        const jokeText = document.getElementById('jokeText');
        const rating = document.getElementById("rating");
        rating.style.display = 'flex';
        const getRandomType = Math.random() < 0.5 ? 'dadJoke' : 'norrisJoke';
        const jokeData = yield getJokes(getRandomType);
        jokeText.innerText = jokeData;
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
        let scoreSelected = false;
        ratingBtn.forEach(btns => {
            btns.addEventListener('click', (btn) => __awaiter(this, void 0, void 0, function* () {
                voteContainer.style.display = 'flex';
                btnContainer.style.display = 'none';
                const target = btn.target;
                const date = new Date();
                const score = parseInt(target.innerHTML);
                const itemExists = reportJokes.find(item => item.joke === jokeText.innerHTML);
                if (itemExists) {
                    itemExists.score = score;
                }
                else {
                    const jokeObj = {
                        joke: jokeText.innerHTML,
                        score: score,
                        date: date.toISOString()
                    };
                    reportJokes.push(jokeObj);
                    console.log(reportJokes);
                }
                scoreSelected = true;
                // console.log(reportJokes);
                // (isNaN(score) ? 0 : score) no funciona xq estoy dentro de botones
            }));
        });
        nextBtn.addEventListener('click', () => {
            if (!scoreSelected) {
                const jokeObj = {
                    joke: jokeText.innerHTML,
                    score: 0,
                    date: new Date().toISOString()
                };
                reportJokes.push(jokeObj);
            }
            scoreSelected = false;
        });
    });
}
exports.displayJokes = displayJokes;
// for some reason this doesnt work in ts but it does work in a normal script like in the testing.js
// const nextBtn = document.getElementById("btn") as HTMLElement | null;
//   nextBtn?.addEventListener('click', () => {
//     console.log("hello!");   
//   }) 
