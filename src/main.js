const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const year = document.querySelector("#current-year");

function setMenuOpen(isOpen) {
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  navigation.classList.toggle("site-nav--open", isOpen);
}

menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

year.textContent = new Date().getFullYear();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  formStatus.textContent = "Enviando sua mensagem…";
  formStatus.classList.remove("form-status--error");

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
    });

    if (!response.ok) throw new Error("Falha no envio");
    const result = await response.json();
    if (!result.success) throw new Error("O servidor não confirmou o envio");

    formStatus.textContent = "Mensagem enviada! Em breve falaremos com você.";
    form.reset();
  } catch {
    formStatus.textContent = "Não foi possível enviar agora. Tente pelo WhatsApp ou tente novamente mais tarde.";
    formStatus.classList.add("form-status--error");
  } finally {
    submitButton.disabled = false;
  }
});