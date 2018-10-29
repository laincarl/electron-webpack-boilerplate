import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import usb from 'usb';
import util from 'util';
import { remote } from 'electron';
import child_process from 'child_process';
import loadURL from './load';

const exec = util.promisify(child_process.exec);

const { BrowserWindow } = remote;

function show(content) {
  document.getElementById('show').innerText += content;
}
async function execCommand(command) {
  const obj = await exec(command);
  show(obj);
  console.log(obj, typeof (obj));
  // console.log('stdout:', stdout);
  // console.log('stderr:', stderr);
}
usb.on('attach', (device) => {
  console.log(device);
  show(device);
  const screenShoot = 'adb devices';
  execCommand(screenShoot);
});

usb.on('detach', (device) => {
  console.log(device);
});


// const { COPYFILE_EXCL } = fs.constants;
class App extends Component {
  newwin = () => {
    // const modalPath = path.join(
    //   "file://",
    //   __dirname,
    //   "index.html"
    // );
    // let win = new BrowserWindow({ frame: false });
    let win = new BrowserWindow();

    win.on('close', () => {
      win = null;
    });

    loadURL(win, 'p');
    win.show();
    // window.open("http://www.baidu.com")
  }

  exec = () => {
    const screenShoot = 'adb devices';
    execCommand(screenShoot);
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.newwin}>新窗口</button>
        <button onClick={this.exec}>查看安卓</button>
        <Link to="/p" target="_blank">
          c
        </Link>
        <p id="show" />
      </div>
    );
  }
}

export default hot(module)(App);
