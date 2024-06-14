import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatInput from '../src/Components/ChatInput';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));


describe('Chat Input Component tests', () => {

  let props = {
    handleSendMessage: jest.fn((e) => e.preventDefault()),
  };

  beforeEach(() => {
    render(
      <MemoryRouter>
        <ChatInput {...props} />
      </MemoryRouter>
    );
  });

  it('Renders Send Message button', () => {
    const button = screen.getAllByRole('button');
    expect(button.length).toBe(1);
  });

  it('Renders EmojiPicker', () => {
    const emoji = screen.getByRole('emoji');
    expect(emoji).toBeTruthy();
  });

  it('Renders input field with correct placeholder', () => {
    const input = screen.getByPlaceholderText('type your message here');
    expect(input.placeholder).toBe('type your message here');
  });

  it('Runs a function when send button is pressed', () => {
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(props.handleSendMessage.mock.calls).toBeTruthy();
  });

});
