window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const message = document.getElementById("MailMessage");
  const email = document.getElementById("sender-email");
  const phone = document.getElementById("sender-phone");
  const submitButton = document.getElementById("sendMail");

  if (!form || !message || !email || !phone) return;

  const EMAILJS_SERVICE_ID = "service_tgno57j";
  const EMAILJS_TEMPLATE_ID = "template_9sryybi";
  const EMAILJS_PUBLIC_KEY = "-gq-0y97blC4qiFC6";

  const showToast = (messageText, type = "success") => {
    let container = document.getElementById("emailjs-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "emailjs-toast-container";
      container.style.position = "fixed";
      container.style.bottom = "20px";
      container.style.right = "20px";
      container.style.zIndex = "9999";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.gap = "10px";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.textContent = messageText;
    toast.style.padding = "12px 16px";
    toast.style.borderRadius = "8px";
    toast.style.color = "#f7fff9";
    toast.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.2)";
    toast.style.maxWidth = "320px";
    toast.style.minWidth = "240px";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "opacity 0.25s ease, transform 0.25s ease";
    toast.style.border = "1px solid rgba(255, 255, 255, 0.35)";
    toast.style.background = type === "error"
      ? "rgba(209, 67, 67, 0.88)"
      : "rgba(47, 133, 90, 0.8)";
    toast.style.backdropFilter = "blur(8px)";
    toast.style.webkitBackdropFilter = "blur(8px)";

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";
    });

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 250);
    }, 4000);
  };

  const setButtonLoadingState = (isLoading) => {
    if (submitButton) {
      submitButton.disabled = isLoading;
      submitButton.textContent = isLoading ? "Sending..." : "Hire Me";
    }
  };

  if (window.emailjs) {
    window.emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const content = message.value.trim();
    const senderEmail = email.value.trim();
    const senderPhone = phone.value.trim();

    if (!senderEmail) {
      showToast("Please enter your email address before sending.", "error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    if (!senderPhone) {
      showToast("Please enter your phone number before sending.", "error");
      return;
    }

    if (!content) {
      showToast("Please enter a message before sending.", "error");
      return;
    }

    setButtonLoadingState(true);

    try {
      if (!window.emailjs) {
        throw new Error("EmailJS SDK is not loaded.");
      }

      await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          message: content,
          email: senderEmail,
          phone: senderPhone,
          to_email: "papakowdadson@gmail.com"
        },
        EMAILJS_PUBLIC_KEY
      );

      form.reset();
      showToast("Well acknowledged.", "success");
    } catch (error) {
      console.error("EmailJS send failed:", error);
      showToast("Unable to send your message right now. Please try again later.", "error");
    } finally {
      setButtonLoadingState(false);
    }
  });
});
