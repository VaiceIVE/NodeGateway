const axios = require('axios')


class AnalysisService
{
    async BaseAnalysis()
    {
        await axios.get(process.env.ANALYSIS_AGENT_URL + "/base")
        .then((response) => {return response.data})
        .catch((err) => {return err.response.data})
    }
}

module.exports = new AnalysisService()
