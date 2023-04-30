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
        // console.log("all data", data);
        // console.log("data.id", data.id);
        console.log("data.joke", data.joke);
        // console.log("datastatus", data.status);
        
        return data.joke
      })
      
  }

export async function displayJokes(): Promise<void> {
  const jokeText = document.getElementById('jokeText') as HTMLElement;
  const joke = await getJokes()

  jokeText.innerText = `"${joke}"`;
}