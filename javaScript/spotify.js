export default class spotify {

  static async getTrack(id, token) {
    const result = await fetch(`https://api.spotify.com/v1/tracks/${id}?market=BR`, {
      headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
      }
    })
    console.log(result);
    const data = await result.json();
    console.log(data);
    return data;
  }

  static async getNPossibleTracks(name = '', possibleTracks, token) {
    const formatedName = name.replaceAll(' ', '%20');
    const response = await fetch(`https://api.spotify.com/v1/search?q=${formatedName}&type=track&market=BR&market=US&limit=${possibleTracks}`, 
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    console.log(response);
    console.log({
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    });
    const data = await response.json();
    return data;
  }

}