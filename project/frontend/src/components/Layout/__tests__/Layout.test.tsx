import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../contexts/AuthContext';
import Layout from '../index';

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

describe('Layout Component', () => {
  const renderLayout = () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <div>Test Content</div>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('renders the logo and navigation links', () => {
    renderLayout();
    
    expect(screen.getByText('Tourism Booking')).toBeInTheDocument();
    expect(screen.getByText('accommodation.title')).toBeInTheDocument();
    expect(screen.getByText('guide.title')).toBeInTheDocument();
  });

  it('renders login and register buttons when not authenticated', () => {
    renderLayout();
    
    expect(screen.getByText('auth.login')).toBeInTheDocument();
    expect(screen.getByText('auth.register')).toBeInTheDocument();
  });

  it('renders children content', () => {
    renderLayout();
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders language switcher', () => {
    renderLayout();
    
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('RU')).toBeInTheDocument();
  });
}); 