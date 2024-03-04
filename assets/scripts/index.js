import {AsYouType} from 'libphonenumber-js'


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

// Display New Customer form
const btn_new_customer = document.getElementById('btn-new-customer');
const btn_existing_customer = document.getElementById('btn-existing-customer');
const new_customer_form = document.getElementById('new-customer-form');
const existing_customer_form = document.getElementById('existing-customer-form');

// Create a new customer - Replace the customer search with the customer form
if (btn_new_customer) {
    btn_new_customer.addEventListener('click', (event) => {
        $('#id_customer').val(null).trigger('change');
        new_customer_form.classList.remove('visually-hidden');
        existing_customer_form.classList.add('visually-hidden');
        btn_existing_customer.classList.add('btn-secondary');
        btn_existing_customer.classList.remove('btn-primary');
        btn_new_customer.classList.add('btn-primary');
        btn_new_customer.classList.remove('btn-secondary');
    });
}
// Search for a customer - Replace the new customer form with the customer search
if (btn_existing_customer) {
    btn_existing_customer.addEventListener('click', (event) => {
        existing_customer_form.classList.remove('visually-hidden');
        new_customer_form.classList.add('visually-hidden');
        btn_new_customer.classList.add('btn-secondary');
        btn_new_customer.classList.remove('btn-primary');
        btn_existing_customer.classList.add('btn-primary');
        btn_existing_customer.classList.remove('btn-secondary');
    });
}


// More Info button content
const btns_order_more_info = document.getElementsByClassName('btn-order-more-info')

for (const btn of btns_order_more_info) {
    btn.addEventListener('click', (event) => {
        if (btn.getAttribute('aria-expanded') === 'true') {
            btn.textContent = "Hide";
        } else {
            btn.textContent = "More Info";
        }
    });
}

// Display Bottle Deposit quantity input
const bottle_deposit_switch = document.getElementById('has_bottle_deposit');
const bottle_deposit_quantity = document.getElementById('bottle-deposit-quantity');

if (bottle_deposit_switch) {
    bottle_deposit_switch.addEventListener('change', (event) => {
        bottle_deposit_quantity.classList.toggle('visually-hidden');
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const previousStepButtons = $('.btn-previous-step');
    for (const button of previousStepButtons) {
        button.addEventListener('click', function () {
            const orderId = this.dataset.orderId;
            updateOrderStatus(orderId, 'previous_step');
        });
    }

    const nextStepButtons = $('.btn-next-step');
    for (const button of nextStepButtons) {
        button.addEventListener('click', function () {
            const orderId = this.dataset.orderId;
            updateOrderStatus(orderId, 'next_step');
        });
    }
});

function updatePreviousStep(orderId) {
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const csrftoken = getCookie('csrftoken');

    // Send AJAX request to update instance status
    fetch(`/order_update_status/${orderId}/${action}/`, {
        method: 'GET',
        headers: {
            'X-CSRFToken': csrftoken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ /* any additional data you need to send */})
    })
        .then(response => response.json())
        .then(data => {
            // Update the status on the page
            // document.getElementById(`status_${instanceId}`).textContent = data.status;
            console.log(`The order ${orderId} has been changed to the previous step.`);
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

