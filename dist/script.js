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
//use the interface?
function getJokes() {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
            // console.log("all data", data);
            // console.log("data.id", data.id);
            console.log("data.joke", data.joke);
            // console.log("datastatus", data.status);
            return data.joke;
        });
    });
}
exports.getJokes = getJokes;
function displayJokes() {
    return __awaiter(this, void 0, void 0, function* () {
        const jokeText = document.getElementById('jokeText');
        const joke = yield getJokes();
        jokeText.innerText = `"${joke}"`;
    });
}
exports.displayJokes = displayJokes;
