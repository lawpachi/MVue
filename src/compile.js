import textParser from './tool/text.js';
import Watcher from './watcher.js';

function Compile (el, vm) {
    this.$el = document.querySelector(el);
    this.$vm = vm;
    this._compileNode(this.$el);

}
/**
 * 渲染节点 Element
 */
Compile.prototype._compileElement = function (node) {
    if (node.hasChildNodes()) {
        [].slice.call(node.childNodes).forEach(this._compileNode, this);// 传入this方便_compileNode内使用
    }
}
/**
 * 渲染文本
 */
Compile.prototype._compileTextNode = function (node) {
    let tokens = textParser.parse(node.nodeValue);
    if (!tokens) return;
    new Watcher(this.update, tokens, node, this.$vm);
   
}
Compile.prototype._compileNode = function (node) {
    switch (node.nodeType) {
        // node 
        case 1:
            this._compileElement(node);
            break;
        // text
        case 3:
            this._compileTextNode(node);
            break;
        default:
            break;
    }
}
Compile.prototype.update = function (token, node) {
    let str = ''
    token.forEach((token) => {
        if (token.tag) {
            // 指令节点
            let value = token.value;
            str  += _getVMVal(this.$vm, token.value)

        } else {
            str  += token.value;
        }
    });
    node.textContent = str;
}
module.exports = Compile;

function _getVMVal (vm, exp) {
    var val = vm.$data;
    exp = exp.split('.');
    exp.forEach(function(k) {
        val = val[k]; // 逐层获取data对象，触发get
    });
    return val;
}