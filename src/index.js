function MVue (options) {
    this.init(options); // 初始化
}
MVue.prototype.init = function (options) {
    this.$options = options;
    this.$data = options.data || {};
    // 初始化data,增加get和set
    new Observer(options.data)
}