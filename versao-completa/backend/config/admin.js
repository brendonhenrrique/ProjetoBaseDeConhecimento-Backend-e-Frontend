module.exports = (req, res, next) => {
    if (req.user.isAdmin) { 
        next(); 
    } else {
        res.status(403).send('Acesso negado.'); 
    }
};