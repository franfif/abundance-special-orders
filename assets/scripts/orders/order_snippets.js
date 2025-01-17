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

function handlerPreviousStepClick(event) {
    const orderId = event.currentTarget.dataset.orderId;
    updateOrderStatus(orderId, 'previous_step');
}

function handlerNextStepClick(event) {
    if (event.currentTarget.dataset.nextStatus !== 'Picked-Up' || event.currentTarget.dataset.paid !== "False") {
        const orderId = event.currentTarget.dataset.orderId;
        updateOrderStatus(orderId, 'next_step');
    }
}

export function addButtonEvents(orderCardId = null) {
    // Add event listeners to button on 1 order or on all orders
    const previousStepButtons = orderCardId ? $(orderCardId + ' .btn-previous-step') : $('.btn-previous-step');
    previousStepButtons.on("click", handlerPreviousStepClick);

    const nextStepButtons = orderCardId ? $(orderCardId + ' .btn-next-step') : $('.btn-next-step');
    nextStepButtons.on("click", handlerNextStepClick);
}

function updateOrderStatus(orderId, action) {

    const csrftoken = getCookie('csrftoken');

    // Send AJAX request to update instance status
    fetch(`/order_update_status/${orderId}/${action}/`, {
        method: 'PUT',
        headers: {
            'X-CSRFToken': csrftoken,
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.redirect) {
                window.location.href = data.redirect;
            } else {
                const orderCardId = '#order-card-' + orderId
                $(orderCardId).replaceWith(data.order);
                addButtonEvents(orderCardId);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}