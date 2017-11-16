var uid = 0;
function Dep () {
    this.id = uid++;
    this.subs = [];
};
Dep.prototype.notify = function () {
    this.subs.forEach(function (sub) {
		sub.update()
	})
};
Dep.prototype.addSub = function (sub) {
	this.subs.push(sub)
}

// Dep.prototype.depend = function () { // 因为需要把watcher push进dep的this.subs。所以需要触发Dep.target就是Watcher。
// 	Dep.target.addDep(this)
// }
Dep.target = null;
module.exports = Dep;