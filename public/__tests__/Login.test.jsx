import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../src/Pages/Login';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('Login Page tests', () => {
  let props = {
    handleSubmit: jest.fn((e) => e.preventDefault()),
    handleChange: jest.fn((e) => e.preventDefault()),
    handleValidation: jest.fn((e) => e.preventDefault()),
  };

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Login {...props} />
      </MemoryRouter>
    );
  });

  it('Renders the Logo', () => {
    const logo = screen.getAllByRole('img');
    expect(logo.length).toBe(1);
  });

  it('Renders Log In button', () => {
    const button = screen.getAllByRole('button');
    expect(button.length).toBe(1);
  });

  it('Renders Username field with placeholder', () => {
    const input = screen.getByPlaceholderText('Username');
    expect(input.placeholder).toBe('Username');
  });

  it('Renders Password field with placeholder', () => {
    const input = screen.getByPlaceholderText(/Password/i);
    expect(input.placeholder).toBe('Password');
  });
});
