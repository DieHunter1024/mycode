const {
    MessageCenter
} = require('./lib/MessageCenter.js')

MessageCenter.on('async', function () {
    console.log(...arguments)
})
MessageCenter.emit('async', [111])
MessageCenter.un('async')
setInterval(function () {
    console.log('aaaaa')
    MessageCenter.emit('async', [1, 2, 3])
}, 1000)