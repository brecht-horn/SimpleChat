import React from 'react';
import { render, screen } from '@testing-library/react';
import Register from '../src/Pages/Register';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('Register Page tests', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Register />
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

  it('Renders Email field with placeholder', () => {
    const input = screen.getByPlaceholderText(/Email Address/i);
    expect(input.placeholder).toBe('Email Address');
  });

  it('Renders Password & Confirm Passwords fields with placeholders', () => {
    const pass = screen.getAllByPlaceholderText(/Password/i);
    expect(pass.length).toBe(2);
  });
});
