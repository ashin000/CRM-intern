const express = require('express');
const router = express.Router();
const {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
} = require('../controllers/leadController');
const { protect } = require('../middleware/auth');

router.use(protect); // All routes are protected

router.post('/', createLead);
router.get('/', getLeads);
router.get('/:id', getLead);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

module.exports = router;
