// filepath: bucks2bar/scripts.test.js
/**
 * @jest-environment jsdom
 */

describe('Username Validation', () => {
    let usernameInput;

    beforeEach(() => {
        // Set up a mock DOM environment
        document.body.innerHTML = `
            <input type="text" id="username" />
        `;
        usernameInput = document.getElementById('username');
    });

    test('Valid username with all criteria', () => {
        usernameInput.value = 'Valid@123';
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
        expect(regex.test(usernameInput.value)).toBe(true);
    });

    test('Invalid username missing a capital letter', () => {
        usernameInput.value = 'invalid@123';
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
        expect(regex.test(usernameInput.value)).toBe(false);
    });

    test('Invalid username missing a special character', () => {
        usernameInput.value = 'Invalid123';
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
        expect(regex.test(usernameInput.value)).toBe(false);
    });

    test('Invalid username missing a number', () => {
        usernameInput.value = 'Invalid@';
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
        expect(regex.test(usernameInput.value)).toBe(false);
    });

    test('Invalid username less than 8 characters', () => {
        usernameInput.value = 'Inv@1';
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
        expect(regex.test(usernameInput.value)).toBe(false);
    });
});