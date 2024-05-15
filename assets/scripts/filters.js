// const filter_order_vendor = $('#id_vendor')[0]
// const filter_order_customer = $('#id_customer_full_info')[0]
// const filter_order_status = $('#id_status')[0]
// const filter_order_bottle_deposit = $('#id_has_bottle_deposit')[0]
// const filter_order_paid = $('#id_paid')[0]
// const filter_order_stand_by = $('#id_is_stand_by')[0]
// const filter_order_cancelled = $('#id_is_cancelled')[0]

const order_cards = $('.order-card')
const form_fields = $('.form-select, .filter input')
console.log("form_fields: ", form_fields)
const filter_values = {}
for (const field of form_fields) {
    filter_values[field.name] = field.value
}

// console.log("order_cards: ", order_cards)
// if one of these filter fields is updated/changed, only show the orders that match the filter
for (const field of form_fields) {

    field.addEventListener('change', (event) => {
        filter_values[field.name] = field.value
        filterOrders()
    });
}

function filterOrders() {
    // console.log("vendorId: ", vendorId)
    console.log("order_cards: ", order_cards)
    console.log("form_fields: ", form_fields)
    jQuery.each(order_cards, function (index, card) {
        console.log("card: ", card)
        // console.log("order.dataset.vendorId: ", card.dataset.vendorId)
        // console.log(vendorId)
        let show = true
        for (const field of form_fields) {
            if (show) {
                console.log('data-' + field.name + ': ', card.getAttribute('data-' + field.name))
                console.log("filter_values[" + field.name + "]: ", filter_values[field.name])
                // const field_is_different_from_card = card.getAttribute('data-' + field.name) !== filter_values[field.name]
                let card_field = card.getAttribute('data-' + field.name)
                if (typeof card_field === "string") {
                    card_field = card_field.toLowerCase()
                }
                const filter_field = filter_values[field.name]

                const field_is_same_as_card = card_field === filter_field
                console.log("field_is_same_as_card: ", field_is_same_as_card)
                // const field_is_not_null = filter_values[field.name] !== '' && filter_values[field.name] !== null && filter_values[field.name] !== undefined
                const field_is_empty = filter_values[field.name] === '' || filter_values[field.name] === null || filter_values[field.name] === undefined || filter_values[field.name] === "false"
                console.log("filter_values[field] is null: ", field_is_empty)
                show = field_is_empty || field_is_same_as_card
                console.log("show: ", show)
            }
        }

        if (show) {
            card.classList.remove('visually-hidden')
        } else {
            card.classList.add('visually-hidden')
        }
        console.log("card.classList: ", card.classList)
    });
    // for (const order in order_cards) {
    //     console.log("order: ", order)
    //     console.log("order.dataset.vendorId: ", order.dataset.vendorId)
    //     console.log(vendorId)
    //     if (order.dataset.vendorId !== vendorId) {
    //         console.log("different")
    //     } else {
    //         console.log("same")
    //     }
    // }

    // const vendor = filter_order_vendor ? filter_order_vendor.value : ''
    // const customer = filter_order_customer ? filter_order_customer.value : ''
    // const status = filter_order_status ? filter_order_status.value : ''
    // const bottle_deposit = filter_order_bottle_deposit ? filter_order_bottle_deposit.checked : ''
    // const paid = filter_order_paid ? filter_order_paid.checked : ''
    // const stand_by = filter_order_stand_by ? filter_order_stand_by.checked : ''
    // const cancelled = filter_order_cancelled ? filter_order_cancelled.checked : ''
    //
    // const orders = document.querySelectorAll('.order-snippet')
    //
    // for (const order of orders) {
    //     const vendor_match = vendor === '' || order.dataset.vendor === vendor
    //     const customer_match = customer === '' || order.dataset.customer === customer
    //     const status_match = status === '' || order.dataset.status === status
    //     const bottle_deposit_match = bottle_deposit === '' || order.dataset.bottleDeposit === bottle_deposit
    //     const paid_match = paid === '' || order.dataset.paid === paid
    //     const stand_by_match = stand_by === '' || order.dataset.standBy === stand_by
    //     const cancelled_match = cancelled === '' || order.dataset.cancelled === cancelled
    //
    //     if (vendor_match && customer_match && status_match && bottle_deposit_match && paid_match && stand_by_match && cancelled_match) {
    //         order.classList.remove('visually-hidden')
    //     } else {
    //         order.classList.add('visually-hidden')
    //     }
    // }
}