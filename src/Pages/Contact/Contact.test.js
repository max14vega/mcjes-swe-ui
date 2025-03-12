import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Contact from './Contact';

jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('Contact page', () => {
  it('renders the contact form', () => {
    const { getByText } = render(<Contact />);
    expect(getByText('Contact Us')).toBeInTheDocument();
    expect(getByText('Your Name')).toBeInTheDocument();
    expect(getByText('Email Address')).toBeInTheDocument();
    expect(getByText('Message')).toBeInTheDocument();
  });

  it('allows users to submit the form', () => {
    const { getByText, getByPlaceholderText } = render(<Contact />);
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email');
    const messageInput = getByPlaceholderText('Message');
    const submitButton = getByText('Send Message');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello, world!' } });
    fireEvent.click(submitButton);
  });

  it('handles form validation errors', () => {
    const { getByText, getByPlaceholderText } = render(<Contact />);
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email');
    const messageInput = getByPlaceholderText('Message');
    const submitButton = getByText('Send Message');

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(messageInput, { target: { value: '' } });
    fireEvent.click(submitButton);

  });
});