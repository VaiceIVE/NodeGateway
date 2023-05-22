const AnalysisService = require("../Services/AnalysisService")
const StorageService = require("../Services/StorageService")
const StorageController = require("./StorageController")
const fs = require('fs')

class AnalysisController
{
    async BaseAnalysis(req, res, next)
    {
        try {
            const response = await AnalysisService.BaseAnalysis()

            res.send(response)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async AdvancedAnalysis(req, res, next)
    {


    }

    async AdvancedAnalysisFile(req, res, next)
    {
        try {
            const files = req.files

            var filenames = []

            console.log(files[0])

            files[0].type = "Type"

            console.log(files[0])


            for (const file of files)
            {
                filenames.push(file.originalname)
            }

            const resfilenames = await StorageService.Upload(filenames)

            for (const file of files)
            {
                fs.unlink('./Storage/' + file.originalname, (err) => {if(err){console.log(err)}});
            }

            res.send(resfilenames)
        } catch (e) {
            console.log(e)
        }
        
    }

    async AdvancedAnalysisUrl(req, res, next)
    {
        // Предполагается, что одна ссылка ведет на сервис с кучей таблиц, где есть вся информация
        const {url} = req.body
        await StorageService.UploadByUrl(url)
    }
}

module.exports = new AnalysisController()
