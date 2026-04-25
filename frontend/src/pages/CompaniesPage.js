import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import { companyAPI } from '../services';
import { useProtectedRoute } from '../hooks/useProtectedRoute';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const CompaniesPage = () => {
  const { isAuthenticated, loading: authLoading } = useProtectedRoute();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    location: '',
    description: '',
  });

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchCompanies();
    }
  }, [authLoading, isAuthenticated, page]);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await companyAPI.getCompanies(page, limit);
      setCompanies(response.data.companies);
      setTotal(response.data.total);
      setError('');
    } catch (err) {
      setError('Failed to fetch companies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (company = null) => {
    if (company) {
      setEditingId(company._id);
      setFormData({
        name: company.name,
        industry: company.industry,
        location: company.location,
        description: company.description || '',
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        industry: '',
        location: '',
        description: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await companyAPI.updateCompany(editingId, formData);
      } else {
        await companyAPI.createCompany(formData);
      }
      handleCloseDialog();
      fetchCompanies();
    } catch (err) {
      setError('Failed to save company');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await companyAPI.deleteCompany(id);
        fetchCompanies();
      } catch (err) {
        setError('Failed to delete company');
        console.error(err);
      }
    }
  };

  if (authLoading || loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <h2>Companies</h2>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
          Add Company
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Name</TableCell>
              <TableCell>Industry</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No companies found
                </TableCell>
              </TableRow>
            ) : (
              companies.map((company) => (
                <TableRow key={company._id}>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.industry}</TableCell>
                  <TableCell>{company.location}</TableCell>
                  <TableCell>
                    <Button
                      startIcon={<VisibilityIcon />}
                      size="small"
                      onClick={() => navigate(`/companies/${company._id}`)}
                    />
                    <Button
                      startIcon={<EditIcon />}
                      size="small"
                      onClick={() => handleOpenDialog(company)}
                    />
                    <Button
                      startIcon={<DeleteIcon />}
                      size="small"
                      color="error"
                      onClick={() => handleDelete(company._id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={Math.ceil(total / limit)}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Box>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Company' : 'Add New Company'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Company Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={handleFormChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleFormChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            margin="normal"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CompaniesPage;
