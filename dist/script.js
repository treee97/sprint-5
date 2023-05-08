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
exports.displayJokes = exports.getJokes = exports.displayWeather = exports.getWeather = void 0;
;
// WEATHER API
function getWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        const URL = 'https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=2.1686&lat=41.3874&units=metric';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b428837115msh4714b8f96679ccep12df03jsnadb3a6497ec6',
                'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
            }
        };
        try {
            const response = yield fetch(URL, options);
            const result = yield response.json();
            // console.log(result.data[0].weather.icon);
            // console.log(result.data[0].app_temp);
            const data = {
                icon: result.data[0].weather.icon,
                temperature: result.data[0].app_temp
            };
            return data;
        }
        catch (error) {
            console.log(error);
            return { icon: '', temperature: 0 };
        }
    });
}
exports.getWeather = getWeather;
function displayWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        const weatherText = document.getElementById('weatherText');
        const weatherData = yield getWeather();
        const weatherIcon = `https://cdn.weatherbit.io/static/img/icons/${weatherData.icon}.png`;
        weatherText.innerHTML = `<img src="${weatherIcon}" /> | ${weatherData.temperature} ºC`;
    });
}
exports.displayWeather = displayWeather;
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    yield displayWeather();
});
//union. jokeType es ⁡⁣⁣⁢𝗜𝗠𝗣𝗟𝗜𝗖𝗜𝗧𝗢⁡ que sea de type string
function getJokes(type) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = type === 'dadJoke' ? 'https://icanhazdadjoke.com/' : 'https://api.chucknorris.io/jokes/random';
        const res = yield fetch(url, {
            headers: {
                'Accept': 'application/json',
            }
        });
        const data = yield res.json();
        let joke;
        // declaramos joke y le decimos que sea de tipo string de manera ⁡⁣⁣⁢𝗘𝗫𝗣𝗟𝗜𝗖𝗜𝗧𝗔
        if (type === 'dadJoke') {
            const dadJokeData = data;
            joke = dadJokeData.joke;
        }
        else {
            const norrisJokeData = data;
            joke = norrisJokeData.value;
        }
        // console.log(joke);
        return joke;
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
                }
                scoreSelected = true;
                console.log(reportJokes);
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
