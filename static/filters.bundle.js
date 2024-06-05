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

eval("const order_cards = $('.order-card')\nconst form_fields = $('.form-select, .filter input')\nconst filter_values = {}\n\n\nfor (const field of form_fields) {\n    // Initialize filter_values with the current values of the form fields\n    update_filter_values(field)\n\n    // Update filter_values when the value of a form field changes\n    field.addEventListener('change', (event) => {\n        update_filter_values(field)\n        filterOrders()\n    });\n}\n\n// Initial filter\nfilterOrders()\n\n\n// Update filter_values with the current values of the form fields\nfunction update_filter_values(field) {\n    if (field.type === 'select-one' || (field.type === 'radio' && field.checked)) {\n        filter_values[field.name] = field.value\n    }\n}\n\n\n// Filter orders based on the values of the form fields\nfunction filterOrders() {\n    jQuery.each(order_cards, function (index, card) {\n        let show = true\n        for (const field of form_fields) {\n            if (show) {\n                const card_field = (card.getAttribute('data-' + field.name) || '').toLowerCase();\n                const filter_field = (filter_values[field.name] || '').toLowerCase()\n\n                const field_is_same_as_card = card_field === filter_field\n                const field_is_empty = !filter_values[field.name];\n\n                show = field_is_empty || field_is_same_as_card\n            }\n        }\n\n        if (show) {\n            card.classList.remove('visually-hidden')\n        } else {\n            card.classList.add('visually-hidden')\n        }\n    });\n}\n\n//# sourceURL=webpack://special_orders/./assets/scripts/filters.js?");

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