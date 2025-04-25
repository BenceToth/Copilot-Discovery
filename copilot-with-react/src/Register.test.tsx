import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from './Register';

// filepath: c:\Users\U1023299\OneDrive - Sanofi\Documents\Trainings\06_LLM\Copilot-Discovery\copilot-with-react\src\Register.test.tsx

describe('Register Component', () => {
    test('shows error for invalid username and clears error for valid username', () => {
        render(<Register />);
        
        const usernameInput = screen.getByLabelText(/Username/i);
        const errorMessage = () => screen.queryByText(/Invalid Username/i);

        // Test invalid username
        fireEvent.change(usernameInput, { target: { value: 'short' } });
        expect(errorMessage()).toBeInTheDocument();

        fireEvent.change(usernameInput, { target: { value: 'NoSpecial1' } });
        expect(errorMessage()).toBeInTheDocument();

        // Test valid username
        fireEvent.change(usernameInput, { target: { value: 'Valid@123' } });
        expect(errorMessage()).not.toBeInTheDocument();
    });

    test('shows error for invalid mobile number and clears error for valid mobile number', () => {
        render(<Register />);
        
        const mobileInput = screen.getByLabelText(/UK Mobile Number/i);
        const errorMessage = () => screen.queryByText(/Invalid Mobile Number/i);

        // Test invalid mobile number
        fireEvent.change(mobileInput, { target: { value: '123456789' } });
        expect(errorMessage()).toBeInTheDocument();

        fireEvent.change(mobileInput, { target: { value: '071234567' } });
        expect(errorMessage()).toBeInTheDocument();

        // Test valid mobile number
        fireEvent.change(mobileInput, { target: { value: '07123456789' } });
        expect(errorMessage()).not.toBeInTheDocument();
    });
});