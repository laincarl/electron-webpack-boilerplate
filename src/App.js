import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import loadURL from './load';
import traversefolder from './traverseFolder';
import ffs from 'final-fs';
const { BrowserWindow, dialog } = require('electron').remote;

const selectDirBtn = document.getElementById('select-directory');

var fs = require('fs');
const { URL } = require('url');
const path = require('path');
const rules = [
  {
    from: "'../../../../../containers/common/axios'",
    to: 'Axios',
  },
  {
    from: "'../../../../../containers/common/store'",
    to: "'Store'",
  },
];

// const { COPYFILE_EXCL } = fs.constants;
class App extends Component {
  constructor() {
    super();
    this.state = {
      per: 0,
    };
  }
  readfile() {
    // console.log(fs);
    var p = '';
    dialog.showOpenDialog(
      {
        properties: ['openDirectory', 'multiSelections'],
      },
      function(res) {
        p = res[0];
        console.log(p);
        traversefolder(p)
          .then(files => {
            files = files.filter(one => /(.*?)\.js$/i.test(one));
            console.log(files);
            files.forEach(one => {
              fs.readFile(one, 'utf8', (err, data) => {
                if (err) {
                  console.log(err);
                } else {
                  data = data.replace(/'(.*?)axios'/g, "'Axios'");
                  data = data.replace(/'(.*?)store'/g, "'Store'");
                  
                  // console.log(data);
                  fs.writeFile(one, data, err => {
                    if (err) {
                      console.log(err);
                    }
                  });
                }
              });
            });
          })
          .catch(e => console.error(e));
        // console.log(traversefolder(p));
        var dirPath = path.resolve(__dirname, 'var', 'tmp', 'tmp2');
        // ffs.readdirRecursive(true, p)
        // .then(function (files) {
        //     // in the `files` variable you've got all the files
        // })
        // .otherwise(function (err) {
        //     // something went wrong
        // });
      },
    );

    // work.forEach(one => {
    //   let path = dirpath + "\\" + one + "\\modinfo.lua";
    //   let reg = /name\s*=\s*"([^"]*)"/;
    //   fs.readFile(path, "utf8", (err, data) => {
    //     if (err) throw err;
    //     console.log(one, data.match(reg)[1]);
    //   });
    // });
  }
  _update(porcentage) {
    this.setState({ per: porcentage });
    console.log('copying');
  }
  copyfile() {
    // fs.copyFile("D:\\drcom.py", "E:\\drcom.py", COPYFILE_EXCL, (err) => {
    //   if (err) throw err;
    //   console.log("copied");
    // });
    console.time('copying');
    var stat = fs.statSync(new URL('file:///D:/a.exe'));

    const filesize = stat.size;
    var bytesCopied = 0;
    var porcentage = 0;
    const readStream = fs.createReadStream(new URL('file:///D:/a.exe'));

    readStream.on('data', function(buffer) {
      bytesCopied += buffer.length;
      porcentage = (bytesCopied / filesize * 100).toFixed(2);
      //console.log(porcentage + "%"); // run once with this and later with this line commented
    });
    readStream.on(
      'end',
      function() {
        console.timeEnd('copying');
        console.log('copyend');
        clearInterval(this._timer);
        this._update(porcentage);
      }.bind(this),
    );

    this._timer = setInterval(
      function() {
        this._update(porcentage);
      }.bind(this),
      300,
    );
    readStream.pipe(fs.createWriteStream(new URL('file:///E:/b.exe')));

    // fs
    //   .createReadStream(new URL('file:///D:/a.exe'))
    //   .pipe(str)
    //   .pipe(fs.createWriteStream(new URL('file:///E:/b.exe')));
  }
  newwin() {
    // const modalPath = path.join(
    //   "file://",
    //   __dirname,
    //   "index.html"
    // );
    // let win = new BrowserWindow({ frame: false });
    let win = new BrowserWindow();

    win.on('close', function() {
      win = null;
    });

    loadURL(win, 'p');
    win.show();
    //window.open("http://www.baidu.com")
  }
  render() {
    return (
      <div className="App">
        <button>获取文件列表</button>
        <button>shell</button>
        <button>获取json</button>
        <button>info</button>
        <button onClick={this.readfile.bind(this)}>readfile</button>
        <button onClick={this.copyfile.bind(this)}>copyfile</button>
        <button onClick={this.newwin.bind(this)}>新窗口</button>
        <Link to="/p" target="_blank">
          sss
        </Link>
        <p id="show" />
        <span>{this.state.per}%</span>
      </div>
    );
  }
}

export default App;
