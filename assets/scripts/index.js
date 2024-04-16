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
            btn.children[0].classList.add("fa-circle-chevron-up");
            btn.children[0].classList.remove("fa-circle-chevron-down");
        } else {
            btn.children[0].classList.add("fa-circle-chevron-down");
            btn.children[0].classList.remove("fa-circle-chevron-up");
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
    // TODO Move getCookie() to utils
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

const btn_add_customer = document.getElementById('btn-add-customer');
if (btn_add_customer) {
    btn_add_customer.addEventListener('click', (event) => {
        const element = document.getElementById("fa-btn-add-customer");  // Get the DIV element

        if (btn_add_customer.getAttribute('aria-expanded') === 'true') {
            element.classList.remove("fa-circle-plus");
            element.classList.add("fa-circle-minus");
        } else {
            element.classList.remove("fa-circle-minus");
            element.classList.add("fa-circle-plus");
        }
    });
}

// Initialize tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Display message when memo is required
const memo_required_toast = $('#memo-required-toast')[0]
const memo_required_toast_triggers = $('.memo_required_toast-btn')
for (const trigger of memo_required_toast_triggers) {
    trigger.addEventListener('change', (e) => {
        if (e.target.checked) {
            const toast = new bootstrap.Toast(memo_required_toast)
            toast.show()
        }
    });
}
