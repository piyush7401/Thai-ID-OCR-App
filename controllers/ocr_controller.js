const OCRRecord = require('../models/ocr_record');
const { detectThaiIDInfo} = require('../utils/ocr');

async function createOCRRecord(req,res){
    try {
        
        const fileBuffer = req.file.buffer;

        const body = await detectThaiIDInfo(fileBuffer);

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
  };

  async function getSpecificOCRRecord(req, res){
    try {
      const id = req.params.id;
      const specificRecord = await OCRRecord.findById(id);

      if (!specificRecord) {
        return res.status(404).json({ error: 'Record not found' });
      }

      res.json(specificRecord);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  async function updateOCRRecord(req, res){
    try {
      const id = req.params.id;
      const updatedRecord = await OCRRecord.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedRecord) {
        return res.status(404).json({ error: 'Record not found' });
      }

      res.json(updatedRecord);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  async function deleteOCRRecord(req, res){
    try {
      const id = req.params.id;
      const deletedRecord = await OCRRecord.findByIdAndDelete(id);

      if (!deletedRecord) {
        return res.status(404).json({ error: 'Record not found' });
      }

      res.json({ message: 'Record deleted successfully' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };



module.exports = {getAllOCRRecords, getSpecificOCRRecord, createOCRRecord, updateOCRRecord, deleteOCRRecord};
