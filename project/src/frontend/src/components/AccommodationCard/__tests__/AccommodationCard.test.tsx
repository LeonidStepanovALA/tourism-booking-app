import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AccommodationCard from '../index';
import { Accommodation } from '../../../types';

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('AccommodationCard Component', () => {
  const mockAccommodation: Accommodation = {
    _id: '1',
    name: 'Test Hotel',
    description: 'A test hotel description',
    location: {
      address: '123 Test St',
      city: 'Test City',
      country: 'Test Country',
      coordinates: {
        lat: 0,
        lng: 0,
      },
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

  const renderCard = () => {
    render(
      <BrowserRouter>
        <AccommodationCard accommodation={mockAccommodation} />
      </BrowserRouter>
    );
  };

  it('renders accommodation details correctly', () => {
    renderCard();

    expect(screen.getByText(mockAccommodation.name)).toBeInTheDocument();
    expect(screen.getByText(mockAccommodation.description.substring(0, 150))).toBeInTheDocument();
    expect(screen.getByText(`${mockAccommodation.location.city}, ${mockAccommodation.location.country}`)).toBeInTheDocument();
  });

  it('renders price correctly', () => {
    renderCard();

    expect(screen.getByText(`$${mockAccommodation.price.amount}`)).toBeInTheDocument();
  });

  it('renders amenities', () => {
    renderCard();

    mockAccommodation.amenities.forEach(amenity => {
      expect(screen.getByText(amenity)).toBeInTheDocument();
    });
  });

  it('renders rating', () => {
    renderCard();

    expect(screen.getByText(`(${mockAccommodation.rating.count})`)).toBeInTheDocument();
  });

  it('renders view details button', () => {
    renderCard();

    expect(screen.getByText('accommodation.viewDetails')).toBeInTheDocument();
  });
}); 