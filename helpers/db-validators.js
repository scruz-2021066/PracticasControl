const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Curso = require('../models/curso');

//Este archivo maneja validaciones personalizadas

const esRoleValido = async( rol = '' ) => {

    const existeRol = await Role.findOne( { rol } );

    if ( !existeRol ) {
        throw new Error(`El ${ rol } no está registrado en la DB`);
    }

}


const emailCorrero = async( correo = '' ) => {

    //Verificamos si el correo ya existe en la DB
    const existeCorreo = await Usuario.findOne( { correo } );

    //Si existe (es true) lanzamos excepción
    if ( existeCorreo ) {
        throw new Error(`El correo: ${ correo } ya existe en la DB`);
    }

}


const existeUsuarioById = async(id) => {

    //Verificar si el ID existe
    const existeUser = await Usuario.findById(id);

    if ( !existeUser ) {
        throw new Error(`El id: ${ id } no esta registrado en la DB`);
    }

}


const existeCursoById = async(id) => {

    //Verificar si el Curso existe
    const existeCurso = await Curso.findById(id);

    if ( !existeCurso ) {
        throw new Error(`El Id: ${ id } no existe en la DB`);
    }

}




module.exports = {
    esRoleValido,
    emailCorrero,
    existeUsuarioById,
    existeCursoById
}