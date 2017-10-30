function Observer(data) {
    this.data = data;  // 因为使用了new Observer，所以把数据绑定到实例化对象上
    this.walk(data);

};
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
Observer.prototype.convert = function (key, val) {
    Object.defineProperty(this.data, key, {
        enumerable: true, // 可枚举
        configurable: false, // 不能再define
        get: function () {
            console.log('你获取了'+ key + '值为'+ val)
            return val
        },
        set: function (newVal) {
            console.log('你设置了'+ key + '值为'+ newVal)
            if (newVal === val) return;
            val = newVal
        },
    })
}