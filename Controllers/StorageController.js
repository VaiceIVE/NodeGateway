const axios = require('axios')
const StorageService = require('../Services/StorageService')
const fs = require('fs')
class StorageController
{
    async GetFile(req, res, next)
    {
        const {filename} = req.params

        const stream = await StorageService.GetFile(filename);

        stream.pipe(res).on('finish', () => {fs.unlink(`Temp/${filename}`, (err) => {err ? console.log(err) : null})});
    }

    async GetList(req, res, next)
    {
        const response = await StorageService.GetAll()
        
        res.json(response)
    }
}

module.exports = new StorageController()