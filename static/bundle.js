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

/***/ "./assets/scripts/customers.js":
/*!*************************************!*\
  !*** ./assets/scripts/customers.js ***!
  \*************************************/
/***/ (() => {

eval("const btn_add_customer = document.getElementById('btn-add-customer');\nif (btn_add_customer) {\n    btn_add_customer.addEventListener('click', (event) => {\n        const element = document.getElementById(\"fa-btn-add-customer\");  // Get the DIV element\n\n        if (btn_add_customer.getAttribute('aria-expanded') === 'true') {\n            element.classList.remove(\"fa-circle-plus\");\n            element.classList.add(\"fa-circle-minus\");\n        } else {\n            element.classList.remove(\"fa-circle-minus\");\n            element.classList.add(\"fa-circle-plus\");\n        }\n    });\n}\n\n//# sourceURL=webpack://special_orders/./assets/scripts/customers.js?");

/***/ }),

/***/ "./assets/scripts/filters.js":
/*!***********************************!*\
  !*** ./assets/scripts/filters.js ***!
  \***********************************/
/***/ (() => {

eval("const filter_form_fields = $('.filter .form-select, .filter input')\nconst eventType = {'text': 'keyup', 'select-one': 'change', 'radio': 'change'};\n\n// Save initial form data for when filters are reset\n// If the page is a customer order page\nif (origin === \"customer\" && sessionStorage.getItem('initialCustomerFormData') === null) {\n    sessionStorage.setItem('initialCustomerFormData', $('.filter').serialize());\n} else {\n    // If the page is a regular order page\n    if (sessionStorage.getItem('initialFormData') === null) {\n        sessionStorage.setItem('initialFormData', $('.filter').serialize());\n    }\n}\n\n// Display filters when the page is loaded if shown before reload\nif (sessionStorage.getItem('showFilters') === 'true') {\n    $(\"#collapse-filters\")[0].classList.add(\"show\")\n} else {\n    $(\"#collapse-filters\")[0].classList.remove(\"show\")\n}\n\n// Call updateList function when the page is loaded\nupdateList();\n\n// Update the list of items based on the filter data\nfunction updateList() {\n    const formData = sessionStorage.getItem('formData') || $('.filter').serialize();\n\n    // Ajax request to get updated list and change page content\n    $.ajax({\n        type: 'GET',\n        url: 'filter/',\n        data: formData,\n        success: (response) => {\n            // Replace the list of items from the server response\n            $('.item-list').html(response.item_list_html);\n        },\n        error: function (error) {\n            console.error('Error:', error);\n        }\n    });\n}\n\n// Associate each filter fields with actions\nfilter_form_fields.each(function () {\n    // Prevent form submission when the Enter key is pressed\n    this.addEventListener('keydown', (event) => {\n        if (event.key === 'Enter') {\n            event.preventDefault();\n        }\n    });\n    this.addEventListener(eventType[this.type], () => {\n        // Save field name and id in sessionStorage to mark the field as checked when reloaded\n        sessionStorage.setItem(this.name, this.id);\n        // Save form data in sessionStorage to keep the filters when the page is reloaded\n        sessionStorage.setItem('formData', $('.filter').serialize());\n        // Run updateList function when field is updated\n        updateList();\n    });\n    // Mark the fields as checked when the page is reloaded\n    if (sessionStorage.getItem(this.name) === this.id) {\n        $('input[name=' + this.name + '][id=' + this.id + ']').prop(\"checked\", \"checked\");\n    }\n});\n\n\n// Save filter display state in sessionStorage\nconst btnShowFilters = $('#btn-show-filters')[0]\nbtnShowFilters.addEventListener('click', function (event) {\n    const currentDisplay = sessionStorage.getItem('showFilters')\n    sessionStorage.setItem('showFilters', currentDisplay === 'true' ? 'false' : 'true')\n})\n\n// Actions when the reset filters button is clicked\nconst btnResetFilters = $('#reset-filters')[0]\nbtnResetFilters.addEventListener('click', function (event) {\n    // Remove field state from sessionStorage\n    filter_form_fields.each(resetFields)\n    // Apply initial filters to formData\n    if (origin === \"customer\") {\n        sessionStorage['formData'] = sessionStorage.getItem('initialCustomerFormData')\n    } else {\n        sessionStorage['formData'] = sessionStorage.getItem('initialFormData')\n    }\n    // Run updateList function to reset the list\n    updateList()\n});\n\n// Remove field state from sessionStorage\nfunction resetFields(index, field) {\n    sessionStorage.removeItem(field.name);\n}\n\n\n//# sourceURL=webpack://special_orders/./assets/scripts/filters.js?");

/***/ }),

/***/ "./assets/scripts/index.js":
/*!*********************************!*\
  !*** ./assets/scripts/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jquery_dirty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery.dirty */ \"./node_modules/jquery.dirty/dist/jquery.dirty.js\");\n/* harmony import */ var jquery_dirty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery_dirty__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _orders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./orders */ \"./assets/scripts/orders.js\");\n/* harmony import */ var _customers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customers */ \"./assets/scripts/customers.js\");\n/* harmony import */ var _customers__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_customers__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _filters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./filters */ \"./assets/scripts/filters.js\");\n/* harmony import */ var _filters__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_filters__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ \"./assets/scripts/utils.js\");\n\n// import {getCookie} from './utils';\n\n\n\n\n\n\n// Initialize tooltips\nconst tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle=\"tooltip\"]'));\nconst tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {\n    return new bootstrap.Tooltip(tooltipTriggerEl);\n});\n\n\n// Display alert message when user leaves the page with unsaved changes\n$(\"form.form\").dirty({\n    preventLeaving: true,\n});\n\n\n\n\n//# sourceURL=webpack://special_orders/./assets/scripts/index.js?");

/***/ }),

/***/ "./assets/scripts/orders.js":
/*!**********************************!*\
  !*** ./assets/scripts/orders.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _orders_order_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./orders/order_forms */ \"./assets/scripts/orders/order_forms.js\");\n/* harmony import */ var _orders_order_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_orders_order_forms__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _orders_order_snippets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./orders/order_snippets */ \"./assets/scripts/orders/order_snippets.js\");\n\n\n\n//# sourceURL=webpack://special_orders/./assets/scripts/orders.js?");

/***/ }),

/***/ "./assets/scripts/orders/order_forms.js":
/*!**********************************************!*\
  !*** ./assets/scripts/orders/order_forms.js ***!
  \**********************************************/
/***/ (() => {

eval("// ###### ORDER FORMS ######\n\n// Display New Customer form\nconst btn_new_customer = document.getElementById('btn-new-customer');\nconst btn_existing_customer = document.getElementById('btn-existing-customer');\nconst new_customer_form = document.getElementById('new-customer-form');\nconst existing_customer_form = document.getElementById('existing-customer-form');\n\n// Create a new customer - Replace the customer search with the customer form\nif (btn_new_customer) {\n    btn_new_customer.addEventListener('click', (event) => {\n        new_customer_form.classList.remove('visually-hidden');\n        existing_customer_form.classList.add('visually-hidden');\n        btn_existing_customer.classList.add('btn-secondary');\n        btn_existing_customer.classList.remove('btn-primary');\n        btn_new_customer.classList.add('btn-primary');\n        btn_new_customer.classList.remove('btn-secondary');\n        $('#id_create_new_customer').val(true);\n    });\n}\n// Search for a customer - Replace the new customer form with the customer search\nif (btn_existing_customer) {\n    btn_existing_customer.addEventListener('click', (event) => {\n        existing_customer_form.classList.remove('visually-hidden');\n        new_customer_form.classList.add('visually-hidden');\n        btn_new_customer.classList.add('btn-secondary');\n        btn_new_customer.classList.remove('btn-primary');\n        btn_existing_customer.classList.add('btn-primary');\n        btn_existing_customer.classList.remove('btn-secondary');\n        $('#id_create_new_customer').val(false);\n    });\n}\n\n\n// Display Bottle Deposit quantity input\nconst bottle_deposit_switch = document.getElementById('has_bottle_deposit_order_form');\nconst bottle_deposit_quantity = document.getElementById('bottle-deposit-quantity');\n\nfunction show_hide_bottle_deposit_quantity() {\n    if (bottle_deposit_switch && bottle_deposit_quantity) {\n        if (bottle_deposit_switch.checked) {\n            bottle_deposit_quantity.classList.remove('invisible');\n        } else {\n            bottle_deposit_quantity.classList.add('invisible');\n        }\n    }\n}\n\n// Initially show or hide bottle deposit quantity input\nshow_hide_bottle_deposit_quantity();\n\n// Add event listener to show or hide bottle deposit quantity input\nif (bottle_deposit_switch) {\n    bottle_deposit_switch.addEventListener('change', (event) => {\n        show_hide_bottle_deposit_quantity();\n    });\n}\n\n\n// Display message when memo is required\nconst memo_required_toast = $('#memo-required-toast')[0]\nconst memo_required_toast_triggers = $('.memo_required_toast-btn')\nfor (const trigger of memo_required_toast_triggers) {\n    trigger.addEventListener('change', (e) => {\n        if (e.target.checked) {\n            const toast = new bootstrap.Toast(memo_required_toast)\n            toast.show()\n        }\n    });\n}\n\n\n// ### Display order form when \"Add another\" button is clicked\n// Save the state in sessionStorage\nconst btn_add_another = document.getElementById('btn-add-another');\nif (btn_add_another) {\n    btn_add_another.addEventListener('click', (event) => {\n        sessionStorage.setItem(\"show_form\", \"show\");\n    });\n}\n\n// Display order form if the state is saved in sessionStorage\nif (sessionStorage.getItem(\"show_form\") === \"show\") {\n    const order_form = document.getElementById('collapse-order-form');\n    if (order_form) {\n        order_form.classList.add('show');\n    }\n    sessionStorage.setItem(\"show_form\", \"\");\n}\n\n// Add decimals to book price\nconst book_price = document.getElementById('id_book_price');\nif (book_price) {\n    book_price.addEventListener('change', (event) => {\n        if (book_price.value >= 100 && book_price.value % 2 === 0) {\n            book_price.value /= 100;\n        }\n        book_price.value = parseFloat(book_price.value).toFixed(2);\n    });\n}\n\n//# sourceURL=webpack://special_orders/./assets/scripts/orders/order_forms.js?");

/***/ }),

/***/ "./assets/scripts/orders/order_snippets.js":
/*!*************************************************!*\
  !*** ./assets/scripts/orders/order_snippets.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./assets/scripts/utils.js\");\n// ####### ORDER SNIPPETS ######\n\n\n\n// More Info button content\nconst btns_order_more_info = document.getElementsByClassName('btn-order-more-info')\n\nfor (const btn of btns_order_more_info) {\n    btn.addEventListener('click', (event) => {\n        if (btn.getAttribute('aria-expanded') === 'true') {\n            btn.children[0].classList.add(\"fa-circle-chevron-up\");\n            btn.children[0].classList.remove(\"fa-circle-chevron-down\");\n        } else {\n            btn.children[0].classList.add(\"fa-circle-chevron-down\");\n            btn.children[0].classList.remove(\"fa-circle-chevron-up\");\n        }\n    });\n}\n\nfunction addButtonEvents() {\n    const previousStepButtons = $('.btn-previous-step');\n\n    for (const button of previousStepButtons) {\n        button.addEventListener('click', function () {\n            const orderId = this.dataset.orderId;\n            updateOrderStatus(orderId, 'previous_step');\n        });\n    }\n\n    const nextStepButtons = $('.btn-next-step');\n    for (const button of nextStepButtons) {\n        button.addEventListener('click', function () {\n            // Don't update an order to picked up if it is unpaid\n            if (this.dataset.nextStatus !== 'Picked-Up' || this.dataset.paid !== \"False\") {\n                const orderId = this.dataset.orderId;\n                updateOrderStatus(orderId, 'next_step');\n            }\n        });\n    }\n}\n\n// Add previous step and next step buttons to order snippets\ndocument.addEventListener('DOMContentLoaded', function () {\n    addButtonEvents();\n});\n\n\nfunction updateOrderStatus(orderId, action) {\n\n    const csrftoken = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getCookie)('csrftoken');\n\n    // Send AJAX request to update instance status\n    fetch(`/order_update_status/${orderId}/${action}/`, {\n        method: 'PUT',\n        headers: {\n            'X-CSRFToken': csrftoken,\n            'Content-Type': 'application/json'\n        },\n    })\n        .then(response => response.json())\n        .then(data => {\n            if (data.redirect) {\n                window.location.href = data.redirect;\n            } else {\n                $('#order-card-' + orderId).replaceWith(data.order);\n                addButtonEvents();\n            }\n        })\n        .catch(error => {\n            console.error('Error:', error);\n        });\n}\n\n//# sourceURL=webpack://special_orders/./assets/scripts/orders/order_snippets.js?");

/***/ }),

/***/ "./assets/scripts/utils.js":
/*!*********************************!*\
  !*** ./assets/scripts/utils.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getCookie: () => (/* binding */ getCookie)\n/* harmony export */ });\nfunction getCookie(name) {\n    let cookieValue = null;\n    if (document.cookie && document.cookie !== '') {\n        const cookies = document.cookie.split(';');\n        for (let i = 0; i < cookies.length; i++) {\n            const cookie = cookies[i].trim();\n            // Does this cookie string begin with the name we want?\n            if (cookie.substring(0, name.length + 1) === (name + '=')) {\n                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));\n                break;\n            }\n        }\n    }\n    return cookieValue;\n}\n\n\nfunction formatPhoneNumber(e) {\n    const x = e.target.value.replace(/\\D/g, '');\n    const n = x.length;\n\n    if (n <= 3) {\n        e.target.value = x;\n    } else if (n > 3 && n <= 7) {\n        e.target.value = x.slice(0, 3) + '-' + x.slice(3);\n    } else if (n > 7 && n <= 10) {\n        e.target.value = '(' + x.slice(0, 3) + ') ' + x.slice(3, 6) + '-' + x.slice(6);\n    } else if (n > 10) {\n        // Format long numbers like (123) 456-7890 ext 1234\n        e.target.value = '(' + x.slice(0, 3) + ') ' + x.slice(3, 6) + '-' + x.slice(6, 10) + ' ext ' + x.slice(10);\n    }\n}\n\nconst phone_field = $(\"#id_phone_number\")[0];\nif (phone_field) {\n    phone_field.addEventListener('input', formatPhoneNumber);\n    formatPhoneNumber({target: phone_field});\n}\n\n\n\n//# sourceURL=webpack://special_orders/./assets/scripts/utils.js?");

/***/ }),

/***/ "./node_modules/jquery.dirty/dist/jquery.dirty.js":
/*!********************************************************!*\
  !*** ./node_modules/jquery.dirty/dist/jquery.dirty.js ***!
  \********************************************************/
/***/ (() => {

eval("/*\n * Dirty \n * jquery plugin to detect when a form is modified\n * (c) 2016 Simon Reynolds - https://github.com/simon-reynolds/jquery.dirty\n * originally based on jquery.dirrty by Ruben Torres - https://github.com/rubentd/dirrty\n * Released under the MIT license\n */\n\n(function($) {\n\n    //Save dirty instances\n    var singleDs = [];\n    var dirty = \"dirty\";\n    var clean = \"clean\";\n    var dataInitialValue = \"dirtyInitialValue\";\n    var dataIsDirty = \"isDirty\";\n\n    var getSingleton = function(id) {\n        var result;\n        singleDs.forEach(function(e) {\n            if (e.id === id) {\n                result = e;\n            }\n        });\n        return result;\n    };\n\n    var setSubmitEvents = function(d) {\n        d.form.on(\"submit\", function() {\n            d.submitting = true;\n        });\n\n        if (d.options.preventLeaving) {\n            $(window).on(\"beforeunload\", function(event) {\n                if (d.isDirty && !d.submitting) {\n                    event.preventDefault();\n                    return d.options.leavingMessage;\n                }\n            });\n        }\n    };\n\n    var setNamespacedEvents = function(d) {\n\n        d.form.find(\"input, select, textarea\").on(\"change.dirty click.dirty keyup.dirty keydown.dirty blur.dirty\", function(e) {\n            d.checkValues(e);\n        });\n\n        d.form.on(\"dirty\", function() {\n            if (typeof d.options.onDirty !== \"function\") return;\n\n            d.options.onDirty();\n        });\n\n        d.form.on(\"clean\", function() {\n            if (typeof d.options.onClean !== \"function\") return;\n\n            d.options.onClean();\n        });\n    };\n\n    var clearNamespacedEvents = function(d) {\n        d.form.find(\"input, select, textarea\").off(\"change.dirty click.dirty keyup.dirty keydown.dirty blur.dirty\");\n\n        d.form.off(\"dirty\");\n\n        d.form.off(\"clean\");\n    };\n\n    var Dirty = function(form, options) {\n        this.form = form;\n        this.isDirty = false;\n        this.options = options;\n        this.history = [clean, clean]; //Keep track of last statuses\n        this.id = $(form).attr(\"id\");\n        singleDs.push(this);\n    };\n\n    Dirty.prototype = {\n        init: function() {\n            this.saveInitialValues();\n            this.setEvents();\n        },\n\n        isRadioOrCheckbox: function(el){\n            return $(el).is(\":radio, :checkbox\");\n        },\n\n        isFileInput: function(el){\n            return $(el).is(\":file\")\n        },\n\n        saveInitialValues: function() {\n            var d = this;\n            this.form.find(\"input, select, textarea\").each(function(_, e) {\n\n                var isRadioOrCheckbox = d.isRadioOrCheckbox(e);\n                var isFile = d.isFileInput(e);\n\n                if (isRadioOrCheckbox) {\n                    var isChecked = $(e).is(\":checked\") ? \"checked\" : \"unchecked\";\n                    $(e).data(dataInitialValue, isChecked);\n                } else if(isFile){\n                    $(e).data(dataInitialValue, JSON.stringify(e.files))\n                } else {\n                    $(e).data(dataInitialValue, $(e).val() || '');\n                }\n            });\n        },\n\n        refreshEvents: function () {\n            var d = this;\n            clearNamespacedEvents(d);\n            setNamespacedEvents(d);\n        },\n\n        showDirtyFields: function() {\n            var d = this;\n\n            return d.form.find(\"input, select, textarea\").filter(function(_, e){\n                return $(e).data(\"isDirty\");\n            });\n        },\n\n        setEvents: function() {\n            var d = this;\n\n            setSubmitEvents(d);\n            setNamespacedEvents(d);\n        },\n\n        isFieldDirty: function($field) {\n            var initialValue = $field.data(dataInitialValue);\n             // Explicitly check for null/undefined here as value may be `false`, so ($field.data(dataInitialValue) || '') would not work\n            if (initialValue == null) { initialValue = ''; }\n            var currentValue = $field.val();\n            if (currentValue == null) { currentValue = ''; }\n\n            // Boolean values can be encoded as \"true/false\" or \"True/False\" depending on underlying frameworks so we need a case insensitive comparison\n            var boolRegex = /^(true|false)$/i;\n            var isBoolValue = boolRegex.test(initialValue) && boolRegex.test(currentValue);\n            if (isBoolValue) {\n                var regex = new RegExp(\"^\" + initialValue + \"$\", \"i\");\n                return !regex.test(currentValue);\n            }\n\n            return currentValue !== initialValue;\n        },\n\n        isFileInputDirty: function($field) {\n            var initialValue = $field.data(dataInitialValue);\n\n            var plainField = $field[0];\n            var currentValue = JSON.stringify(plainField.files);\n\n            return currentValue !== initialValue;\n        },\n\n        isCheckboxDirty: function($field) {\n            var initialValue = $field.data(dataInitialValue);\n            var currentValue = $field.is(\":checked\") ? \"checked\" : \"unchecked\";\n\n            return initialValue !== currentValue;\n        },\n\n        checkValues: function(e) {\n            var d = this;\n            var formIsDirty = false;\n\n            this.form.find(\"input, select, textarea\").each(function(_, el) {\n                var isRadioOrCheckbox = d.isRadioOrCheckbox(el);\n                var isFile = d.isFileInput(el);\n                var $el = $(el);\n\n                var thisIsDirty;\n                if (isRadioOrCheckbox) {\n                    thisIsDirty = d.isCheckboxDirty($el);\n                } else if (isFile) {\n                    thisIsDirty = d.isFileInputDirty($el);\n                } else {\n                    thisIsDirty = d.isFieldDirty($el);\n                }\n                \n                $el.data(dataIsDirty, thisIsDirty);\n\n                formIsDirty |= thisIsDirty;                \n            });\n\n            if (formIsDirty) {\n                d.setDirty();\n            } else {\n                d.setClean();\n            }\n        },\n\n        setDirty: function() {\n            this.isDirty = true;\n            this.history[0] = this.history[1];\n            this.history[1] = dirty;\n\n            if (this.options.fireEventsOnEachChange || this.wasJustClean()) {\n                this.form.trigger(\"dirty\");\n            }\n        },\n\n        setClean: function() {\n            this.isDirty = false;\n            this.history[0] = this.history[1];\n            this.history[1] = clean;\n\n            if (this.options.fireEventsOnEachChange || this.wasJustDirty()) {\n                this.form.trigger(\"clean\");\n            }\n        },\n\n        //Lets me know if the previous status of the form was dirty\n        wasJustDirty: function() {\n            return (this.history[0] === dirty);\n        },\n\n        //Lets me know if the previous status of the form was clean\n        wasJustClean: function() {\n            return (this.history[0] === clean);\n        },\n\n        setAsClean: function(){\n            this.saveInitialValues();\n            this.setClean();\n        },\n\n        setAsDirty: function(){\n            this.saveInitialValues();\n            this.setDirty();\n        },\n\n        resetForm: function(){\n            var d = this;\n            this.form.find(\"input, select, textarea\").each(function(_, e) {\n\n                var $e = $(e);\n                var isRadioOrCheckbox = d.isRadioOrCheckbox(e);\n                var isFile = d.isFileInput(e);\n\n                if (isRadioOrCheckbox) {\n                    var initialCheckedState = $e.data(dataInitialValue);\n                    var isChecked = initialCheckedState === \"checked\";\n\n                    $e.prop(\"checked\", isChecked);\n                } if(isFile) {\n                    e.value = \"\";\n                    $(e).data(dataInitialValue, JSON.stringify(e.files))\n\n                } else {\n                    var value = $e.data(dataInitialValue);\n                    $e.val(value);\n                }\n            });\n\n            this.checkValues();\n        }\n    };\n\n    $.fn.dirty = function(options) {\n\n        if (typeof options === \"string\" && /^(isDirty|isClean|refreshEvents|resetForm|setAsClean|setAsDirty|showDirtyFields)$/i.test(options)) {\n            //Check if we have an instance of dirty for this form\n            // TODO: check if this is DOM or jQuery object\n            var d = getSingleton($(this).attr(\"id\"));\n\n            if (!d) {\n                d = new Dirty($(this), options);\n                d.init();\n            }\n            var optionsLowerCase = options.toLowerCase();\n\n            switch (optionsLowerCase) {\n            case \"isclean\":\n                return !d.isDirty;\n            case \"isdirty\":\n                return d.isDirty;\n            case \"refreshevents\":\n                d.refreshEvents();\n            case \"resetform\":\n                d.resetForm();\n            case \"setasclean\":\n                return d.setAsClean();\n            case \"setasdirty\":\n                return d.setAsDirty();\n            case \"showdirtyfields\":\n                return d.showDirtyFields();            \n            }\n\n        } else if (typeof options === \"object\" || !options) {\n\n            return this.each(function(_, e) {\n                options = $.extend({}, $.fn.dirty.defaults, options);\n                var dirty = new Dirty($(e), options);\n                dirty.init();\n            });\n\n        }\n    };\n\n    $.fn.dirty.defaults = {\n        preventLeaving: false,\n        leavingMessage: \"There are unsaved changes on this page which will be discarded if you continue.\",\n        onDirty: $.noop, //This function is fired when the form gets dirty\n        onClean: $.noop, //This funciton is fired when the form gets clean again\n        fireEventsOnEachChange: false, // Fire onDirty/onClean on each modification of the form\n    };\n\n})(jQuery);\n\n\n//# sourceURL=webpack://special_orders/./node_modules/jquery.dirty/dist/jquery.dirty.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./assets/scripts/index.js");
/******/ 	
/******/ })()
;