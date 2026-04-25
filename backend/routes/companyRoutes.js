const express = require('express');
const router = express.Router();
const {
  createCompany,
  getCompanies,
  getCompanyDetail,
  updateCompany,
  deleteCompany,
} = require('../controllers/companyController');
const { protect } = require('../middleware/auth');

router.use(protect); // All routes are protected

router.post('/', createCompany);
router.get('/', getCompanies);
router.get('/:id', getCompanyDetail);
router.put('/:id', updateCompany);
router.delete('/:id', deleteCompany);

module.exports = router;
