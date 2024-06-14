import dirty from 'jquery.dirty';
// import {getCookie} from './utils';
import './orders';
import './customers';
import './filters';
import './utils';


// Initialize tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});


// Display alert message when user leaves the page with unsaved changes
$("form.form").dirty({
    preventLeaving: true,
});


