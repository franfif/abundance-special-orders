const order_cards = $('.order-card')
const form_fields = $('.form-select, .filter input')
const filter_values = {}


for (const field of form_fields) {
    // Initialize filter_values with the current values of the form fields
    update_filter_values(field)

    // Update filter_values when the value of a form field changes
    field.addEventListener('change', (event) => {
        update_filter_values(field)
        filterOrders()
    });
}


// Update filter_values with the current values of the form fields
function update_filter_values(field) {
    if (field.type === 'select-one' || (field.type === 'radio' && field.checked)) {
        filter_values[field.name] = field.value
    }
}


// Filter orders based on the values of the form fields
function filterOrders() {
    jQuery.each(order_cards, function (index, card) {
        let show = true
        for (const field of form_fields) {
            if (show) {
                const card_field = (card.getAttribute('data-' + field.name) || '').toLowerCase();
                const filter_field = (filter_values[field.name] || '').toLowerCase()

                const field_is_same_as_card = card_field === filter_field
                const field_is_empty = !filter_values[field.name];

                show = field_is_empty || field_is_same_as_card
            }
        }

        if (show) {
            card.classList.remove('visually-hidden')
        } else {
            card.classList.add('visually-hidden')
        }
    });
}