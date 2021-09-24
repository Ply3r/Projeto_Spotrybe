import fetch from 'node-fetch'

fetch("https://api.spotify.com/v1/search?q=twenty%20one%20pilots&type=track%2Cartist&market=US&limit=10&offset=5", {
  headers: {
    Accept: "application/json",
    Authorization: "Bearer BQCSOJGqbarZQ3ATlQTkocU6cyJ-FOb2hKbYnxTF4cvZQHWWHKYyWKK-GyAIWJW7t5NF-Kp7orqS54aoppwgmkrImIzoJ_xjKne7efLKPsYyoIkNGfw18DKyI4UNvMVpw1aDb0KYBKNeCo8hOziSbiKh7-EATv0",
    "Content-Type": "application/json"
  }
})
  .then((res) => res.json())
  .then(({ tracks }) => tracks.items)
  .then((res) => console.log(res))