import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { dashboardAPI } from '../services';
import { useProtectedRoute } from '../hooks/useProtectedRoute';

const DashboardPage = () => {
  const { isAuthenticated, loading: authLoading } = useProtectedRoute();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchStats();
    }
  }, [authLoading, isAuthenticated]);

  const fetchStats = async () => {
    try {
      const response = await dashboardAPI.getStats();
      setStats(response.data.stats);
      setError('');
    } catch (err) {
      setError('Failed to fetch dashboard stats');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Total Leads */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Leads
              </Typography>
              <Typography variant="h3">{stats?.totalLeads || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Qualified Leads */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Qualified Leads
              </Typography>
              <Typography variant="h3">{stats?.qualifiedLeads || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Lost Leads */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Lost Leads
              </Typography>
              <Typography variant="h3">{stats?.lostLeads || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Completed Tasks */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Completed Tasks
              </Typography>
              <Typography variant="h3">{stats?.completedTasks || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Tasks Due Today */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Tasks Due Today
              </Typography>
              <Typography variant="h3">{stats?.tasksDueToday || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Tasks */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Tasks
              </Typography>
              <Typography variant="h3">{stats?.totalTasks || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
