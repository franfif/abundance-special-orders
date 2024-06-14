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

eval("const filter_form_fields = $('.filter .form-select, .filter input')\nconst eventType = {'text': 'keyup', 'select-one': 'change', 'radio': 'change'};\n\nfunction updateList() {\n    // Serialize the form data\n    const formData = $('.filter').serialize();\n\n    // Ajax request to get updated list and change page content\n    $.ajax({\n        type: 'GET',\n        url: 'filter/',\n        data: formData,\n        success: (response) => {\n            $('.item-list').html(response.item_list_html);\n        },\n        error: function (error) {\n            console.error('Error:', error);\n        }\n    });\n}\n\nfunction formFieldEvent(index, field) {\n    // Prevent form submission when the Enter key is pressed\n    field.addEventListener('keydown', (event) => {\n        if (event.key === 'Enter') {\n            event.preventDefault();\n        }\n    });\n    // Add updateList function to form fields\n    field.addEventListener(eventType[field.type], updateList);\n}\n\nfilter_form_fields.each(formFieldEvent)\n\n//# sourceURL=webpack://special_orders/./assets/scripts/filters.js?");

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