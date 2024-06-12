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

eval("const form_fields = $('.form-select, .filter input')\n\nfunction update_order_list() {\n    // Serialize the form data\n    const formData = $('.order-filter').serialize();\n\n    // Ajax request\n    $.ajax({\n        type: 'GET',\n        url: 'orders/filter/',\n        data: formData,\n        success: function (response) {\n            // Update the order list with the filtered orders\n            $('.order-list').html(response.orders_html);\n        },\n        error: function (error) {\n            console.error('Error:', error);\n        }\n    });\n}\n\n\nfor (const field of form_fields) {\n    // Prevent form submission when the Enter key is pressed\n    field.addEventListener('keydown', (event) => {\n        if (event.key === 'Enter') {\n            event.preventDefault();\n        }\n    });\n\n    if (field.type === 'text') {\n        // Update order list when text is typed into a text field\n        field.addEventListener('keyup', (event) => {\n            update_order_list()\n        });\n    } else {\n        // Update order list when the value of another form field changes\n        field.addEventListener('change', (event) => {\n            update_order_list()\n        });\n    }\n}\n\n\n//# sourceURL=webpack://special_orders/./assets/scripts/filters.js?");

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