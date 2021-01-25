"use strict";

const curriculum = require("./curriculum");
const axios = require("axios");

module.exports = {
  getCurriculum: function getCurriculum() {
    return curriculum;
  },

  postMessage: function postMessage(message) {
    const botId = process.env.TELEGRAM_BOTID;
    const chatId = process.env.TELEGRAM_CHATID;
    const telegramMsg = encodeURIComponent(message);

    const url = `https://api.telegram.org/bot${botId}/sendMessage?chat_id=${chatId}&text=${telegramMsg}`;

    axios
      .get(url)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
