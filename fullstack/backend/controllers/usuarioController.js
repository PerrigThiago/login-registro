import * as Usuario from '../models/usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registro = async (req, res) => {
    try {
        const { gmail, nombre, contrasenia } = req.body;

        if (!gmail || !nombre || !contrasenia) {
            return res.status(400).json({ error : 'Todos los campos son obligatorios' });
        }

        const usuarioExiste = await Usuario.obtenerUsuarioPorGmail(gmail);
        if (usuarioExiste) {
            return res.status(400).json({ error: 'El gmail ya esta registrado' });
        }

        // Hashear la contraseña
        const contraseniaHasheada = await bcrypt.hash(contrasenia, 10);
        
        // Crear el usuario en BD con el hasheo
        const nuevoUsuario = await Usuario.crearUsuario(gmail, nombre, contraseniaHasheada);


        res.status(201).json({ mensaje: 'Usuario registrado correctamente' });

    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};

export const login = async (req, res) => {
    try {
        const { gmail, contrasenia } = req.body;

        const usuario = await Usuario.obtenerUsuarioPorGmail(gmail);
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Verificar contraseña
        const contraseniaValida = await bcrypt.compare(contrasenia, usuario.contrasenia);

        if (!contraseniaValida) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        
        // Si válida, generar JWT
        const token = jwt.sign({ id: usuario.id_usuario, gmail: usuario.gmail }, process.env.JWT_SECRET);

        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

export const logout = async (req, res) => {
    res.json({ mensaje: 'Sesión cerada' });
};