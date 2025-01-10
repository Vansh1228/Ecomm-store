import React from 'react';
import { render, screen } from '@testing-library/react';
import ViewProduct from './ViewProduct';

// test('renders loading state', async () => {
//   render(<ViewProduct />);
//   expect(screen.getByText('Loading...')).toBeInTheDocument();
// });

const mockProduct = {
  image: 'https://example.com/image.jpg',
  title: 'Test Product',
  price: 99.99,
  description: 'This is a test product'
};

jest.mock('react-router-dom', () => ({
  useParams: () => ({ id: '1' })
}));

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: mockProduct }))
}));

describe('ViewProduct', () => {
  it('renders product details correctly', async () => {
    render(<ViewProduct />); 

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await screen.findByText('Test Product');
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText(/This is a test product/i)).toBeInTheDocument();
    expect(screen.getByText('$ 99.99')).toBeInTheDocument();
    const image = screen.getByAltText('Test Product');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('shows loading initially', () => {
    render(<ViewProduct />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});