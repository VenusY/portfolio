// Form validation
function validateInput(inputField, ...errorMessages) {
  if (errorMessages.length > 1) {
    if (inputField.value && inputField.checkValidity() === false) {
      inputField.parentElement.classList.add('contact-form__wrapper--error');
      errorMessages[1].classList.add('contact-form__error-message--visible');
      errorMessages[0].classList.remove('contact-form__error-message--visible');
      return false;
    }
  }

  /**
   * If the function gets to this point, then the invalid error message on the
   * email input field is no longer needed, so it is removed.
   */
  try {
    errorMessages[1].classList.remove('contact-form__error-message--visible');
  } catch (error) {
    // Do nothing
  }

  if (!inputField.value) {
    inputField.parentElement.classList.add('contact-form__wrapper--error');
    errorMessages[0].classList.add('contact-form__error-message--visible');
    return false;
  } else {
    inputField.parentElement.classList.remove('contact-form__wrapper--error');
    errorMessages[0].classList.remove('contact-form__error-message--visible');
    return true;
  }
}

function handleSubmit(e) {
  const nameInputField = document.querySelector('.contact-form__name');
  const emailAddressInputField = document.querySelector(
    '.contact-form__email-address',
  );
  const messageInputField = document.querySelector('.contact-form__message');
  const nameErrorMessage = document.querySelector(
    '.contact-form__error-message--name',
  );
  const emailEmptyErrorMessage = document.querySelector(
    '.contact-form__error-message--email-empty',
  );
  const emailInvalidErrorMessage = document.querySelector(
    '.contact-form__error-message--email-invalid',
  );
  const messageErrorMessage = document.querySelector(
    '.contact-form__error-message--message',
  );

  const results = [
    validateInput(nameInputField, nameErrorMessage),
    validateInput(
      emailAddressInputField,
      emailEmptyErrorMessage,
      emailInvalidErrorMessage,
    ),
    validateInput(messageInputField, messageErrorMessage),
  ];

  if (results.includes(false)) {
    return;
  }

  const contactForm = document.querySelector('.contact-form');
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  fetch('https://formsubmit.co/ajax/venusyip@outlook.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        nameInputField.value = '';
        emailAddressInputField.value = '';
        messageInputField.value = '';

        const thankYouPopup = document.querySelector('.thank-you-popup');
        const popupIcon = thankYouPopup.querySelector('.popup__icon');

        thankYouPopup.classList.add('popup--visible');
        popupIcon.classList.add('popup__icon--visible');
      } else {
        const errorPopup = document.querySelector('.error-popup');
        errorPopup.classList.add('popup--visible');
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', handleSubmit);

// Remove class after animation finishes

function removeClasses(e) {
  if (e.target !== e.currentTarget) {
    return;
  }

  e.currentTarget.classList.remove('popup--visible');

  const popupIcon = e.currentTarget.querySelector('.popup__icon');
  popupIcon.classList.remove('popup__icon--visible');
}

const thankYouPopup = document.querySelector('.thank-you-popup');
const errorPopup = document.querySelector('.error-popup');

thankYouPopup.addEventListener('animationend', removeClasses);
errorPopup.addEventListener('animationend', removeClasses);

// Scroll snap offset

function setOffset() {
  const navBar = document.querySelector('.nav');
  const sectionHeadings = document.querySelectorAll('.section__heading');
  let navBarHeight;

  navBarHeight = navBar.offsetHeight;
  sectionHeadings.forEach(
    (heading) => (heading.style.scrollMarginTop = `${navBarHeight}px`),
  );
}

setOffset();
window.addEventListener('resize', setOffset);
