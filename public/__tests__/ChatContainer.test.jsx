import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatContainer from '../src/Components/ChatContainer';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import 'jest-localstorage-mock';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('Chat Input Component tests', () => {
  let props = {
    currentUser: {
      _id: '0',
      username: 'Test',
      avatar: 'sadf',
    },
    currentChat: {
      _id: '0',
      username: 'Test',
      avatar: 'sadf',
    },
    socket: {
      current: {
        on: jest.fn(),
      },
    },
  };

  localStorage.setItem('chat-user', JSON.stringify({ _id: '0' }));

  beforeEach(() => {
    render(
      <MemoryRouter>
        <ChatContainer {...props} />
      </MemoryRouter>
    );
  });

  afterAll(() => {
    localStorage.clear();
  });

  it('Renders Current Chat user image', () => {
    const icon = screen.getAllByRole('img');
    expect(icon.length).toBe(1);
  });

  it('Renders Current Chat user name', () => {
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(1);
  });

  it('Renders Send Message button', () => {
    const button = screen.getAllByRole('button');
    expect(button.length).toBe(1);
  });

  it('Renders Log Out', () => {
    const logout = screen.getAllByText(/Log Out/i);
    expect(logout.length).toBe(1);
  });
});
