

// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.getElementById('formContact');
//     form.addEventListener("submit", formSend);
//
//     async function formSend(e) {
//         e.preventDefault();
//
//         let formData = new FormData(form);
//
//         let response = await fetch('/sendmail.php', {
//             method: 'POST',
//             body: formData
//         });
//         if (response.ok){
//             let result = await response.json();
//             console.log(result.message);
//             alert('Сообщение отправлено!');
//             form.reset();
//         } else {
//             alert('Ошибка');
//         }
//
//     }
// });

$('#formContact').submit(function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
       $(this).find("input").val("");
        alert('Сообщение отправлено!');
       $('#formContact').trigger('reset');
    });
    return false;
});