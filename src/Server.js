const mysql = require('mysql2/promise');

// Configuración de la conexión a la base de datos
const config = {
  host: '127.0.0.1', // Nombre del servidor MySQL
  user: 'root', // Nombre de usuario de MySQL
  database: 'UsuariosDB', // Nombre de la base de datos
};

let connection; // Declarar la variable de conexión en el ámbito global

// Conectarse a la base de datos
mysql.createPool(config)
  .then(pool => {
    connection = pool; // Asignar la conexión a la variable global
    console.log('Conexión exitosa a la base de datos MySQL');

    // Ejemplo de consulta SELECT
    return connection.query('SELECT * FROM Usuarios');
  })
  .then(([rows, fields]) => {
    // Resultado de la consulta
    console.log(rows);
    // Cierra la conexión después de las operaciones
    return connection.end();
  })
  .then(() => console.log('Conexión cerrada exitosamente'))
  .catch(error => console.log('Error al conectarse a la base de datos MySQL:', error));