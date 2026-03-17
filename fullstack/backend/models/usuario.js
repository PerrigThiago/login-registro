import pool from '../config/bd.js';

// No hay que poner el id_usuario porque es autoincremental, postgreSQL se encarga de asignarlo automáticamente.
export const crearUsuario = async (gmail, nombre, contrasenia) => {
    const resultado = await pool.query(
        `INSERT INTO usuario (gmail, nombre, contrasenia) 
        VALUES ($1, $2, $3) 
        RETURNING *`, 
        [gmail, nombre, contrasenia]
    );
    return resultado.rows[0];
};

// No pasar contraseña porque no es necesario para mostrar la información del usuario. Mejor por seguridad.
export const obtenerUsuarioPorId = async (id_usuario) => {
    const resultado = await pool.query(
        `SELECT id_usuario, gmail, nombre FROM usuario WHERE id_usuario = $1`,
        [id_usuario]
    );
    return resultado.rows[0];
};

export const obtenerUsuarioPorGmail = async (gmail) => {
    const resultado = await pool.query(
        `SELECT * FROM usuario WHERE gmail = $1`,
        [gmail]
    );
    return resultado.rows[0];
};