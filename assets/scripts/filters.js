const order_filter_form_fields = $('.order-filter .form-select, .order-filter input')
const customer_filter_form_fields = $('.customer-filter .form-select, .customer-filter input')

function update_list(formData, update_function) {
    // Ajax request
    $.ajax({
        type: 'GET',
        url: 'filter/',
        data: formData,
        success: update_function,
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

function eventUpdateOrderList() {
    // Serialize the form data
    const formData = $('.order-filter').serialize();

    // Callback function to update the order list
    function update_order_list(response) {
        $('.order-list').html(response.orders_html);
    }

    update_list(formData, update_order_list)
}

function eventUpdateCustomerList() {
    // Serialize the form data
    const formData = $('.customer-filter').serialize();

    // Callback function to update the customer list
    function update_customer_list(response) {
        $('.customer-list').html(response.customers_html);
    }

    update_list(formData, update_customer_list)
}

for (const field of order_filter_form_fields) {
    // Prevent form submission when the Enter key is pressed
    field.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
    if (field.type === 'text') {
        // Update order list when text is typed into a text field
        field.addEventListener('keyup', (event) => {
            eventUpdateOrderList()
        });
    } else {
        // Update order list when the value of another form field changes
        field.addEventListener('change', (event) => {
            eventUpdateOrderList()
        });
    }

}

for (const field of customer_filter_form_fields) {
    // Prevent form submission when the Enter key is pressed
    field.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
    if (field.type === 'text') {
        // Update customer list when text is typed into a text field
        field.addEventListener('keyup', (event) => {
            eventUpdateCustomerList()
        });
    } else {
        // Update customer list when the value of another form field changes
        field.addEventListener('change', (event) => {
            eventUpdateCustomerList()
        });
    }
}
