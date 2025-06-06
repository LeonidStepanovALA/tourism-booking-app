import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
  Stack,
} from '@mui/material';
import { LocationOn, Hotel } from '@mui/icons-material';
import { Accommodation } from '../types';

interface AccommodationCardProps {
  accommodation: Accommodation;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({ accommodation }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={accommodation.images[0] || 'https://source.unsplash.com/random/800x600/?hotel'}
        alt={accommodation.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {accommodation.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOn sx={{ color: 'text.secondary', mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {accommodation.location.city}, {accommodation.location.country}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Hotel sx={{ color: 'text.secondary', mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {accommodation.type}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          {accommodation.amenities.slice(0, 3).map((amenity, index) => (
            <Chip key={index} label={amenity} size="small" />
          ))}
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {accommodation.description.substring(0, 150)}...
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating value={accommodation.rating.average} readOnly precision={0.5} size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({accommodation.rating.count})
            </Typography>
          </Box>
          <Typography variant="h6" color="primary">
            ${accommodation.price.amount}
            <Typography component="span" variant="caption" color="text.secondary">
              /night
            </Typography>
          </Typography>
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate(`/accommodations/${accommodation._id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default AccommodationCard; 