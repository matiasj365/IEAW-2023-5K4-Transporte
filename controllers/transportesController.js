const consultarApiProveedores = process.env.CONSULTAR_API_PROVEEDORES === 'true';
const transportesModel = require("../models/transportesModel")

const countersmodel = require("../models/countersModel")
const proveedoresService = require('../services/proveedoresServices');

module.exports =
{

  getAll: async (req, res, next) => {
    try {
      const documents = await transportesModel.find().select("id tipo descripcion capacidad precio_base proveedor_id").lean();

      // Procesar cada documento y agregar datos del proveedor
      const transportesConProveedores = await Promise.all(
        documents.map(async (documento) => {
          // Buscar datos del proveedor utilizando el servicio proveedoresService
          const proveedor = await proveedoresService.getProveedorData(documento.proveedor_id);
          if (proveedor == null)
            return documento;
          // Combinar datos del proveedor con los datos del transporte
          return {
            ...documento, // Si usas Mongoose, convierte el documento a un objeto JS
            proveedor: proveedor,
          };
        })
      );

      res.set('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(transportesConProveedores, null, 2))

    }
    catch (e) {
      console.log(e)
      e.status = 400;
      next(e);
    }
  },



  getById: async (req, res, next) => {

    try {

      const idTransporte = parseInt(req.params.transporteId);
      const document = await transportesModel.findOne({ id: idTransporte }).select("id tipo descripcion capacidad precio_base proveedor_id").lean();
      console.log(document);
      //Buscamos el proveedor y agregamos sus datos en la respuesta
      const proveedor = await proveedoresService.getProveedorData(document.proveedor_id)
      res.set('Content-Type', 'application/json')
      if (proveedor == null)
        res.status(200).send(JSON.stringify(document, null, 2));
      // Combinamos los datos del proveedor con los datos del transporte
      else {
        const transporteConProveedor = {
          ...document, // Convierte el documento de Mongoose a un objeto JS
          proveedor: proveedor,
        };
        res.status(200).json(transporteConProveedor);
      }


    }

    catch (e) {
      console.log(e)
      e.status = 400;
      next(e)
    }

  },


  create: async (req, res, next) => {
    try {
      const counter = await countersmodel.findOneAndUpdate(
        { id: "autoval" },
        { $inc: { seqTransporte: 1 } },
        { new: true }
      );

      let seqId;
      if (!counter) {

        const newval = new countersmodel({ id: "autoval", seqTransporte: 1 });
        await newval.save();
        seqId = 1;
      } else {
        seqId = counter.seqTransporte;
      }


      console.log(req.body)
      const nuevoTransporte = new transportesModel(
        {
          id: seqId,
          tipo: req.body.tipo,
          descripcion: req.body.descripcion,
          capacidad: req.body.capacidad,
          precio_base: req.body.precio_base,
          proveedor_id: req.body.proveedor_id

        })
      //Verificamos si el proveedor existe
      const proveedor = await proveedoresService.getProveedorData(req.body.proveedor_id)

      if (!proveedor && consultarApiProveedores) {
        return res.status(404).json({ error: 'Proveedor no encontrado' });
      }

      const transporte = await nuevoTransporte.save()
      res.status(201).json(transporte)
    }
    catch (error) {
      console.error(error);
      next(error);
    }

  },

  update: async (req, res, next) => {
    try {
      const idTransporte = parseInt(req.params.transporteId);

      //Verificamos si el proveedor existe
      const proveedor = await proveedoresService.getProveedorData(req.body.proveedor_id)
      if (!proveedor && consultarApiProveedores) {
        return res.status(404).json({ error: 'Proveedor no encontrado' });
      }

      const update = await transportesModel.updateOne({ id: idTransporte }, req.body)
      res.status(200).json(update);

    }
    catch (e) {
      console.log(e)
      e.status = 400;
      next(e)
    }


  },

  delete: async (req, res, next) => {
    try {
      const idTransporte = parseInt(req.params.transporteId);

      const deleteResponse = await transportesModel.deleteOne({ id: idTransporte })
      res.status(200).json(deleteResponse);
    }

    catch (e) {
      console.log(e)
      e.status = 400;
      next(e)
    }
  }


}
