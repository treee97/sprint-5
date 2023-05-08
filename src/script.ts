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

interface weatherData {
  icon: string;
  temperature: number;
}

// WEATHER API
export async function getWeather(): Promise<void>{
  const URL = 'https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=2.1686&lat=41.3874&units=metric';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b428837115msh4714b8f96679ccep12df03jsnadb3a6497ec6',
      'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(URL, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}



type jokeType = 'dadJoke' | 'norrisJoke';
//union. jokeType es ⁡⁣⁣⁢𝗜𝗠𝗣𝗟𝗜𝗖𝗜𝗧𝗢⁡ que sea de type string

export async function getJokes(type: jokeType): Promise<string> {

    const url = type === 'dadJoke' ? 'https://icanhazdadjoke.com/' : 'https://api.chucknorris.io/jokes/random';
    const res = await fetch(url, {
          headers: {
            'Accept': 'application/json',
          }
      })

    const data = await res.json();

    let joke: string 
    // declaramos joke y le decimos que sea de tipo string de manera ⁡⁣⁣⁢𝗘𝗫𝗣𝗟𝗜𝗖𝗜𝗧𝗔

    if (type === 'dadJoke') {
      const dadJokeData = data as jokeData;
      joke = dadJokeData.joke;
    } else {
      const norrisJokeData = data as norrisData;
      joke = norrisJokeData.value;
    }
    // console.log(joke);
    
    return joke;
}

export async function displayWeather(): Promise<void>{
  const weatherText = document.getElementById('weatherText') as HTMLElement;
  const weatherData = await getWeather()
    weatherText.innerText = `edea`;
  // data[0].weather.icon => icono del tiempo
  // data[0].app_temp=> 19.4

  // data[0].weather.description => "clear sky"
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
            }
            scoreSelected = true;
            console.log(reportJokes);
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