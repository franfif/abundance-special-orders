import {addButtonEvents} from './orders/order_snippets' ;

const order_filter_form_fields = $('.order-filter .form-select, .order-filter input')
const eventType = {'text': 'keyup', 'select-one': 'change', 'radio': 'change'};

// Save initial form data for when filters are reset
// If the page is a customer order page
if (origin === "customer-order" && sessionStorage.getItem('initialCustomerOrderFormData') === null) {
    sessionStorage.setItem('initialCustomerOrderFormData', $('.order-filter').serialize());
}     // If the page is a regular order page
if (origin === "order" && sessionStorage.getItem('initialFormData') === null) {
    sessionStorage.setItem('initialFormData', $('.order-filter').serialize());
}


// Display filters when the page is loaded if shown before reload
try {
    if (sessionStorage.getItem('showFilters') === 'true') {
        $("#collapse-filters")[0].classList.add("show")
    } else {
        $("#collapse-filters")[0].classList.remove("show")
    }
} catch (e) {
}

// Call updateList function when the page is loaded
if (origin === "customer-order" || origin === "order") {
    updateList();
}

// Update the list of items based on the filter data
export function updateList() {
    let formData = sessionStorage.getItem('formData') || $('.order-filter').serialize();
    formData += sessionStorage.getItem('page') || '';

    // Ajax request to get updated list and change page content
    $.ajax({
        type: 'GET',
        url: 'filter/',
        data: formData,
        success: (response) => {
            // Replace the list of items from the server response
            $('.item-list').html(response.item_list_html);
            // Add events to pagination buttons
            addEventPaginationButtons();
            // Add previous and next steps buttons to the order snippets
            addButtonEvents();
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

// Associate each filter fields with actions
order_filter_form_fields.each(function () {
    // Prevent form submission when the Enter key is pressed
    this.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
    this.addEventListener(eventType[this.type], () => {
        if (this.type === 'radio') {
            // Save field name and id in sessionStorage to mark the field as checked when reloaded
            sessionStorage.setItem(this.name, this.id);
        } else {
            // Save field name and value in sessionStorage
            sessionStorage.setItem(this.name, this.value);
        }
        // Save form data in sessionStorage to keep the filters when the page is reloaded
        sessionStorage.setItem('formData', $('.order-filter').serialize());
        // Reinitialize the page number when a filter is updated
        sessionStorage.setItem('page', "");
        // Run updateList function when field is updated
        updateList();
    });
    if (this.type === 'radio') {
        // Mark the fields as checked when the page is reloaded
        if (sessionStorage.getItem(this.name) === this.id) {
            $('input[name=' + this.name + '][id=' + this.id + ']').prop("checked", "checked");
        }
    } else {
        // Keep the field value when the page is reloaded
        if (sessionStorage.getItem(this.name)) {
            this.value = sessionStorage.getItem(this.name);
        }
    }
});

function addEventPaginationButtons() {
    $('document').ready(function () {
        $('.btn-pagination ').click(function () {
            sessionStorage.setItem('page', "&" + this.dataset.page);
            updateList()
        });
    });
}


// Save filter display state in sessionStorage
$('#btn-show-filters').click(function (event) {
    const currentDisplay = sessionStorage.getItem('showFilters')
    sessionStorage.setItem('showFilters', currentDisplay === 'true' ? 'false' : 'true')
})

// Actions when the reset filters button is clicked
const btnResetFilters = $('#reset-order-filters')[0]
if (origin === "customer-order" || origin === "order") {
    btnResetFilters.addEventListener('click', function (event) {
    // Remove field state from sessionStorage
        order_filter_form_fields.each(resetFields)
        // Apply initial filters to formData
        if (origin === "customer-order") {
            sessionStorage['formData'] = sessionStorage.getItem('initialCustomerOrderFormData')
        } else {
            if (origin === "order"){
                sessionStorage['formData'] = sessionStorage.getItem('initialFormData')
            }
        }

            // Reinitialize the page number when filters are reset
            sessionStorage.setItem('page', "");
            // Run updateList function to reset the list
            updateList()
    });
}

// Remove field state from sessionStorage
function resetFields(index, field) {
    sessionStorage.removeItem(field.name);
}
