import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { remote } from 'electron';
import { loadURL } from '../utils';
import './Main.css';

const { BrowserWindow } = remote;
class Main extends Component {
  toSettings = () => {
    let win = new BrowserWindow();
    win.on('close', () => {
      win = null;
    });
    loadURL(win, 'Settings');
    win.show();
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.toSettings} type="button" className="button">Settings</button>
        <div>
          <Link to="/Settings" target="_blank">
          Settings
          </Link>
        </div>
      </div>
    );
  }
}
export default Main;
