require("dotenv").config();

const axios = require("axios");
const Client = require("./client.js");

const MISSKEY_HOST = process.env.MISSKEY_HOST;
const MISSKEY_API_KEY = process.env.MISSKEY_API_KEY;
const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_USER_ID = process.env.STEAM_USER_ID;

const client = new Client(MISSKEY_HOST, MISSKEY_API_KEY);

let gameId = undefined;
let gameUrl = null;
let gameName = null;
let isTool = false;
let timer = null;

client.on("ws:connected", async (me) => {
  console.log("Connected!");

  setInterval(runner, 1000);
});

async function runner() {
  try {
    const { data: userData } = await axios.get(
      getSteamUserURL(STEAM_API_KEY, STEAM_USER_ID)
    );

    const { players } = userData?.response;

    const { gameextrainfo, gameid } = players[0];

    if (gameId !== gameid) {
      if (!undefinedOrNull(gameextrainfo)) {
        gameId = gameid;

        const { data: appData } = await axios.get(getSteamAppURL(gameid));

        if (appData[gameid]?.data.genres.find((g) => g.id === "57"))
          return (isTool = true);

        isTool = false;
        timer = new Date().getTime();
        gameName = gameextrainfo;
        gameUrl = getGameUrl(gameid);

        console.log(`Game changed to ${gameName}!`);
        client.send(
          `Steamでゲームをプレイ中: [${gameName}](${gameUrl})`,
          "public",
          false,
          null
        );
      } else {
        if (isTool) return;
        console.log(`Game closed!`);

        const time = new Date().getTime() - timer;
        const timeStr = unixToTime(time);

        client.send(
          `ゲームを終了しました\nプレイしていたゲーム: [${gameName}](${gameUrl})\nプレイ時間: ${timeStr}`,
          "public",
          false,
          null
        );

        gameId = undefined;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function getSteamUserURL(key, id) {
  return `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&format=json&steamids=${id}`;
}

function getSteamAppURL(id) {
  return `https://store.steampowered.com/api/appdetails?appids=${id}`;
}

function getGameUrl(id) {
  return `https://store.steampowered.com/app/${id}`;
}

function undefinedOrNull(v) {
  return v === undefined || v === null;
}

function unixToTime(time, option) {
  let totalSeconds = time / 1000;
  let days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  totalSeconds %= 60;
  let seconds = Math.floor(totalSeconds);

  let data = {
    days: days.toString().padStart(2, "0"),
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };

  if (option?.returnData) return data;
  if (option?.isSymbol)
    return `${data.days}\/${data.hours}\:${data.minutes}\:${data.seconds}`;
  return `${data.days}日${data.hours}時間${data.minutes}分${data.seconds}秒`;
}
