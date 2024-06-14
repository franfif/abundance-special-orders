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

eval("const order_filter_form_fields = $('.order-filter .form-select, .order-filter input')\nconst customer_filter_form_fields = $('.customer-filter .form-select, .customer-filter input')\n\nfunction update_list(formData, update_function) {\n    // Ajax request\n    $.ajax({\n        type: 'GET',\n        url: 'filter/',\n        data: formData,\n        success: update_function,\n        error: function (error) {\n            console.error('Error:', error);\n        }\n    });\n}\n\nfunction eventUpdateOrderList() {\n    // Serialize the form data\n    const formData = $('.order-filter').serialize();\n\n    // Callback function to update the order list\n    function update_order_list(response) {\n        $('.order-list').html(response.orders_html);\n    }\n\n    update_list(formData, update_order_list)\n}\n\nfunction eventUpdateCustomerList() {\n    // Serialize the form data\n    const formData = $('.customer-filter').serialize();\n\n    // Callback function to update the customer list\n    function update_customer_list(response) {\n        $('.customer-list').html(response.customers_html);\n    }\n\n    update_list(formData, update_customer_list)\n}\n\nfor (const field of order_filter_form_fields) {\n    // Prevent form submission when the Enter key is pressed\n    field.addEventListener('keydown', (event) => {\n        if (event.key === 'Enter') {\n            event.preventDefault();\n        }\n    });\n    if (field.type === 'text') {\n        // Update order list when text is typed into a text field\n        field.addEventListener('keyup', (event) => {\n            eventUpdateOrderList()\n        });\n    } else {\n        // Update order list when the value of another form field changes\n        field.addEventListener('change', (event) => {\n            eventUpdateOrderList()\n        });\n    }\n\n}\n\nfor (const field of customer_filter_form_fields) {\n    // Prevent form submission when the Enter key is pressed\n    field.addEventListener('keydown', (event) => {\n        if (event.key === 'Enter') {\n            event.preventDefault();\n        }\n    });\n    if (field.type === 'text') {\n        // Update customer list when text is typed into a text field\n        field.addEventListener('keyup', (event) => {\n            eventUpdateCustomerList()\n        });\n    } else {\n        // Update customer list when the value of another form field changes\n        field.addEventListener('change', (event) => {\n            eventUpdateCustomerList()\n        });\n    }\n}\n\n\n//# sourceURL=webpack://special_orders/./assets/scripts/filters.js?");

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