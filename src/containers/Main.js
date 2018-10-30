import React, { Component } from 'react';
import PropTypes from 'prop-types';
import usb from 'usb';
import util from 'util';
import { Link } from 'react-router-dom';
import { remote } from 'electron';
import child_process from 'child_process';
import loadURL from '../load';

const exec = util.promisify(child_process.exec);

const { BrowserWindow } = remote;

function show(content) {
  document.getElementById('show').innerText += content;
}
usb.on('attach', (device) => {
  console.log(device);
  show(device);
});

usb.on('detach', (device) => {
  console.log(device);
});
class Main extends Component {
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
        <Link to="/p" target="_blank">
          vvvd
        </Link>
        <p id="show" />
      </div>
    );
  }
}

Main.propTypes = {

};

export default Main;
