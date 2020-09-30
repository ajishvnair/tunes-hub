/**
 * This file contains the application's colors.
 *
 * Define color here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

const primary = '#2193b0';
const text = '#212529';
const secondary = '#6dd5ed';
const success = '#28a745';
const error = '#dc3545';

const colors = {
    transparent: 'rgba(0,0,0,0)',
    // Example colors:
    text,
    primary,
    secondary,
    success,
    error,
    theme: {
        lightMode: {
            primary,
            secondary
        },
        darkMode: {
            primary: secondary,
            secondary: primary
        }
    }
};
module.exports = colors;
