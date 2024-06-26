import {getCookie} from "./utils";

const filter_form_fields = $('.filter .form-select, .filter input')
const eventType = {'text': 'keyup', 'select-one': 'change', 'radio': 'change'};

function updateList(event, reset = false) {
    let formData = '';
    // console.log('reset:', reset)
    // Serialize the form data
    reset ? formData = reset_order_filters() : formData = $('.filter').serialize();
    // console.log('formData:', formData)

    // Ajax request to get updated list and change page content
    $.ajax({
        type: 'GET',
        url: 'filter/',
        data: formData,
        success: (response) => {
            $('.item-list').html(response.item_list_html);
            // Save the filters to the session
            $.ajax({
                type: 'POST',
                url: 'save_filters/',
                data: formData,
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'Content-Type': 'application/json'
                },
                success: () => console.log('Filters saved to session.'),
                error: (error) => console.error('Error saving filters:', error)
            });
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

function reset_order_filters() {
    // Reset all form fields to their default values
    return "vendor=&status=&customer_full_info=&has_bottle_deposit=&paid=&is_stand_by=&is_cancelled=false"
}

function resetFormFields() {
    // Reset all form fields to their default values
    filter_form_fields.each((index, field) => {
        field.removeAttribute("checked")
        // console.log("field:", field)
        // console.log("field.value:", field.value)
        if (field.id === "id_is_cancelled_2") {
            field.setAttribute("checked", true);
        } else {
            if ((field.value === null || field.value === "") && field.name !== "is_cancelled") {
                field.setAttribute("checked", true)
                field.checked = true;
                console.log(field.name, "value: ", field.value)
            }
            if (field.type === 'select-one' || field.type === 'text') {
                field.value = "";
            }
        }
    });
}

document.getElementById('reset-filters').addEventListener('click', (event) => {
    console.log("event ok")
    resetFormFields();
    updateList(event, true);
});