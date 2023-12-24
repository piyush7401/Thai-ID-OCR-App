// Creation of routes
const express = require('express');
const router = express.Router();
const {getAllOCRRecords, getSpecificOCRRecord, createOCRRecord, updateOCRRecord, deleteOCRRecord} = require('../controllers/ocr_controller');
const multer = require('multer');

// Multer setup for handling file uploads
const storage = multer.memoryStorage(); // Use memory storage for handling files as buffers
const upload = multer({ storage: storage });

// Routes with multer middleware for handling file uploads
router.post('/api/ocr/create', upload.single('idCardImage'), createOCRRecord);


// Controllers
// Get all OCR records
router.get('/api/ocr/all', getAllOCRRecords);

// Get a specific OCR record by ID
router.get('/api/ocr/:id', getSpecificOCRRecord);

// Create a new OCR record
router.post('/api/ocr/create', createOCRRecord);

// Update an existing OCR record (assuming you have an update function)
router.put('/api/ocr/:id', updateOCRRecord);

// Delete an OCR record by ID
router.delete('/api/ocr/:id', deleteOCRRecord);


module.exports = router;
