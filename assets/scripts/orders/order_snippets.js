// ####### ORDER SNIPPETS ######

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

// Add previous step and next step buttons to order snippets
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

function update_order_snippet(orderId, data) {
    // Ensure the correct order is updated
    if (orderId === data.id.toString()) {

        const status = $("#status-" + data.id)[0];
        if (status) {
            status.textContent = data.status;
        }
        const dateOrdered = $("#date-ordered-" + data.id)[0];
        if (dateOrdered) {
            dateOrdered.textContent = data.date_ordered;
        }
        const dateReceived = $("#date-received-" + data.id)[0];
        if (dateReceived) {
            dateReceived.textContent = data.date_received;
        }
        const dateCalled = $("#date-called-" + data.id)[0];
        if (dateCalled) {
            dateCalled.textContent = data.date_called;
        }
        const datePickedUp = $("#date-picked-up-" + data.id)[0];
        if (datePickedUp) {
            datePickedUp.textContent = data.date_picked_up;
        }
        const previousStep = $("#previous-step-" + data.id)[0];
        if (previousStep) {
            if (data.status_previous_step) {
                previousStep.textContent = data.status_previous_step;
                previousStep.parentNode.classList.remove("visually-hidden");
                if (data.status_previous_step === "Delete") {
                    previousStep.parentNode.setAttribute("data-bs-toggle", "modal");
                    previousStep.parentNode.setAttribute("data-bs-target", "#delete-order-" + data.id);
                } else {
                    previousStep.parentNode.removeAttribute("data-bs-toggle");
                    previousStep.parentNode.removeAttribute("data-bs-target");
                }
            } else {
                previousStep.parentNode.classList.add("visually-hidden");
            }
        }
        const nextStep = $("#next-step-" + data.id)[0];
        if (nextStep) {
            if (data.status_next_step) {
                nextStep.textContent = data.status_next_step;
                nextStep.parentNode.classList.remove("visually-hidden");
            } else {
                nextStep.parentNode.classList.add("visually-hidden");
            }
        }
    }
}


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
                update_order_snippet(orderId, data);
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });
}