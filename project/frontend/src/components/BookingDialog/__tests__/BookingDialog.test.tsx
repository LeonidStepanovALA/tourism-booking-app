import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookingDialog from '../index';
import { Accommodation } from '../../../types';

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('BookingDialog Component', () => {
  const mockAccommodation: Accommodation = {
    _id: '1',
    name: 'Test Hotel',
    description: 'A test hotel description',
    location: {
      address: '123 Test St',
      city: 'Test City',
      country: 'Test Country',
    },
    type: 'hotel',
    price: {
      amount: 100,
      currency: 'USD',
    },
    amenities: ['WiFi', 'Pool'],
    images: ['test-image.jpg'],
    rating: {
      average: 4.5,
      count: 10,
    },
  };

  const mockOnClose = jest.fn();
  const mockOnBook = jest.fn();

  const renderDialog = () => {
    render(
      <BookingDialog
        open={true}
        onClose={mockOnClose}
        type="accommodation"
        item={mockAccommodation}
        onBook={mockOnBook}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dialog with accommodation details', () => {
    renderDialog();

    expect(screen.getByText('booking.dates.checkIn')).toBeInTheDocument();
    expect(screen.getByText('booking.dates.checkOut')).toBeInTheDocument();
    expect(screen.getByText('booking.guests.adults')).toBeInTheDocument();
    expect(screen.getByText('booking.guests.children')).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    renderDialog();

    // Fill in the form
    const adultsSelect = screen.getByLabelText('booking.guests.adults');
    fireEvent.change(adultsSelect, { target: { value: '2' } });

    const bookButton = screen.getByText('booking.actions.book');
    fireEvent.click(bookButton);

    await waitFor(() => {
      expect(mockOnBook).toHaveBeenCalled();
    });
  });

  it('handles dialog close', () => {
    renderDialog();

    const cancelButton = screen.getByText('common.cancel');
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('shows validation error when dates are not selected', async () => {
    renderDialog();

    const bookButton = screen.getByText('booking.actions.book');
    fireEvent.click(bookButton);

    expect(screen.getByText('Please select check-in and check-out dates')).toBeInTheDocument();
    expect(mockOnBook).not.toHaveBeenCalled();
  });
}); 