const FormData = require('form-data')
const path = require('path')
const axios = require('axios')
const fs = require('fs')
class StorageService
{
    async Upload(files)
    {
        var filenames = []
        for (const filename of files)
        {
            var filePath = path.join(__dirname, "../Storage", filename);

            var readStream = fs.createReadStream(filePath);
    
            const form = new FormData();
            form.append('file', readStream);
    
            const request_config = {
                headers: {
                  ...form.getHeaders()
                }
              };
              
            await axios.post(process.env.STORAGE_AGENT_URL + "/upload", form)
            .then((res) => {filenames.push(res.data)})
            .catch((err) => {console.log(err.response.data)})
        }
        return filenames
    }   

    async UploadByUrl(url, type)
    {

    }
}

module.exports = new StorageService()
