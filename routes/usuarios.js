const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();
const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
} = require("../controllers/usuarios");
const { validarJWT } = require("../middlewares/validar-jwt");

router.get("/", validarJWT, getUsuarios);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El Email es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuario
);

router.put(
  "/:id",
  actualizarUsuario,
  [
    validarJWT,
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El Email es obligatorio").isEmail(),
    check("role", "El Rol es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);

router.delete("/:id",validarJWT,
 borrarUsuario);
module.exports = router;
