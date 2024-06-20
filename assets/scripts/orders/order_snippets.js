// ####### ORDER SNIPPETS ######

import {getCookie} from "../utils";

// More Info button content
const btns_order_more_info = document.getElementsByClassName('btn-order-more-info')

for (const btn of btns_order_more_info) {
    btn.addEventListener('click', (event) => {
        if (btn.getAttribute('aria-expanded') === 'true') {
            btn.children[0].classList.add("fa-circle-chevron-up");
            btn.children[0].classList.remove("fa-circle-chevron-down");
        } else {
            btn.children[0].classList.add("fa-circle-chevron-down");
            btn.children[0].classList.remove("fa-circle-chevron-up");
        }
    });
}

function addButtonEvents() {
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
            // Don't update an order to picked up if it is unpaid
            if (this.dataset.nextStatus !== 'Picked-Up' || this.dataset.paid !== "False") {
                const orderId = this.dataset.orderId;
                updateOrderStatus(orderId, 'next_step');
            }
        });
    }
}

// Add previous step and next step buttons to order snippets
document.addEventListener('DOMContentLoaded', function () {
    addButtonEvents();
});


function updateOrderStatus(orderId, action) {

    const csrftoken = getCookie('csrftoken');

    // Send AJAX request to update instance status
    fetch(`/order_update_status/${orderId}/${action}/`, {
        method: 'PUT',
        headers: {
            'X-CSRFToken': csrftoken,
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.redirect) {
                window.location.href = data.redirect;
            } else {
                console.log("success")
                $('#order-card-' + orderId).replaceWith(data.order);
                addButtonEvents();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}