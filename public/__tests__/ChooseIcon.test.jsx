import React from 'react';
import { render, screen, } from '@testing-library/react';
import ChooseIcon from '../src/Pages/ChooseIcon';
import '@testing-library/jest-dom';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('ChooseIcon Page tests', () => {

  const props = {
    isLoading: false,
  };

  let notLoading;
  beforeEach(() => {
    notLoading = render(<ChooseIcon/>);
  });

  it('Renders Loading image when waiting for images to load', () => {
    const icon = screen.getAllByRole('img');
    expect(icon.length).toBe(1);
  });

});
