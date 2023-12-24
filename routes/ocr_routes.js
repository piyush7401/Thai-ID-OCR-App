// Creation of routes
const express = require('express');
const multer = require('multer');
const ocrController = require('../controllers/ocrController');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 2 * 1024 * 1024 } });

router.post('/ocr/create', upload.single('idCardImage'), ocrController.createOCRRecord);
router.get('/ocr', ocrController.getOCRRecords);
router.delete('/ocr/:id', ocrController.deleteOCRRecord);

module.exports = router;
