const express = require('express')
const AnalysisController = require('../Controllers/AnalysisController')
const uploader = require('../Services/UploadHelperService')

const router = express()

router.get('/base', AnalysisController.BaseAnalysis)
router.post('/advanced', AnalysisController.AdvancedAnalysis)
router.post('/advanced/file', uploader.array('files'), AnalysisController.AdvancedAnalysisFile)
router.post('/advanced/url', AnalysisController.AdvancedAnalysisUrl)




module.exports = router