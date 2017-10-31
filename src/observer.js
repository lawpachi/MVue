import Dep from './dep.js'
function Observer(data) {
    this.data = data;  // 因为使用了new Observer，所以把数据绑定到实例化对象上
    if (Array.isArray(data)) {
        this.link(data)
    } else if (typeof data === 'object') {
        this.walk(data);
    }
    

};
Observer.prototype.judgeType = function (value) {
    if (Array.isArray(value)) {
        return new Observer(value, ARRAY);
    } else if (typeof value === 'object') {
        return new Observer(value, OBJECT);
    }
}
Observer.prototype.walk = function (data) {
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            let val = data[key];
            if (typeof val === 'object') {
                new Observer(val); // 如果val还是个对象的话，进行递归
            }
            this.convert(key, val)
        }
    }
}
Observer.prototype.link = function (data) {
    data.__proto__ = arrayAugmentations;
}
Observer.prototype.convert = function (key, val) {
    var dep = new Dep()
    Object.defineProperty(this.data, key, {
        enumerable: true, // 可枚举
        configurable: false, // 不能再define
        get: function () {
            console.log('你获取了'+ key + '值为'+ val)
            if (Dep.target) {
                dep.depend()
            }
            return val
        },
        set: function (newVal) {
            console.log('你设置了'+ key + '值为'+ newVal)
            if (newVal === val) return;
            val = newVal
            dep.notify();
        },
    })
}
const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
const arrayAugmentations = [];

aryMethods.forEach((method)=> {

    // 这里是原生Array的原型方法
    let original = Array.prototype[method];

   // 将push, pop等封装好的方法定义在对象arrayAugmentations的属性上
   // 注意：是属性而非原型属性
    arrayAugmentations[method] = function () {
        console.log('我被改变啦!');

        // 调用对应的原生方法并返回结果
        return original.apply(this, arguments);
    };

});
module.exports = Observer;