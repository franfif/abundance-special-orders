const order_cards = $('.order-card')
const form_fields = $('.form-select, .filter input')
const filter_values = {}

const form = $('.order-filter')[0]
form.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
    }
});


for (const field of form_fields) {
    // Initialize filter_values with the current values of the form fields
    update_filter_values(field)

    if (field.type === 'text') {
        // Update filter_values when text is typed into a text field
        field.addEventListener('keyup', (event) => {
            update_filter_values(field)
            filterOrders()
        });
    } else {
        // Update filter_values when the value of a form field changes
        field.addEventListener('change', (event) => {
            update_filter_values(field)
            filterOrders()
        });
    }
}

// Initial filter
filterOrders()


// Update filter_values with the current values of the form fields
function update_filter_values(field) {
    if (field.type === 'select-one' || field.type === 'text' || (field.type === 'radio' && field.checked)) {
        filter_values[field.name] = field.value
    }
}


// Filter orders based on the values of the form fields
function filterOrders() {
    jQuery.each(order_cards, function (index, card) {
        let show = true
        for (const field of form_fields) {
            if (show) {
                if (field.type === "text") {
                    const name = (card.querySelector('.customer-name')?.textContent || '').toLowerCase();
                    const company = (card.querySelector('.customer-company')?.textContent || '').toLowerCase();
                    const email = (card.querySelector('.customer-email')?.textContent || '').toLowerCase();
                    const phoneNumber = (card.querySelector('.customer-phone').textContent.match(/\d+/g) || '')?.join('');

                    // Get the filter value
                    const filter_value = (filter_values[field.name] || '').toLowerCase();
                    const filter_value_digits = filter_value.match(/\d+/g)?.join('');

                    // Check if the filter value is in any of the item's fields
                    const field_is_in_item = name.includes(filter_value) || company.includes(filter_value) || email.includes(filter_value) || phoneNumber.includes(filter_value_digits);
                    const field_is_empty = !filter_values[field.name];

                    show = field_is_empty || field_is_in_item;
                } else {
                    const card_field = (card.getAttribute('data-' + field.name) || '').toLowerCase();
                    const filter_field = (filter_values[field.name] || '').toLowerCase()

                    const field_is_same_as_card = card_field === filter_field
                    const field_is_empty = !filter_values[field.name];

                    show = field_is_empty || field_is_same_as_card
                }
            }
        }

        if (show) {
            card.classList.remove('visually-hidden')
        } else {
            card.classList.add('visually-hidden')
        }
    });
}