const mysql = require('mysql2/promise');

async function conectarBD()
{

    if (global.connection && global.connection.state !== 'disconnected'){
        return global.connection;
    }

    const conexao = await mysql.createConnection
    (
        {
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: '',
            database: 'teste'
        }
    );

    /* 
    Outra forma de fazer a conexão:
    const conexaoString = 'mysql://root:@localhost:3306/teste';
    const conexao = await mysql.createConnection(conexaoString);
    */

    global.createConnection = conexao;

    return global.connection;
    
}

async function buscarUsuario(usuario)
{
    const conex = await conectarBD();
    const sql = "select * from usuarios where usuemail=? and usussenha=?;";
    const [usuarioEncontrado] = await conex.query(sql,[usuario.email, usuario.senha]);   

    /* 
    if (usuarioEncontrado && usuarioEncontrado.lenght>0)
    {
        return usuarioEncontrado[0];
    }
    else
    {
        return {};
    }
    Essa parte de cima é igual o de baixo*/

    return usuarioEncontrado && usuarioEncontrado.lenght>0 ? usuarioEncontrado[0] : {}

}

conectarBD();

module.exports = { buscarUsuario }