const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    //  Revisar si hay errores
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array() });
    }

    //  Extraer email y pw del req
    const {email, password} = req.body;

    try {
        //  Revisar que se un usuario registrado
        let usuario = await Usuario.findOne( { email });
        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe' })
        }

        //  Revisar su pw
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if (!passCorrecto) {
            return res.status(400).json( { msg: 'Password Incorrecto' } );
        }

        //  Si todo es correcto
        //  Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //  Firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1Hora
        }, (error, token) => {
            if (error) throw error;
            //  Mensaje de confirmación
            res.json({ token });
        });


    } catch (error) {
        console.log(error)
    }

}