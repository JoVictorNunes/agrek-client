<p align="center">
  <img src=".github/logo.png" alt="Agrek logo" />
</p>

<p align="center">Manage your customers' crop sprayings</p>

<p align="center">Created using React with <a href="https://create-react-app.dev/" target="blank">Create React App</a> and <a href="https://reactrouter.com/" target="blank">React Router v6</a>.</p>

## Features

- Manage customer information.
- Manage your business assets.
- Manage your business finances.
- Manage customers' growing areas.

## How to run

1. First of all, you have to run `agrek-server`. Go to <a href="https://github.com/JoVictorNunes/agrek-server">agrek-server</a> to see how to run it.
2. `git clone https://github.com/JoVictorNunes/agrek-client.git`.
3. `cd agrek-client`.
4. `npm install`.
5. Open the file `.env` and set environment variables:
      - `REACT_APP_SERVER`: agrek-server URL. By default it runs on <a href="http://localhost:3001">localhost:3001</a> (see step 1). You must include the protocol (`http://` or `https://`).
      - `REACT_APP_MAPS_API_KEY`: your Google Maps API key. See how to obtain one on <a href="https://developers.google.com/maps/documentation/javascript/get-api-key">Get API key</a>.
6. Finally, run `npm start`. The app should start running on <a href="http://localhost:3000">localhost:3000</a>.

## Notes

- It is an extremely WIP.
- &#128680; Don't use it in production. It is intended for learning purposes only.