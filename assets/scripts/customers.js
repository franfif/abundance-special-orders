import {getCookie} from "./utils";
import {updateList} from "./customer_filters";

const btn_add_customer = document.getElementById('btn-add-customer');
if (btn_add_customer) {
    btn_add_customer.addEventListener('click', (event) => {
        const element = document.getElementById("fa-btn-add-customer");  // Get the DIV element

        if (btn_add_customer.getAttribute('aria-expanded') === 'true') {
            element.classList.remove("fa-circle-plus");
            element.classList.add("fa-circle-minus");
        } else {
            element.classList.remove("fa-circle-minus");
            element.classList.add("fa-circle-plus");
        }
    });
}



const btn_display_cards = document.getElementById('display-cards');
if (btn_display_cards) {
    btn_display_cards.addEventListener('click', (event) => {
        const csrftoken = getCookie('csrftoken');
        $.ajax({
            type: 'POST',
            headers: {
            'X-CSRFToken': csrftoken,
            'Content-Type': 'application/json'
            },
            url: 'display_cards/',
            success: () => {
                updateCustomerList();
            },
            error: function (error) {
                console.log('error');
            }
       })
    });
}

const btn_display_list = document.getElementById('display-list');
if (btn_display_list) {
    btn_display_list.addEventListener('click', (event) => {
        const csrftoken = getCookie('csrftoken');
        $.ajax({
            type: 'POST',
            headers: {
            'X-CSRFToken': csrftoken,
            'Content-Type': 'application/json'
            },
            url: 'display_list/',
            success: (data) => {
                updateCustomerList();
            },
            error: function (error) {
                console.log('error');
            }
       })
    });
}
