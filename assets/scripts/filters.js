const filter_form_fields = $('.filter .form-select, .filter input')
const eventType = {'text': 'keyup', 'select-one': 'change', 'radio': 'change'};

function updateList() {
    // Serialize the form data
    const formData = $('.filter').serialize();

    // Ajax request to get updated list and change page content
    $.ajax({
        type: 'GET',
        url: 'filter/',
        data: formData,
        success: (response) => {
            $('.item-list').html(response.item_list_html);
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

function formFieldEvent(index, field) {
    // Prevent form submission when the Enter key is pressed
    field.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
    // Add updateList function to form fields
    field.addEventListener(eventType[field.type], updateList);
}

filter_form_fields.each(formFieldEvent)