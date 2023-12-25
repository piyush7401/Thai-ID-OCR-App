// Creation of model ocr_record
const mongoose = require('mongoose');

const ocrRecordSchema = new mongoose.Schema({
    identification_number: { type: String, required: true },
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    date_of_birth: { type: String, required: true },
    date_of_issue: { type: String, required: true },
    date_of_expiry: { type: String, required: true },
    status: { type: String, enum: ['success', 'failure'], required: true },
    error_message: { type: String },
    timestamp: { type: Date, default: Date.now }
});

const OCRRecord = mongoose.model('OCRRecord', ocrRecordSchema);

module.exports = OCRRecord;
