import React, { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useClass } from "../../context/ClassContext";
import { AuthContext } from '../../context/AuthContext';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Pagination,
  Chip,
  Skeleton,
  Container,
  IconButton
} from '@mui/material';
import {
  Class as ClassIcon,
  People as PeopleIcon,
  Subject as SubjectIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

const PAGE_SIZE = 5;

const darkTheme = {
  background: '#0a1929',
  textPrimary: '#e3f2fd',
  textSecondary: '#90caf9',
  accent: '#64b5f6',
  cardBackground: '#132f4c',
  border: '1px solid rgba(100, 181, 246, 0.1)'
};

/**
 * Renders a loading skeleton grid for class cards.
 */
const LoadingSkeleton = () => (
  <Grid container spacing={3}>
    {Array.from({ length: 6 }).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card sx={{ background: darkTheme.cardBackground, border: darkTheme.border }}>
          <CardContent>
            <Skeleton variant="rectangular" height={120} sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
            <Skeleton variant="text" height={32} sx={{ mb: 1, bgcolor: 'rgba(255,255,255,0.1)' }} />
            <Skeleton variant="text" height={20} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

/**
 * Renders an empty state message when no classes are present.
 */
const EmptyState = ({ user }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      textAlign: 'center'
    }}
  >
    <ClassIcon sx={{ fontSize: 80, color: darkTheme.textSecondary, mb: 2 }} />
    <Typography variant="h5" sx={{ color: darkTheme.textPrimary, mb: 1 }}>
      No classes found
    </Typography>
    <Typography variant="body1" sx={{ color: darkTheme.textSecondary }}>
      {user?.role === 'teacher' || user?.role === 'admin'
        ? 'Create your first class to get started'
        : 'Join a class to see it here'}
    </Typography>
  </Box>
);

/**
 * Returns a random color from a predefined palette.
 */
const getRandomColor = () => {
  const colors = ['#1976d2', '#388e3c', '#f57c00', '#d32f2f', '#7b1fa2', '#303f9f'];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * AllClassesPage Component
 * Displays a paginated, responsive list of classes for the current user.
 * Handles loading, error, and empty states.
 */
const AllClassesPage = () => {
  const { classes, loading, error, fetchClasses } = useClass();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch classes when user changes
  useEffect(() => {
    if (user?._id) fetchClasses(user._id);
  }, [user?._id, fetchClasses]);

  // Memoize classes array for safety and performance
  const safeClasses = useMemo(() => Array.isArray(classes) ? classes : [], [classes]);

  // Pagination calculations
  const totalPages = useMemo(() => Math.ceil(safeClasses.length / PAGE_SIZE), [safeClasses.length]);
  const paginatedClasses = useMemo(
    () => safeClasses.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [safeClasses, currentPage]
  );

  /**
   * Handles page change event for pagination.
   */
  const handlePageChange = useCallback((_, page) => setCurrentPage(page), []);

  /**
   * Handles navigation to class details.
   */
  const handleClassClick = useCallback((classId) => navigate(`/class/${classId}`), [navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: darkTheme.background,
        color: darkTheme.textPrimary,
        py: 4
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              color: darkTheme.textPrimary,
              fontWeight: 600,
              mb: 1
            }}
          >
            My Classes
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: darkTheme.textSecondary }}
          >
            {safeClasses.length} {safeClasses.length === 1 ? 'class' : 'classes'} available
          </Typography>
        </Box>

        {/* Error Message */}
        {error && (
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ color: '#f44336' }}>
              {error}
            </Typography>
          </Box>
        )}

        {/* Loading, Empty, or Classes Grid */}
        {loading ? (
          <LoadingSkeleton />
        ) : safeClasses.length === 0 ? (
          <EmptyState user={user} />
        ) : (
          <>
            <Grid container spacing={3}>
              {paginatedClasses.map((cls) => (
                <Grid item xs={12} sm={6} md={4} key={cls._id}>
                  <Card
                    sx={{
                      background: darkTheme.cardBackground,
                      border: darkTheme.border,
                      borderRadius: 3,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(100, 181, 246, 0.2)',
                      }
                    }}
                    onClick={() => handleClassClick(cls.classId)}
                  >
                    {/* Class Header */}
                    <Box
                      sx={{
                        height: 120,
                        background: `linear-gradient(135deg, ${getRandomColor()}, ${getRandomColor()})`,
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'flex-end',
                        p: 2
                      }}
                    >
                      <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                        <IconButton
                          size="small"
                          onClick={e => e.stopPropagation()}
                          sx={{ color: 'white' }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            color: 'white',
                            fontWeight: 600,
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                          }}
                        >
                          {cls.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'rgba(255,255,255,0.9)',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                          }}
                        >
                          {cls.subject}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Card Content */}
                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: darkTheme.textSecondary,
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {cls.description || "No description provided"}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <SubjectIcon sx={{ fontSize: 16, color: darkTheme.textSecondary }} />
                          <Typography variant="caption" sx={{ color: darkTheme.textSecondary }}>
                            {cls.subject}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <PeopleIcon sx={{ fontSize: 16, color: darkTheme.textSecondary }} />
                          <Typography variant="caption" sx={{ color: darkTheme.textSecondary }}>
                            {cls.userList?.length || 0} students
                          </Typography>
                        </Box>
                      </Box>

                      <Chip
                        label={cls.status || 'Active'}
                        size="small"
                        sx={{
                          background: cls.status === 'active' ? '#4caf50' : '#ff9800',
                          color: 'white',
                          fontSize: '0.7rem'
                        }}
                      />
                    </CardContent>

                    {/* Card Actions */}
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        size="small"
                        onClick={e => {
                          e.stopPropagation();
                          handleClassClick(cls.classId);
                        }}
                        sx={{
                          color: darkTheme.accent,
                          '&:hover': {
                            background: 'rgba(100, 181, 246, 0.1)'
                          }
                        }}
                      >
                        Open Class
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      color: darkTheme.textPrimary,
                      borderColor: darkTheme.accent,
                      '&:hover': {
                        backgroundColor: 'rgba(100, 181, 246, 0.1)',
                      },
                      '&.Mui-selected': {
                        backgroundColor: darkTheme.accent,
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#1976d2',
                        },
                      },
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default AllClassesPage;