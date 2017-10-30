const app = new MVue({
    el: '#app',
    data: {
        name: 'xiaoming',
        age: 33,
        address: {
            info: {
                city: 'beijing'
            }
        },
        message: ['a', 'b', {
            name: 'xiaohong',
            age: 24
        }]
    }
})
window.app = app;