require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET = process.env.JWT_SECRET;

const usuario = {
  email: 'webezequielborher@gmail.com',
  senha: '123456'
};

app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (email === usuario.email && senha === usuario.senha) {
    const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ erro: 'Credenciais inválidas' });
});

app.get('/status', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.json({ authenticated: false });

  jwt.verify(token, SECRET, (err) => {
    if (err) return res.json({ authenticated: false });
    return res.json({ authenticated: true });
  });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
