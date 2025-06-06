import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Booking } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`bookings-tabpanel-${index}`}
      aria-labelledby={`bookings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

// Dummy data for development
const dummyBookings: Booking[] = [
  // ... (use the same dummy booking data from Profile.tsx)
];

const Bookings: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [bookings, setBookings] = useState<Booking[]>(dummyBookings);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

  // TODO: Fetch bookings from API
  useEffect(() => {
    // API call will go here
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDeleteClick = (bookingId: string) => {
    setSelectedBooking(bookingId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedBooking) {
      // TODO: Implement booking deletion logic
      console.log('Delete booking:', selectedBooking);
      setBookings(bookings.filter(booking => booking._id !== selectedBooking));
    }
    setDeleteDialogOpen(false);
    setSelectedBooking(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (tabValue === 0) return true; // All bookings
    if (tabValue === 1) return booking.status === 'confirmed';
    if (tabValue === 2) return booking.status === 'pending';
    return booking.status === 'cancelled';
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        My Bookings
      </Typography>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="All" />
          <Tab label="Confirmed" />
          <Tab label="Pending" />
          <Tab label="Cancelled" />
        </Tabs>

        <TabPanel value={tabValue} index={tabValue}>
          <List>
            {filteredBookings.map((booking) => (
              <ListItem key={booking._id} divider>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="h6">
                        {booking.type === 'accommodation'
                          ? booking.accommodation?.name
                          : booking.guide?.user.name}
                      </Typography>
                      <Chip
                        label={booking.status}
                        color={getStatusColor(booking.status) as any}
                        size="small"
                      />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2">
                        {new Date(booking.dates.checkIn).toLocaleDateString()} -{' '}
                        {new Date(booking.dates.checkOut).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        Guests: {booking.guests.adults} adults,{' '}
                        {booking.guests.children} children
                      </Typography>
                      <Typography variant="body2">
                        Total: ${booking.payment.amount} ({booking.payment.status})
                      </Typography>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  {booking.status === 'pending' && (
                    <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}>
                      <Edit />
                    </IconButton>
                  )}
                  {(booking.status === 'confirmed' || booking.status === 'pending') && (
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteClick(booking._id)}
                    >
                      <Delete />
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </TabPanel>
      </Paper>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Cancel Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this booking? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>No, Keep It</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Yes, Cancel Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Bookings; 