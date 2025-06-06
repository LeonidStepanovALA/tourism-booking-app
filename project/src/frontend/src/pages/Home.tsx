import React from 'react';
import { Typography, Grid, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          Welcome to Tourism Booking
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Find the perfect accommodation and experienced guides for your next adventure
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image="https://source.unsplash.com/random/800x600/?hotel"
              alt="Accommodation"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Find Perfect Accommodations
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Browse through our carefully selected accommodations, from luxury hotels to cozy apartments.
              </Typography>
              <Button variant="contained" color="primary" onClick={() => navigate('/accommodations')}>
                Browse Accommodations
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image="https://source.unsplash.com/random/800x600/?tour-guide"
              alt="Tour Guide"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Expert Local Guides
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Connect with experienced local guides who will make your trip unforgettable.
              </Typography>
              <Button variant="contained" color="primary" onClick={() => navigate('/guides')}>
                Find Guides
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home; 