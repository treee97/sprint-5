"use strict";
// const id = 25;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJokes = void 0;
function getJokes() {
    return fetch('https://icanhazdadjoke.com', {
        headers: {
            'Accept': "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
        console.log(data.joke);
        return data.joke;
    })
        .catch(error => console.error('Error:', error));
}
exports.getJokes = getJokes;
const button = document.getElementById("btn");
const pe = document.getElementById("myp");
