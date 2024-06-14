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