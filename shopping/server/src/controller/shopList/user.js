const router = require('express').Router();
const Mod = require('./mod')

// router.get('userList', (req, res) => {

// })

Mod.insertMany({
        'email': 'email',
        'password': 'psdLock',
        'name': 'name',
        'sex': 'sex',
        'time': 'time',
        'head': 'head',
        'bool': true
    }).then(res => console.log(res))
    .catch(err => console.log(err))
module.exports = router