const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://base-de-conhecimento:qOr6UkC5uTgTsScx@basedeconhecimento.fljy2un.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
    .catch(e => {
        const msg = 'ERRO! Não foi possível conectar com o MongoDB!'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })