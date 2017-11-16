import textParser from './tool/text.js';
import Watcher from './watcher.js';

function Compile(el, vm) {
    this.$el = document.querySelector(el);
    this.$vm = vm;
    this._compileNode(this.$el);

}
/**
 * 渲染节点 Element
 */
Compile.prototype._compileElement = function (node) {
    var nodeAttrs = node.attributes;
    var self = this;
    Array.prototype.forEach.call(nodeAttrs, function (attr) {
        var attrName = attr.name;
        if (attrName.indexOf('v-') == 0) { // 指令
            var exp = attr.value;
            var dir = attrName.substring(2);
            if (dir.indexOf('on:') === 0) {  // 事件指令

            } else {                         // v-model
                self._compileModel(self.$vm, node, exp);
            }
        }
    })
    if (node.hasChildNodes()) {
        [].slice.call(node.childNodes).forEach(this._compileNode, this);// 传入this方便_compileNode内使用
    }
}
/**
 * 渲染v-model
 */
Compile.prototype._compileModel = function (vm, node, exp) {
    var self = this;
    new Watcher(this.$vm, exp, function (value) {
        self._updateModel(node, value);
    });
    node.addEventListener('input', function (e) {
        var newValue = e.target.value;
        _setVMVal(self.$vm, exp, newValue)
    })
}
Compile.prototype._updateModel = function (node, value) {
    node.value = typeof value == 'undefined' ? '' : value;
}
/**
 * 渲染文本
 */
Compile.prototype._compileTextNode = function (node) {
    var self = this;
    let exps = textParser.parse(node.nodeValue); // 解析{{}}指令
    exps.forEach((exp) => {
        if (!String.trim(exp.value)) return;
        new Watcher(this.$vm, exp.value, function (value) {
            self._updateText(node, value);
        });
    });
}
Compile.prototype._updateText = function (node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value;
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
module.exports = Compile;

function _setVMVal(vm, exp, value) {
    var val = vm.$data;
    exp = exp.split('\.');
    exp.forEach(function (k, i) {
        // 最后一个key，再更新val的值
        if (i < exp.length - 1) {
            val = val[k];
        } else {
            val[k] = value;
        }
    });
}