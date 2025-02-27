// Animate on page load

const mediaQuery = window.matchMedia('screen and (max-width: 1100px)');

const menuButton = document.querySelector('.menu-button');
const pageLinks = document.querySelectorAll('.page-links__link');
const socialLinks = document.querySelectorAll('.social-links__button');
const headingLines = document.querySelectorAll('.main-heading__line');
const headerButton = document.querySelector('.header__button-wrapper');
const allAnimatedElements = [
  menuButton,
  ...pageLinks,
  ...socialLinks,
  ...headingLines,
  headerButton,
];
const headerAnimatedElements = [...headingLines, headerButton];

headerAnimatedElements.forEach((element, index) => {
  element.style.setProperty('--i', index + 1);
});

if (mediaQuery.matches) {
  const navAnimatedElements = [menuButton, ...socialLinks];

  navAnimatedElements.forEach((element, index) => {
    element.style.setProperty('--i', index + 1);
  });
} else {
  const navAnimatedElements = [...pageLinks, ...socialLinks];

  navAnimatedElements.forEach((element, index) => {
    element.style.setProperty('--i', index + 1);
  });
}

allAnimatedElements.forEach((element) => {
  element.style.animationName = 'intro-fade-in';
});

// Scroll snap offset

function setOffset() {
  const navBar = document.querySelector('.nav');
  const sectionHeadings = document.querySelectorAll('.section__heading');
  let navBarHeight;

  navBarHeight = navBar.offsetHeight;
  sectionHeadings.forEach(
    (heading) => (heading.style.scrollMarginTop = `${navBarHeight + 50}px`),
  );
}

setOffset();
window.addEventListener('resize', setOffset);

// Animate on scroll

const sectionHeadings = document.querySelectorAll('.section__heading');
const aboutMeParagraphs = document.querySelectorAll('.about-me-paragraph');
const skillsCards = document.querySelectorAll('.skills-grid__box');
const projects = document.querySelectorAll('.project');
const contactForm = document.querySelector('.contact-form');
const scrollInElements = [
  ...sectionHeadings,
  aboutMeParagraphs[0],
  skillsCards[0],
  ...projects,
  contactForm,
];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const className = entry.target.classList[0];
      entry.target.classList.remove(`${className}--hidden`);

      if (entry.target.classList.contains('about-me-paragraph')) {
        aboutMeParagraphs.forEach((element) => {
          element.classList.remove(`${className}--hidden`);
        });
      } else if (entry.target.classList.contains('skills-grid__box')) {
        skillsCards.forEach((element) => {
          element.classList.remove(`${className}--hidden`);
        });
      }
    });
  },
  {
    rootMargin: '0px 0px -30% 0px',
  },
);

aboutMeParagraphs.forEach((element, index) => {
  element.style.setProperty('--i', index);
});

skillsCards.forEach((element, index) => {
  element.style.setProperty('--i', index);
});

scrollInElements.forEach((element) => observer.observe(element));

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

  const loadingPopup = document.querySelector('.loading-popup');
  loadingPopup.classList.add('loading-popup--visible');

  // Getting the duration of the loading popup transition in milliseconds
  const popupComputedStyle = window.getComputedStyle(loadingPopup);
  const duration = parseFloat(popupComputedStyle.transitionDuration);
  const durationMilliseconds = duration * 1000;

  // Creating an object from the contact form input field values
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
      loadingPopup.classList.remove('loading-popup--visible');

      setTimeout(() => {
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
      }, durationMilliseconds);
    })
    .catch(() => {
      loadingPopup.classList.remove('loading-popup--visible');

      setTimeout(() => {
        const errorPopup = document.querySelector('.error-popup');
        errorPopup.classList.add('popup--visible');
      }, durationMilliseconds);
    });
}

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

// Menu drop down

function toggleDropdown() {
  const menuButtonIcon = document.querySelector('.menu-button__icon');
  const pageLinksDropdown = document.querySelector('.page-links');
  const socialLinksDropdown = document.querySelector('.social-links');

  menuButtonIcon.classList.toggle('menu-button__icon--active');
  pageLinksDropdown.classList.toggle('page-links--active');
  socialLinksDropdown.classList.toggle('social-links--active');
}

function addActiveUtilClass() {
  const pageLinksContainer = document.querySelector('.page-links');
  const socialLinksContainer = document.querySelector('.social-links');

  pageLinksContainer.classList.add('menu-button-active');
  socialLinksContainer.classList.add('menu-button-active');
}

menuButton.addEventListener('click', toggleDropdown);
menuButton.addEventListener('click', addActiveUtilClass);

function retractDropdown() {
  const menuButtonIcon = document.querySelector('.menu-button__icon');
  const pageLinksDropdown = document.querySelector('.page-links');
  const socialLinksDropdown = document.querySelector('.social-links');

  menuButtonIcon.classList.remove('menu-button__icon--active');
  pageLinksDropdown.classList.remove('page-links--active');
  socialLinksDropdown.classList.remove('social-links--active');
}

pageLinks.forEach((element) =>
  element.addEventListener('click', retractDropdown),
);

// Prevent transition when user switches between larger and smaller layouts

function removeActiveUtilClass() {
  const largerMediaQuery = window.matchMedia('(min-width: 1101px)');
  const smallerMediaQuery = window.matchMedia('(min-width: 581px)');
  const pageLinksContainer = document.querySelector('.page-links');
  const socialLinksContainer = document.querySelector('.social-links');

  if (largerMediaQuery.matches) {
    pageLinksContainer.classList.remove('menu-button-active');
  } else if (smallerMediaQuery.matches) {
    socialLinksContainer.classList.remove('menu-button-active');
  }
}

window.addEventListener('resize', removeActiveUtilClass);
