const mongoose = require('mongoose')
mongoose.connect('mongodb://mongo:J4mYCOctrrPTCCXFHKuv@containers-us-west-41.railway.app:6507', { useNewUrlParser: true })
    .catch(e => {
        const msg = 'ERRO! Não foi possível conectar com o MongoDB!'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })