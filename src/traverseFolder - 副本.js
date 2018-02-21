const fs = require('fs');
const path = require('path');
//定义文件夹节点类型，包含本身路径名和子节点
var folderNode = function(name, children) {
  this.name = name;
  this.children = children;
};
//遍历函数，传入一个节点，之后按照节点的name进行遍历，找出所有子节点
function traversefolder(node) {
  node = node instanceof folderNode ? node : new folderNode(node, null);

  if (fs.statSync(node.name).isDirectory()) {
    let arr = fs.readdirSync(node.name);
    arr = arr.map(one => {
      let ar = new folderNode(path.join(node.name, one), null);
      return traversefolder(ar);
    });
    node.children = arr;
  }
  return node;
}
// function traversefolderfolder(folderPath) {
//   if (fs.statSync(folderPath).isDirectory()) {
//     let arr = fs.readdirSync(folderPath);
//     arr = arr.map(one => {
//       let ar = new folderNode(path.join(folderPath, one), []);
//       return ar;
//     });
//     let folderTree = new folderNode(folderPath, arr);
//     // console.log(arr);
//     arr.forEach(one => {
//       traversefolder(folderTree);
//     });
//     return folderTree;
//   }
// }
module.exports = traversefolder;
