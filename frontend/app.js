const form = document.getElementById('login-form');
const resultado = document.getElementById('resultado');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      resultado.innerText = 'Login efetuado!';
    } else {
      resultado.innerText = 'Credenciais inválidas!';
    }
  } catch (error) {
    resultado.innerText = 'Erro na requisição.';
  }
});

document.getElementById('status-btn').addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch('/status', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    resultado.innerText = data.authenticated ? 'Logado' : 'Não logado';
  } catch (error) {
    resultado.innerText = 'Erro ao verificar status.';
  }
});
