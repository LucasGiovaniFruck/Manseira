var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { titulo: 'Login', mensagem: 'Por favor identifique-se' });
});

router.post('/login', async function(req, res, next) 
{
  const email = req.body.email;
  const senha = req.body.senha;

  // Consultar o BD e confirmar se o usuário existe.
  //const usuario = await global.bd.buscarUsuario(email,senha);
  //const usuario = await global.bd.buscarUsuario([email,senha]);
  const usuario = await global.bd.buscarUsuario({email,senha});

  if (usuario.usuemail && usuario.usuemail != "")
  {
    global.usuario = usuario.usuemail;
    res.redirect('/perfis');
  }
  else
  {
    res.redirect('/');
  }

});

router.get('/perfis', function(req, res, next )
{
  if (!global.usuario || global.usuario == "")
  {
    res.redirect('/');
  }

  res.render('prefil');
});

module.exports = router;
