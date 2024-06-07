const order_cards = $('.order-card')
const form_fields = $('.form-select, .filter input')
const filter_values = {}

// $('.order-filter').on('submit', function (event) {
function update_order_list() {
    // Prevent default form submission
    // event.preventDefault();
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


// ######## OBSOLETE CODE - JAVASCRIPT VERSION OF FILTERS ########
// // Update filter_values with the current values of the form fields
// function update_filter_values(field) {
//     if (field.type === 'select-one' || field.type === 'text' || (field.type === 'radio' && field.checked)) {
//         filter_values[field.name] = field.value
//     }
// }
//
//
// // Filter orders based on the values of the form fields
// function filterOrders() {
//     jQuery.each(order_cards, function (index, card) {
//         let show = true
//         for (const field of form_fields) {
//             if (show) {
//                 if (field.type === "text") {
//                     const name = (card.querySelector('.customer-name')?.textContent || '').toLowerCase();
//                     const company = (card.querySelector('.customer-company')?.textContent || '').toLowerCase();
//                     const email = (card.querySelector('.customer-email')?.textContent || '').toLowerCase();
//                     const phoneNumber = (card.querySelector('.customer-phone').textContent.match(/\d+/g) || '')?.join('');
//
//                     // Check if the field is empty
//                     show = !filter_values[field.name];
//
//                     // Get the filter values
//                     const filter_value_texts = (filter_values[field.name] || '').toLowerCase().split(' ');
//                     const filter_value_digits = (filter_values[field.name]).match(/\d+/g)?.join('');
//                     const phone_number_is_in_item = phoneNumber.includes(filter_value_digits);
//
//                     // Check if the filter value is in any of the item's text fields
//                     for (const filter_value of filter_value_texts) {
//                         show = show || name.includes(filter_value) || company.includes(filter_value) || email.includes(filter_value);
//                     }
//
//
//                     show = show || phone_number_is_in_item;
//                 } else {
//                     const card_field = (card.getAttribute('data-' + field.name) || '').toLowerCase();
//                     const filter_field = (filter_values[field.name] || '').toLowerCase()
//
//                     const field_is_same_as_card = card_field === filter_field
//                     const field_is_empty = !filter_values[field.name];
//
//                     show = field_is_empty || field_is_same_as_card
//                 }
//             }
//         }
//
//         if (show) {
//             card.classList.remove('visually-hidden')
//         } else {
//             card.classList.add('visually-hidden')
//         }
//     });
// }
// ######## END ########