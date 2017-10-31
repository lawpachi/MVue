import MVue from '../src/index.js'
const app = new MVue({
    el: '#app',
    data: {
        user: {
            name: 'xiaoming',
            age: 44,
        },
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