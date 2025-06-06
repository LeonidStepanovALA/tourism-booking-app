import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { addDays, differenceInDays } from 'date-fns';
import { Accommodation, Guide, Booking } from '../types';

interface BookingDialogProps {
  open: boolean;
  onClose: () => void;
  type: 'accommodation' | 'guide';
  item: Accommodation | Guide;
  onBook: (booking: Partial<Booking>) => Promise<void>;
}

const BookingDialog: React.FC<BookingDialogProps> = ({
  open,
  onClose,
  type,
  item,
  onBook,
}) => {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [specialRequests, setSpecialRequests] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isGuide = type === 'guide';
  const guide = isGuide ? (item as Guide) : null;
  const accommodation = !isGuide ? (item as Accommodation) : null;

  const handleBook = async () => {
    if (!checkIn || !checkOut) {
      setError('Please select check-in and check-out dates');
      return;
    }

    if (isGuide && !selectedService) {
      setError('Please select a service');
      return;
    }

    const booking: Partial<Booking> = {
      type,
      dates: {
        checkIn,
        checkOut,
      },
      guests: {
        adults,
        children,
      },
      specialRequests,
    };

    if (isGuide) {
      booking.guide = guide?._id;
      const service = guide?.services.find(s => s.title === selectedService);
      if (service) {
        booking.serviceDetails = {
          title: service.title,
          duration: service.duration,
        };
        booking.payment = {
          amount: service.price.amount,
          currency: service.price.currency,
          status: 'pending',
        };
      }
    } else {
      booking.accommodation = accommodation?._id;
      const days = differenceInDays(checkOut, checkIn);
      booking.payment = {
        amount: (accommodation?.price.amount || 0) * days,
        currency: accommodation?.price.currency || 'USD',
        status: 'pending',
      };
    }

    try {
      await onBook(booking);
      onClose();
    } catch (err) {
      setError('Failed to create booking. Please try again.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isGuide ? 'Book a Guide' : 'Book Accommodation'}
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ my: 2 }}>
            <DatePicker
              label="Check-in Date"
              value={checkIn}
              onChange={(newValue) => {
                setCheckIn(newValue);
                if (newValue && (!checkOut || checkOut <= newValue)) {
                  setCheckOut(addDays(newValue, 1));
                }
              }}
              minDate={new Date()}
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <DatePicker
              label="Check-out Date"
              value={checkOut}
              onChange={(newValue) => setCheckOut(newValue)}
              minDate={checkIn ? addDays(checkIn, 1) : new Date()}
            />
          </Box>
        </LocalizationProvider>

        {isGuide && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Service</InputLabel>
            <Select
              value={selectedService}
              label="Select Service"
              onChange={(e) => setSelectedService(e.target.value)}
            >
              {guide?.services.map((service) => (
                <MenuItem key={service.title} value={service.title}>
                  {service.title} - ${service.price.amount}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Box sx={{ my: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Number of Guests
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Adults</InputLabel>
              <Select
                value={adults}
                label="Adults"
                onChange={(e) => setAdults(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Children</InputLabel>
              <Select
                value={children}
                label="Children"
                onChange={(e) => setChildren(Number(e.target.value))}
              >
                {[0, 1, 2, 3, 4].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={4}
          margin="normal"
          label="Special Requests"
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleBook} variant="contained" color="primary">
          Book Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingDialog; 