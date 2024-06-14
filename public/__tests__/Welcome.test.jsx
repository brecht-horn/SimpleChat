import React from 'react';
import { render, screen } from '@testing-library/react';
import Welcome from '../src/Components/Welcome';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('Welcome Component tests', () => {
  let props = {
    currentUser: {
      username: 'Test',
    },
  };

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Welcome {...props} />
      </MemoryRouter>
    );
  });

  it('Renders the Welcome Image', () => {
    const welcome = screen.getAllByRole('img');
    expect(welcome.length).toBe(1);
  });

  it('Renders the Username and choose chat text', () => {
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(2);
  });
});
