import Dep from './dep'
function Watcher(vm, exp, cd, node, ) {
    this.$vm = vm;
    this.cd = cd;
    this.exp = exp;
    this.node = node;
    this.depIds = {};
    this.deps = []
    this.value = this.get();

}
Watcher.prototype.get = function () {
    Dep.target = this;
    var value = _getVMVal(this.$vm, this.exp); // 第一次解析触发data的get;
    this.cd(value);
    Dep.target = null;
    return value;
}
Watcher.prototype.update = function () {
    this.run();
}
Watcher.prototype.run = function () {
    var value = _getVMVal(this.$vm, this.exp);
    var oldVal = this.value;
    if (value !== oldVal) {
        this.value = value;
        this.cd(value);
    }
}
// Watcher.prototype.addDep = function (dep) {
//     var id = dep.id
//     if (!this.depIds[id]) {
//       dep.addSub(this)
//       // this.depIds[id] = true
//       // this.deps.push(dep)
//     }
//   }
function _getVMVal(vm, exp) {
    var val = vm.$data;
    exp = exp.split('\.');
    exp.forEach(function (k) {
        val = val[k];// 逐层获取data对象，触发get

    });
    return val;

}
module.exports = Watcher;

