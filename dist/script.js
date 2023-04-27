"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJokes = exports.myName = exports.age = void 0;
const id = 25;
function age(age = id) {
    return age;
}
exports.age = age;
const name = "tree";
function myName(myname = name) {
    return `Hello my name is ${myname} and im ${age(id)}`;
}
exports.myName = myName;
console.log(myName());
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
