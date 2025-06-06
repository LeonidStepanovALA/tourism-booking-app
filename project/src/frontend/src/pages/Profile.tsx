import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { User, Booking } from '../types';

// Dummy data for development
const dummyUser: User = {
  _id: 'u1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'tourist',
  phone: '+1234567890',
};

const dummyBookings: Booking[] = [
  {
    _id: 'b1',
    user: dummyUser,
    type: 'accommodation',
    accommodation: {
      _id: 'a1',
      name: 'Luxury Hotel & Spa',
      description: 'Luxury accommodation',
      location: {
        address: '123 Main St',
        city: 'Paris',
        country: 'France',
      },
      type: 'hotel',
      price: {
        amount: 250,
        currency: 'USD',
      },
      amenities: ['WiFi', 'Pool'],
      images: [],
      rating: {
        average: 4.5,
        count: 100,
      },
    },
    dates: {
      checkIn: new Date('2024-07-01'),
      checkOut: new Date('2024-07-05'),
    },
    guests: {
      adults: 2,
      children: 0,
    },
    status: 'confirmed',
    payment: {
      amount: 1000,
      currency: 'USD',
      status: 'paid',
    },
  },
];

const Profile: React.FC = () => {
  const [user, setUser] = useState<User>(dummyUser);
  const [bookings, setBookings] = useState<Booking[]>(dummyBookings);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSaveProfile = async () => {
    // TODO: Implement profile update logic
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleCancelBooking = async (bookingId: string) => {
    // TODO: Implement booking cancellation logic
    console.log('Cancel booking:', bookingId);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{ width: 120, height: 120, mb: 2 }}
                src="https://source.unsplash.com/random/200x200/?portrait"
              />
              <Typography variant="h5" gutterBottom>
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Typography>
            </Box>

            {isEditing ? (
              <Box component="form">
                <TextField
                  fullWidth
                  margin="normal"
                  label="Name"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Phone"
                  value={editedUser.phone}
                  onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                />
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleSaveProfile}
                    fullWidth
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedUser(user);
                    }}
                    fullWidth
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{user.email}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">{user.phone}</Typography>
                </Box>
                <Button
                  variant="contained"
                  onClick={() => setIsEditing(true)}
                  fullWidth
                >
                  Edit Profile
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Bookings
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {bookings.map((booking) => (
                <ListItem key={booking._id} divider>
                  <ListItemText
                    primary={booking.type === 'accommodation' ? booking.accommodation?.name : booking.guide?.user.name}
                    secondary={
                      <>
                        <Typography variant="body2">
                          {new Date(booking.dates.checkIn).toLocaleDateString()} - {new Date(booking.dates.checkOut).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Amount: ${booking.payment.amount} ({booking.payment.status})
                        </Typography>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    {booking.status === 'confirmed' && (
                      <IconButton
                        edge="end"
                        aria-label="cancel"
                        onClick={() => handleCancelBooking(booking._id)}
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 