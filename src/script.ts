interface jokeData {
    id: string
    joke: string
    status: number
}
//use the interface?

export async function getJokes(): Promise<string> {

      return fetch('https://icanhazdadjoke.com/', {
        headers: {
          'Accept': 'application/json',
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log("data.joke", data.joke);
        
        return data.joke
      })
  }

export async function displayJokes(): Promise<void> {
  const jokeText = document.getElementById('jokeText') as HTMLElement;
  const rating = document.getElementById("rating") as HTMLElement;
  rating.style.display = 'flex';
  
  const joke = await getJokes()
  jokeText.innerText = `"${joke}"`;
}


const reportJokes = [];

export async function getRatings(score) {

  const joke = await getJokes();
  const date = new Date();

  reportJokes.push({joke: joke, score: score, date: date.toISOString()})

  const voteContainer = document.querySelector('.app__jokes-container_ratings-vote');
  const btnContainer = document.querySelector('.app__jokes-container_ratings-buttons');

  btnContainer.style.display = 'none';
  voteContainer.style.display = 'flex';

  const voteAgainBtn = voteContainer.querySelector('button');
  voteAgainBtn.onclick = function() {
    voteContainer.style.display = 'none';
    btnContainer.style.display = 'flex';
  }

}
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