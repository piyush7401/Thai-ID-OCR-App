const OCRRecord = require('../models/ocr_record');

async function createOCRRecord(req,res){
    try {
        const body = req.body;
      
        // Check if the required fields are present in the request body
        if (!body || !body.identification_number || !body.name || !body.last_name || !body.date_of_birth || !body.date_of_issue || !body.date_of_expiry) {
          return res.status(400).json({ error: 'Incomplete or missing data in the request body.' });
        }
      
        // Implement OCR processing logic here...
      
        // Use data from req.body instead of hardcoded values
        const ocrData = {
          identification_number: body.identification_number,
          name: body.name,
          last_name: body.last_name,
          date_of_birth: body.date_of_birth,
          date_of_issue: body.date_of_issue,
          date_of_expiry: body.date_of_expiry,
          status: 'success', // or 'failure'
          error_message: '...', // Provide an error message if status is 'failure'
        };
      
        // Create a new OCR record and save it to the database
        const newOCRRecord = await OCRRecord.create(ocrData);
      
        res.json({
          identification_number: newOCRRecord.identification_number,
          name: newOCRRecord.name,
          last_name: newOCRRecord.last_name,
          date_of_birth: newOCRRecord.date_of_birth,
          date_of_issue: newOCRRecord.date_of_issue,
          date_of_expiry: newOCRRecord.date_of_expiry,
          status: newOCRRecord.status,
          error_message: newOCRRecord.error_message,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

async function getAllOCRRecords(req, res){
    try {
      const allRecords = await OCRRecord.find({});
    //   we are showing all the entries . 
      res.json(allRecords);
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },


module.exports = {createOCRRecord , getAllOCRRecords ,};
