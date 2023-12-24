// Creation of routes
const express = require('express');
const router = express.Router();
const ocrController = require('../controllers/ocrController');
const multer = require('multer');

// Multer setup for handling file uploads
const storage = multer.memoryStorage(); // Use memory storage for handling files as buffers
const upload = multer({ storage: storage });

// Routes with multer middleware for handling file uploads
router.post('/api/ocr/create', upload.single('idCardImage'), ocrController.createOCRRecord);

// Get all OCR records
router.get('/api/ocr/all', ocrController.getAllOCRRecords);

// Get a specific OCR record by ID
router.get('/api/ocr/:id', ocrController.getSpecificOCRRecord);

// Create a new OCR record
router.post('/api/ocr/create', ocrController.createOCRRecord);

// Update an existing OCR record (assuming you have an update function)
router.put('/api/ocr/:id', ocrController.updateOCRRecord);

// Delete an OCR record by ID
router.delete('/api/ocr/:id', ocrController.deleteOCRRecord);

router.get('/ocr', ocrController.getOCRRecords);
router.delete('/ocr/:id', ocrController.deleteOCRRecord);

module.exports = router;
