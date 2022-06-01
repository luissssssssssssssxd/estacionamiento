const bcrypt = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/usuario");
const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //Verificar Email
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario o clave incorrecta",
      });
    }

    //Verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña no es valida",
      });
    }

    //Generar el token JWT
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      msg: "OK",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contacte al administrador",
    });
  }
};

module.exports = {
  login,
};
