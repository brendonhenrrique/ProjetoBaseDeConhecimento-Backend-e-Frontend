const { authSecret } = require('../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

// Mensagens de erro
const errorMessages = {
  missingCredentials: 'Informe usuário e senha!',
  userNotFound: 'Usuário não encontrado!',
  invalidCredentials: 'Email/Senha inválidos!',
  unauthorized: 'Você não tem permissão para acessar esta página!'
};

// Período de expiração do token (3 dias em segundos)
const tokenExpirationPeriod = 60 * 60 * 24 * 3;

module.exports = app => {
  const signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send(errorMessages.missingCredentials);
    }

    try {
      const user = await app.db('users')
        .where({ email })
        .first();

      if (!user) {
        return res.status(400).send(errorMessages.userNotFound);
      }

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(401).send(errorMessages.invalidCredentials);
      }

      const now = Math.floor(Date.now() / 1000);

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        iat: now,
        exp: now + tokenExpirationPeriod
      };

      const token = jwt.encode(payload, authSecret);
      res.json({ ...payload, token });
    } catch (error) {
      console.error('Erro no signin:', error);
      res.status(500).send('Erro no servidor');
    }
  };

  // ...
  
  const validateAdmin = async (req, res) => {
    const userData = req.body || null;

    try {
      const token = jwt.decode(userData.token, authSecret);
      const user = await app.db('users')
        .where({ email: token.email})
        .whereNull('deletedAt')
        .first();

      if (user && user.admin && token.admin) {
        return res.send(true);
      }
      console.log('entrou aqui 1');
    } catch (error) {
      console.error('Erro na validação do admin:', error);
      res.status(401).send(errorMessages.unauthorized);
    }
    
    return res.send(false);
  }

  return { signin, validateToken, validateAdmin };
};