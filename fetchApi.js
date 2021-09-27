import fetch from 'node-fetch'

fetch("https://api.spotify.com/v1/search?q=twenty%20one%20pilots&type=track%2Cartist&market=US&limit=10&offset=5", {
  headers: {
    Accept: "application/json",
    Authorization: "Bearer BQCD_L5kH2zRogqyRyQdW704jMCJ_bQR-eXsMQ0m3j1UGzRRJVkC5SfaBB2km1aLsBVnUweqqWC9FhcZHUG7h-HVhEHl8FkuzZZo_qvfryrWTlcdsNulk8GPAotFo-4YRsQHZztl52GKRN2ffMmn8VrK1rl2J3E",
    "Content-Type": "application/json"
  }
})
  .then((res) => res.json())
  .then(({ tracks }) => tracks.items)
  .then((res) => console.log(res))