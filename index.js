// Scroll snap offset

const navBar = document.querySelector('.nav');
const sectionHeadings = document.querySelectorAll('.section__heading');
let navBarHeight;

function setOffset() {
  navBarHeight = navBar.offsetHeight;
  sectionHeadings.forEach(
    heading => (heading.style.scrollMarginTop = `${navBarHeight}px`)
  );
}

setOffset();
window.addEventListener('resize', setOffset);
