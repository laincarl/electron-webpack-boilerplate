
const isDev = require("electron-is-dev");
const { app } = require("electron").remote;

export default function loadURL(Win, url) {
  Win.loadURL(
    isDev
      ? "http://localhost:3000#" + url
      : app.getAppPath() + "/build/index.html#" + url
  );
}
