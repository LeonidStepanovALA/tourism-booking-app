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
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Rating,
  Stack,
} from '@mui/material';
import { Language, EmojiEvents, Search } from '@mui/icons-material';
import { Guide } from '../types';

// Dummy data for development
const dummyGuides: Guide[] = [
  {
    _id: '1',
    user: {
      _id: 'u1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'guide',
    },
    bio: 'Experienced guide with a passion for history and culture',
    specializations: ['history', 'culture'],
    languages: ['English', 'Spanish'],
    experience: 5,
    services: [
      {
        title: 'City Walking Tour',
        description: 'Explore the historic city center',
        duration: 3,
        price: {
          amount: 50,
          currency: 'USD',
        },
        maxGroupSize: 10,
      },
    ],
    rating: {
      average: 4.8,
      count: 45,
    },
    profileImage: 'https://source.unsplash.com/random/400x400/?portrait',
    location: {
      city: 'Barcelona',
      country: 'Spain',
    },
  },
  // Add more dummy guides as needed
];

const Guides: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>(dummyGuides);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  // TODO: Fetch guides from API
  useEffect(() => {
    // API call will go here
  }, []);

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = !selectedSpecialization || guide.specializations.includes(selectedSpecialization);
    const matchesLanguage = !selectedLanguage || guide.languages.includes(selectedLanguage);
    return matchesSearch && matchesSpecialization && matchesLanguage;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Find Your Perfect Guide
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search guides"
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
              <InputLabel>Specialization</InputLabel>
              <Select
                value={selectedSpecialization}
                label="Specialization"
                onChange={(e) => setSelectedSpecialization(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="history">History</MenuItem>
                <MenuItem value="culture">Culture</MenuItem>
                <MenuItem value="nature">Nature</MenuItem>
                <MenuItem value="food">Food</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Language</InputLabel>
              <Select
                value={selectedLanguage}
                label="Language"
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="German">German</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {filteredGuides.map((guide) => (
          <Grid item key={guide._id} xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={guide.profileImage}
                alt={guide.user.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {guide.user.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EmojiEvents sx={{ color: 'text.secondary', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {guide.experience} years experience
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Language sx={{ color: 'text.secondary', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {guide.languages.join(', ')}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  {guide.specializations.map((spec, index) => (
                    <Chip key={index} label={spec} size="small" />
                  ))}
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {guide.bio.substring(0, 150)}...
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating value={guide.rating.average} readOnly precision={0.5} size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({guide.rating.count})
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="primary">
                    From ${guide.services[0].price.amount}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  // TODO: Implement guide details page
                  onClick={() => console.log('View guide details:', guide._id)}
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Guides; 