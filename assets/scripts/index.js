import {AsYouType} from 'libphonenumber-js'

// Execute script when the window has been loaded
window.onload = function () {

    // Format phone number as the user types it
    const phoneInput = document.getElementById('id_phone_number');
    if (phoneInput) {
        // Add an event listener to the input
        phoneInput.addEventListener('input', (event) => {
            const input = event.target;
            const value = input.value;
            input.value = new AsYouType('US').input(value);
        });
    }

}