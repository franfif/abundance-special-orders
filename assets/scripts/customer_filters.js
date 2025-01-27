
const customer_filter_form_fields = $('.customer-filter .form-select, .order-filter input')
const customer_eventType = {'text': 'keyup', 'select-one': 'change', 'radio': 'change'};

// Save initial form data for when filters are reset
if (origin === "customer" && sessionStorage.getItem('initialCustomerFormData') === null) {
    sessionStorage.setItem('initialCustomerFormData', $('.customer-filter').serialize());
}

// Call updateList function when the page is loaded
if (origin === "customer") {
    updateCustomerList();
}

// Update the list of items based on the filter data
export function updateCustomerList() {
    let customerFormData = sessionStorage.getItem('customerFormData') || $('.customer-filter').serialize();
    customerFormData += sessionStorage.getItem('page') || '';
    // Ajax request to get updated list and change page content
    $.ajax({
        type: 'GET',
        url: 'filter/',
        data: customerFormData,
        success: (response) => {
            // Replace the list of items from the server response
            $('.item-list').html(response.item_list_html);
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}


// Associate each filter fields with actions
customer_filter_form_fields.each(function () {
    // Prevent form submission when the Enter key is pressed
    this.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
    this.addEventListener(customer_eventType[this.type], () => {
        if (this.type === 'radio') {
            // Save field name and id in sessionStorage to mark the field as checked when reloaded
            sessionStorage.setItem(this.name, this.id);
        } else {
            // Save field name and value in sessionStorage
            sessionStorage.setItem(this.name, this.value);
        }
        // Save form data in sessionStorage to keep the filters when the page is reloaded
        sessionStorage.setItem('customerFormData', $('.customer-filter').serialize());
        // Reinitialize the page number when a filter is updated
        sessionStorage.setItem('page', "");
        // Run updateCustomerList function when field is updated
        updateCustomerList();
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
            updateCustomerList()
        });
    });
}

// Actions when the reset filters button is clicked
const btnResetFilters = $('#reset-filters')[0]
if (origin === "customer") {
    btnResetFilters.addEventListener('click', function (event) {
        // Remove field state from sessionStorage
        customer_filter_form_fields.each(resetFields)
        // Apply initial filters to formData
            sessionStorage['CustomerFormData'] = sessionStorage.getItem('initialCustomerFormData')
    //    } else {
    //        sessionStorage['formData'] = sessionStorage.getItem('initialFormData')
    //    }
        // Reinitialize the page number when filters are reset
        sessionStorage.setItem('page', "");
        // Run updateCustomerList function to reset the list
        updateCustomerList()

    });
}

// Remove field state from sessionStorage
function resetFields(index, field) {
    sessionStorage.removeItem(field.name);
}
