// const id = 25;

// export function age(age: number = id): number {
//     return age;
// }

// const name = "tree";

// export function myName(myname: string = name) : string{
//     return `Hello my name is ${myname} and im ${age(id)}`;
// }

// console.log(myName());

interface jokeData {

}

export function getJokes(): Promise<string> {
    return fetch('https://icanhazdadjoke.com', {
        headers: {
            'Accept': "application/json"
        }
    })

    .then(response => response.json())
    .then(data => {
        console.log(data.joke);
        
        return data.joke
    })
    .catch(error => console.error('Error:', error));
}

const button = document.getElementById("btn");
const pe = document.getElementById("myp");
