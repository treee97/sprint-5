interface jokeData {
  id: string;
  joke: string;
  status: number;
};

interface norrisData{
  icon_url: string;
  id: string;
  url: string;
  value: string;
}

interface ReportJoke {
joke: string;
score: number;
date: string;
}
// https://www.sohamkamani.com/typescript/rest-http-api-call/?utm_content=cmp-true
// API USE


type jokeType = 'dadJoke' | 'norrisJoke';

export async function getJokes(type: jokeType): Promise<string> {

    const url = type === 'dadJoke' ? 'https://icanhazdadjoke.com/' : 'https://api.chucknorris.io/jokes/random';
    
    const res = await fetch(url, {
          headers: {
            'Accept': 'application/json',
          }
      })

    const data = await res.json();
    let joke: string /* iniciar fuera del if */
    
    if (type === 'dadJoke') {
      const dadJokeData = data as jokeData;
      joke = dadJokeData.joke;
    } else {
      const norrisJokeData = data as norrisData;
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
}


export async function displayJokes(): Promise<void> {

  const reportJokes: ReportJoke[] = [];

  const jokeText = document.getElementById('jokeText') as HTMLElement;
  const rating = document.getElementById("rating") as HTMLElement;
  rating.style.display = 'flex';
  
  const getRandomType = Math.random() < 0.5? 'dadJoke' : 'norrisJoke'; 
  const jokeData = await getJokes(getRandomType);
    jokeText.innerText = jokeData;
  
    const ratingBtn = document.querySelectorAll(".app__jokes-container_ratings-buttons button");
    const voteBtn = document.getElementById("voteBtn") as HTMLElement;
    const nextBtn = document.getElementById("nextBtn") as HTMLElement;
  
    const voteContainer = document.querySelector('.app__jokes-container_ratings-vote') as HTMLElement;
    const btnContainer = document.querySelector('.app__jokes-container_ratings-buttons') as HTMLElement;
    
    voteBtn.addEventListener('click', () => {
      voteContainer.style.display= 'none';
      btnContainer.style.display = 'flex';
    });
  
    nextBtn.addEventListener('click', () => {
      voteContainer.style.display= 'none';
      btnContainer.style.display = 'flex';
    });
  
    let scoreSelected = false;

    ratingBtn.forEach(btns => {
        btns.addEventListener('click', async (btn) => {
            voteContainer.style.display= 'flex';
            btnContainer.style.display = 'none';

            const target = btn.target as HTMLElement;
            const date = new Date();
            const score = parseInt(target.innerHTML);
            

            const itemExists = reportJokes.find(item => item.joke === jokeText.innerHTML)

            if (itemExists) {
              itemExists.score = score;

            }else {
              const jokeObj: ReportJoke = {
                joke: jokeText.innerHTML,
                score: score,
                date: date.toISOString()
              }  
              reportJokes.push(jokeObj);
              console.log(reportJokes);

            }

            scoreSelected = true;
            // console.log(reportJokes);
            // (isNaN(score) ? 0 : score) no funciona xq estoy dentro de botones


        });
    });

    nextBtn.addEventListener('click', () => {
      if (!scoreSelected) {
        const jokeObj: ReportJoke = {
          joke: jokeText.innerHTML,
          score: 0,
          date: new Date().toISOString()
        }  
        reportJokes.push(jokeObj);
      }
      scoreSelected = false;
    })

  }
  


// for some reason this doesnt work in ts but it does work in a normal script like in the testing.js
// const nextBtn = document.getElementById("btn") as HTMLElement | null;
//   nextBtn?.addEventListener('click', () => {
//     console.log("hello!");   
//   }) 
