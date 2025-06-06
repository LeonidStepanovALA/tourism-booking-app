import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Slider,
  InputAdornment,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { Accommodation } from '../types';
import AccommodationCard from '../components/AccommodationCard';

// Dummy data for development
const dummyAccommodations: Accommodation[] = [
  {
    _id: '1',
    name: 'Luxury Hotel & Spa',
    description: 'Experience luxury at its finest with our premium accommodations and world-class spa facilities.',
    location: {
      address: '123 Main Street',
      city: 'Paris',
      country: 'France',
      coordinates: {
        lat: 48.8566,
        lng: 2.3522,
      },
    },
    type: 'hotel',
    price: {
      amount: 250,
      currency: 'USD',
    },
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'],
    images: ['https://source.unsplash.com/random/800x600/?luxury-hotel'],
    rating: {
      average: 4.8,
      count: 128,
    },
  },
  // Add more dummy accommodations as needed
];

const Accommodations: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>(dummyAccommodations);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  // TODO: Fetch accommodations from API
  useEffect(() => {
    // API call will go here
  }, []);

  const filteredAccommodations = accommodations.filter(accommodation => {
    const matchesSearch = accommodation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accommodation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accommodation.location.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || accommodation.type === selectedType;
    const matchesPrice = accommodation.price.amount >= priceRange[0] && accommodation.price.amount <= priceRange[1];
    return matchesSearch && matchesType && matchesPrice;
  });

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Find Your Perfect Stay
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search accommodations"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={selectedType}
                label="Type"
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="hotel">Hotel</MenuItem>
                <MenuItem value="apartment">Apartment</MenuItem>
                <MenuItem value="hostel">Hostel</MenuItem>
                <MenuItem value="guesthouse">Guesthouse</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography gutterBottom>Price Range (USD)</Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              step={50}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                ${priceRange[0]}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${priceRange[1]}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {filteredAccommodations.map((accommodation) => (
          <Grid item key={accommodation._id} xs={12} md={6} lg={4}>
            <AccommodationCard accommodation={accommodation} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Accommodations; 