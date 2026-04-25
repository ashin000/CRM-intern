import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { companyAPI } from '../services';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CompanyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCompanyDetail();
  }, [id]);

  const fetchCompanyDetail = async () => {
    try {
      setLoading(true);
      const response = await companyAPI.getCompanyDetail(id);
      setCompany(response.data.company);
      setLeads(response.data.leads);
      setError('');
    } catch (err) {
      setError('Failed to fetch company details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !company) {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Alert severity="error">{error || 'Company not found'}</Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/companies')}>
          Back to Companies
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/companies')}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      {/* Company Info */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          {company.name}
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Box>
            <Typography color="textSecondary">Industry</Typography>
            <Typography variant="h6">{company.industry}</Typography>
          </Box>
          <Box>
            <Typography color="textSecondary">Location</Typography>
            <Typography variant="h6">{company.location}</Typography>
          </Box>
        </Box>
        {company.description && (
          <Box sx={{ mt: 2 }}>
            <Typography color="textSecondary">Description</Typography>
            <Typography>{company.description}</Typography>
          </Box>
        )}
      </Paper>

      {/* Associated Leads */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Associated Leads ({leads.length})
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No leads associated with this company
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => (
                  <TableRow key={lead._id}>
                    <TableCell>{lead.name}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.phone}</TableCell>
                    <TableCell>{lead.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default CompanyDetailPage;
