window.addEventListener("DOMContentLoaded", (event) => {
let message = document.getElementById("MailMessage");

  document.querySelector('form.pure-form').addEventListener('submit', function (e) {
    //prevent the normal submission of the form
    e.preventDefault();
    let content = message.value;
    console.log(content); 
    window.location.href = `mailto:papakowdadson@gmail.com?subject=From my Portfolio&&body=${content}`;   
});
  
});
