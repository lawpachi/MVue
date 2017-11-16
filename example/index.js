import MVue from '../src/index.js'
const app = new MVue({
    el: '#app',
    data: {
        user: {
            age: 44,
        },
        name: 'xiaoming'
    }
})
window.app = app;