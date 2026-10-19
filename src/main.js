import "./sass/index.scss";

// Navbar
const hamburger = document.querySelector(".header__hamburger");
const nav = document.querySelector(".nav");
const blur = document.querySelector(".blur");
const navClose = document.querySelector(".nav__close");
hamburger.addEventListener("click", () => {
  nav.classList.toggle("nav--visible");
  blur.classList.toggle("blur--visible");
});

navClose.addEventListener("click", () => {
  nav.classList.toggle("nav--visible");
  blur.classList.toggle("blur--visible");
});

// Form
const form = document.querySelector(".form");
const responseModal = document.querySelector(".popup");
const responseModalText = document.querySelector(".popup__text");
const responseModalClose = document.querySelector(".popup__close");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = new FormData(this);
  blur.classList.add("blur--visible");

  try {
    const response = await fetch("send_email.php", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    responseModal.showModal();

    if (result.success) {
      responseModalText.textContent = "Cadastro enviado com sucesso!";
      responseModalText.textContent = "Cadastro enviado com sucesso!";
      this.reset();
    } else {
      responseModalText.textContent =
        "Erro ao enviar cadastro. Tente novamente.";
    }
  } catch (error) {
    responseModalText.textContent = "Erro na comunicação com o servidor.";
  }
});

responseModalClose.addEventListener("click", () => {
  blur.classList.remove("blur--visible");
  responseModal.close();
});
