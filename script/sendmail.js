window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form.pure-form");
  const message = document.getElementById("MailMessage");
  const button = document.getElementById("sendMail");

  if (!form || !message || !button) return;

  const openMailClient = (event) => {
    event.preventDefault();

    const content = (message.value || "").trim();
    const subject = encodeURIComponent("From my Portfolio");
    const body = encodeURIComponent(content || "Hello Papa, I would love to connect.");
    const mailtoLink = `mailto:papakowdadson@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
  };

  form.addEventListener("submit", openMailClient);
  button.addEventListener("click", openMailClient);
});
