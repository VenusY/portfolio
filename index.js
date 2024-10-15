// Form validation
function validateInput(inputField, ...errorMessages) {
  if (errorMessages.length > 1) {
    if (inputField.value && inputField.checkValidity() === false) {
      inputField.parentElement.classList.add('contact-form__wrapper--error');
      errorMessages[1].classList.add('contact-form__error-message--visible');
      errorMessages[0].classList.remove('contact-form__error-message--visible');
      return;
    }
  }

  if (!inputField.value) {
    inputField.parentElement.classList.add('contact-form__wrapper--error');
    errorMessages[0].classList.add('contact-form__error-message--visible');
  } else {
    inputField.parentElement.classList.remove('contact-form__wrapper--error');
    errorMessages[0].classList.remove('contact-form__error-message--visible');
  }

  try {
    errorMessages[1].classList.remove('contact-form__error-message--visible');
  } catch (error) {
    // Do nothing
  }
}

async function handleSubmit(e) {
  const contactForm = document.querySelector('.contact-form');
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  const nameInputField = document.querySelector('.contact-form__name');
  const emailAddressInputField = document.querySelector(
    '.contact-form__email-address'
  );
  const messageInputField = document.querySelector('.contact-form__message');
  const nameErrorMessage = document.querySelector(
    '.contact-form__error-message--name'
  );
  const emailEmptyErrorMessage = document.querySelector(
    '.contact-form__error-message--email-empty'
  );
  const emailInvalidErrorMessage = document.querySelector(
    '.contact-form__error-message--email-invalid'
  );
  const messageErrorMessage = document.querySelector(
    '.contact-form__error-message--message'
  );

  validateInput(nameInputField, nameErrorMessage);
  validateInput(
    emailAddressInputField,
    emailEmptyErrorMessage,
    emailInvalidErrorMessage
  );
  validateInput(messageInputField, messageErrorMessage);

  // try {
  //   const response = await fetch('https://formsubmit.co/venusyip@outlook.com', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
}

const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', handleSubmit);

// Scroll snap offset

function setOffset() {
  const navBar = document.querySelector('.nav');
  const sectionHeadings = document.querySelectorAll('.section__heading');
  let navBarHeight;

  navBarHeight = navBar.offsetHeight;
  sectionHeadings.forEach(
    heading => (heading.style.scrollMarginTop = `${navBarHeight}px`)
  );
}

setOffset();
window.addEventListener('resize', setOffset);
