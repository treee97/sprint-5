interface jokeData {
    id: string
    joke: string
    status: number
}
// https://www.sohamkamani.com/typescript/rest-http-api-call/?utm_content=cmp-true
// API USE

export async function getJokes(): Promise<jokeData[]> {

      return fetch('https://icanhazdadjoke.com/', {
        headers: {
          'Accept': 'application/json',
        }
      })
      .then(response => response.json())
      .then(data => {

        const jokeArray: jokeData[] = [data as jokeData];
        // console.log(jokeArray);
        
        return jokeArray
      })
  }



export async function displayJokes(): Promise<void> {
  const reportJokes: any = [];


  const jokeText = document.getElementById('jokeText') as HTMLElement;
  const rating = document.getElementById("rating") as HTMLElement;
  //rating = contenedor de los botones
  rating.style.display = 'flex';
  
  const joke = getJokes()
    .then(jokeData => {
      jokeData.map(j => {reportJokes.push({...j, joke: j.joke}); jokeText.innerText = j.joke});
     //agregamos el joke al innerText de jokeText;
    });

    const ratingBtn = document.querySelectorAll(".app__jokes-container_ratings-buttons button");
    const voteBtn = document.getElementById("voteBtn") as HTMLElement;
    const nextBtn = document.getElementById("nextBtn") as HTMLElement;

    const voteContainer = document.querySelector('.app__jokes-container_ratings-vote') as HTMLElement;
    const btnContainer = document.querySelector('.app__jokes-container_ratings-buttons') as HTMLElement;
    
    voteBtn.addEventListener('click', () => {
      voteContainer.style.display= 'none';
      btnContainer.style.display = 'flex';
    })

    nextBtn.addEventListener('click', () => {
      voteContainer.style.display= 'none';
      btnContainer.style.display = 'flex';
    })

    ratingBtn.forEach(btn => {
      btn.addEventListener('click', (btn) => {
        voteContainer.style.display= 'flex';
        btnContainer.style.display = 'none';
        
        const date = new Date();
        
        reportJokes.push({joke: joke, score: btn, date: date.toISOString()});

      })
    });

    console.log("reportJokes e => ", reportJokes);
    
}

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