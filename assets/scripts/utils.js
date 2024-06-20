export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function formatPhoneNumber(e) {
    const x = e.target.value.replace(/\D/g, '');
    const n = x.length;

    if (n <= 3) {
        e.target.value = x;
    } else if (n > 3 && n <= 7) {
        e.target.value = x.slice(0, 3) + '-' + x.slice(3);
    } else if (n > 7 && n <= 10) {
        e.target.value = '(' + x.slice(0, 3) + ') ' + x.slice(3, 6) + '-' + x.slice(6);
    } else if (n > 10) {
        // Format long numbers like (123) 456-7890 ext 1234
        e.target.value = '(' + x.slice(0, 3) + ') ' + x.slice(3, 6) + '-' + x.slice(6, 10) + ' ext ' + x.slice(10);
    }
}

const phone_field = $("#id_phone_number")[0];
if (phone_field) {
    phone_field.addEventListener('input', formatPhoneNumber);
    formatPhoneNumber({target: phone_field});
}

