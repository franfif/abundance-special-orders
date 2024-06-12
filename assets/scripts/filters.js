const form_fields = $('.form-select, .filter input')

function update_order_list() {
    // Serialize the form data
    const formData = $('.order-filter').serialize();

    // Ajax request
    $.ajax({
        type: 'GET',
        url: 'orders/filter/',
        data: formData,
        success: function (response) {
            // Update the order list with the filtered orders
            $('.order-list').html(response.orders_html);
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}


for (const field of form_fields) {
    // Prevent form submission when the Enter key is pressed
    field.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });

    if (field.type === 'text') {
        // Update order list when text is typed into a text field
        field.addEventListener('keyup', (event) => {
            update_order_list()
        });
    } else {
        // Update order list when the value of another form field changes
        field.addEventListener('change', (event) => {
            update_order_list()
        });
    }
}
