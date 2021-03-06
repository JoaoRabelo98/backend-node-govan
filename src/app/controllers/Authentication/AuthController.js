const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const authConfig = require('../../../config/auth');

module.exports = {
  async store(req, res) {

    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ phoneNumber }).select('+password');

    

    if (!user)
      return res.status(400).send({ error: 'Usuário não encontrado' });

    if (!await bcrypt.compare(password, user.password))
      return res.status(400).send({ error: "Usuário ou senha incorreto" });

    user.password = undefined;

    const token = jwt.sign({ id: user._id }, authConfig.secret, {
      expiresIn: 1,
    });
    return res.json({ user, token });
  }
}