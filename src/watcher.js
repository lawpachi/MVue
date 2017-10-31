import  Dep from './dep'
function Watcher (update, token, node, vm) {
    this.$vm = vm;
    this.update = update;
    this.token = token;
    this.node = node;
    this.depIds = {};
    this.deps = []
    this.value = this.get();
    
}
Watcher.prototype.get = function () {
    Dep.target = this;
    var value = this.update(this.token, this.node);
    Dep.target = null;
    return value;
}
Watcher.prototype.addDep = function (dep) {
    var id = dep.id
    if (!this.depIds[id]) {
      dep.addSub(this)
      this.depIds[id] = true
      this.deps.push(dep)
    }
  }
module.exports = Watcher;