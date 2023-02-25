const { request, response } = require('express');
const Curso = require('../models/curso');


const getCursos = async (req = request, res = response) => {

     //condiciones del get
     const query = { estado: true };

     const listaCursos = await Promise.all([
         Curso.countDocuments(query),
         Curso.find(query).populate('usuario', 'nombre')
     ]);
 
     res.json({
         msg: 'get Api - Controlador Curso',
         listaCursos
     });

}


const getCursoPorID = async (req = request, res = response) => {

   const { id } = req.params;
   const cursoById = await Curso.findById( id ).populate('usuario', 'nombre');

   res.status(201).json( cursoById );

}


const postCurso = async (req = request, res = response) => {
    //toUpperCase para todo a Mayusculas
    const nombre = req.body.nombre.toUpperCase();

    const cursoDB = await Curso.findOne({ nombre });

    //validacion para verificar si ya existe dicha categoria para que no lo agregue
    if (cursoDB) {
        return res.status(400).json({
            msg: `El curso ${cursoDB.nombre}, ya existe en la DB`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const curso = new Curso(data);
    //Guardar en DB
    await curso.save();

    res.status(201).json(curso);

}


const putCurso = async (req = request, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id;

    //Editar o actualiar la cateogira
    const cursoModificado = await Curso.findByIdAndUpdate(id, resto, { new: true });

    res.status(201).json(cursoModificado);

}

const deleteCurso = async (req = request, res = response) => {

    const { id } = req.params;

    //Editar o actualiar la cateogira: Estado FALSE
    const cursoEliminado = await Curso.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.status(201).json(cursoEliminado);

}


module.exports = {
    getCursoPorID,
    getCursos,
    putCurso,
    postCurso,
    deleteCurso
   
}
