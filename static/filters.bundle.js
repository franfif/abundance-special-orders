/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/scripts/filters.js":
/*!***********************************!*\
  !*** ./assets/scripts/filters.js ***!
  \***********************************/
/***/ (() => {

eval("const order_cards = $('.order-card')\nconst form_fields = $('.form-select, .filter input')\nconst filter_values = {}\n\n// $('.order-filter').on('submit', function (event) {\nfunction update_order_list() {\n    // Prevent default form submission\n    // event.preventDefault();\n    // Serialize the form data\n    const formData = $('.order-filter').serialize();\n\n    // Ajax request\n    $.ajax({\n        type: 'GET',\n        url: 'orders/filter/',\n        data: formData,\n        success: function (response) {\n            // Update the order list with the filtered orders\n            $('.order-list').html(response.orders_html);\n        },\n        error: function (error) {\n            console.error('Error:', error);\n        }\n    });\n}\n\n\nfor (const field of form_fields) {\n    // Prevent form submission when the Enter key is pressed\n    field.addEventListener('keydown', (event) => {\n        if (event.key === 'Enter') {\n            event.preventDefault();\n        }\n    });\n\n    if (field.type === 'text') {\n        // Update order list when text is typed into a text field\n        field.addEventListener('keyup', (event) => {\n            update_order_list()\n        });\n    } else {\n        // Update order list when the value of another form field changes\n        field.addEventListener('change', (event) => {\n            update_order_list()\n        });\n    }\n}\n\n\n// ######## OBSOLETE CODE - JAVASCRIPT VERSION OF FILTERS ########\n// // Update filter_values with the current values of the form fields\n// function update_filter_values(field) {\n//     if (field.type === 'select-one' || field.type === 'text' || (field.type === 'radio' && field.checked)) {\n//         filter_values[field.name] = field.value\n//     }\n// }\n//\n//\n// // Filter orders based on the values of the form fields\n// function filterOrders() {\n//     jQuery.each(order_cards, function (index, card) {\n//         let show = true\n//         for (const field of form_fields) {\n//             if (show) {\n//                 if (field.type === \"text\") {\n//                     const name = (card.querySelector('.customer-name')?.textContent || '').toLowerCase();\n//                     const company = (card.querySelector('.customer-company')?.textContent || '').toLowerCase();\n//                     const email = (card.querySelector('.customer-email')?.textContent || '').toLowerCase();\n//                     const phoneNumber = (card.querySelector('.customer-phone').textContent.match(/\\d+/g) || '')?.join('');\n//\n//                     // Check if the field is empty\n//                     show = !filter_values[field.name];\n//\n//                     // Get the filter values\n//                     const filter_value_texts = (filter_values[field.name] || '').toLowerCase().split(' ');\n//                     const filter_value_digits = (filter_values[field.name]).match(/\\d+/g)?.join('');\n//                     const phone_number_is_in_item = phoneNumber.includes(filter_value_digits);\n//\n//                     // Check if the filter value is in any of the item's text fields\n//                     for (const filter_value of filter_value_texts) {\n//                         show = show || name.includes(filter_value) || company.includes(filter_value) || email.includes(filter_value);\n//                     }\n//\n//\n//                     show = show || phone_number_is_in_item;\n//                 } else {\n//                     const card_field = (card.getAttribute('data-' + field.name) || '').toLowerCase();\n//                     const filter_field = (filter_values[field.name] || '').toLowerCase()\n//\n//                     const field_is_same_as_card = card_field === filter_field\n//                     const field_is_empty = !filter_values[field.name];\n//\n//                     show = field_is_empty || field_is_same_as_card\n//                 }\n//             }\n//         }\n//\n//         if (show) {\n//             card.classList.remove('visually-hidden')\n//         } else {\n//             card.classList.add('visually-hidden')\n//         }\n//     });\n// }\n// ######## END ########\n\n//# sourceURL=webpack://special_orders/./assets/scripts/filters.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./assets/scripts/filters.js"]();
/******/ 	
/******/ })()
;