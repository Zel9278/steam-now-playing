const ws = require("ws");
const axios = require("axios");
const EventEmitter = require("events");

class Misskey extends EventEmitter {
  constructor(host, token) {
    super(host, token);

    this.host = host;
    this.token = token;
    this.uri = `wss://${host}/streaming?i=${token}`;
    this.connected = false;

    this.connect();
  }

  connect() {
    ((uri) => {
      try {
        if (this.connected) return;
        if (this.ws) {
          this.ws.removeAllListeners();
          this.ws.close();
        }
        this.ws = new ws(uri);

        this.ws.on("error", (error) => this.emit("ws:error", error));
        this.ws.on("open", async () => {
          this.ws.send(
            JSON.stringify({
              type: "connect",
              body: {
                channel: "main",
                id: "main",
              },
            })
          );

          this.ws.send(
            JSON.stringify({
              type: "connect",
              body: {
                channel: "hybridTimeline",
                id: "social",
              },
            })
          );

          this.me = await this.api("i");
          this.connected = true;

          this.emit("ws:connected", this.me);
        });

        this.ws.on("close", (e) => {
          this.me = null;
          this.connected = false;
          this.emit("ws:disconnected", e);
        });

        this.ws.on("message", (msg) => {
          if (!this.connected) return;
          if (!msg) return;
          const { body } = JSON.parse(msg);

          this.emit(body.type, body);
        });
      } catch (error) {
        console.error(error.toString());
        console.log("[misskey.js] reconnecting in 5sec...");
        setTimeout(() => this.reconnect(uri), 5000);
      }
    })(this.uri);
  }

  disconnect() {
    if (!this.connected) return;
    this.ws.removeAllListeners();
    this.ws.close();
  }

  async api(endPoint, data) {
    const postUrl = `https://${this.host}/api/${endPoint}`;
    const postData = Object.assign({ i: this.token }, data);

    try {
      const { data } = await axios.post(postUrl, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      this.emit("api:error", error);
    }
  }

  send(text, visibility, localOnly, cw) {
    this.api("notes/create", {
      text,
      visibility,
      localOnly,
      cw,
    });
  }

  async getEmojis() {
    try {
      const { emojis } = await this.api("meta");
      return emojis;
    } catch (error) {
      return [];
    }
  }

  sendFollow(userId) {
    this.api("following/create", {
      userId,
    });
  }

  sendReaction(noteId, reaction) {
    this.api("notes/reactions/create", {
      noteId,
      reaction,
    });
  }
}

module.exports = Misskey;
