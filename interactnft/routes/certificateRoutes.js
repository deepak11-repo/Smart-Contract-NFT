const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');

router.post('/issueCertificate', async (req, res) => {
    const { studentName, courseName, enrollmentDate, completionDate } = req.body;

    try {
        const { totalCost, tokenId } = await certificateController.issueCertificate(studentName, courseName, enrollmentDate, completionDate);
        res.json({ totalCost, tokenId });
    } catch (error) {
        console.error('Error issuing certificate:', error.message);
        res.status(500).json({ error: error.message });
    }
});

router.get('/fetchCertificate/:tokenId', async (req, res) => {
    const { tokenId } = req.params;
    try {
        const certificate = await certificateController.fetchCertificate(tokenId);
        res.json(certificate);
    } catch (error) {
        console.error('Error fetching certificate:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
