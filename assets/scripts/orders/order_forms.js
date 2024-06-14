// ###### ORDER FORMS ######

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


// Display Bottle Deposit quantity input
const bottle_deposit_switch = document.getElementById('has_bottle_deposit_order_form');
const bottle_deposit_quantity = document.getElementById('bottle-deposit-quantity');

function show_hide_bottle_deposit_quantity() {
    if (bottle_deposit_switch && bottle_deposit_quantity) {
        if (bottle_deposit_switch.checked) {
            bottle_deposit_quantity.classList.remove('invisible');
        } else {
            bottle_deposit_quantity.classList.add('invisible');
        }
    }
}

// Initially show or hide bottle deposit quantity input
show_hide_bottle_deposit_quantity();

// Add event listener to show or hide bottle deposit quantity input
if (bottle_deposit_switch) {
    bottle_deposit_switch.addEventListener('change', (event) => {
        show_hide_bottle_deposit_quantity();
    });
}


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


// ### Display order form when "Add another" button is clicked
// Save the state in sessionStorage
const btn_add_another = document.getElementById('btn-add-another');
if (btn_add_another) {
    btn_add_another.addEventListener('click', (event) => {
        sessionStorage.setItem("show_form", "show");
    });
}

// Display order form if the state is saved in sessionStorage
if (sessionStorage.getItem("show_form") === "show") {
    const order_form = document.getElementById('collapse-order-form');
    if (order_form) {
        order_form.classList.add('show');
    }
    sessionStorage.setItem("show_form", "");
}

// Add decimals to book price
const book_price = document.getElementById('id_book_price');
if (book_price) {
    book_price.addEventListener('change', (event) => {
        if (book_price.value >= 100 && book_price.value % 2 === 0) {
            book_price.value /= 100;
        }
        book_price.value = parseFloat(book_price.value).toFixed(2);
    });
}