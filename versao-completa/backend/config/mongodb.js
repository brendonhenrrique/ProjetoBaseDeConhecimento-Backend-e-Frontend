const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/knowledge_stats', { useNewUrlParser: true })
    .catch(e => {
        const msg = 'Não foi possível conectar com o MongoBD'
        console.log('\x1b[41m\x1b[37m ' + msg + ' \x1b[0m')
    })