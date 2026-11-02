// Fall back to opening the image when native dialog support is unavailable.
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCaption = document.querySelector('#lightbox-caption');
const closeButton = lightbox?.querySelector('.lightbox-close');
let previousOverflow = '';

document.querySelectorAll('[data-preview]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!lightbox || typeof lightbox.showModal !== 'function') {
      window.open(button.dataset.preview, '_blank', 'noopener,noreferrer');
      return;
    }
    lightboxImage.src = button.dataset.preview;
    lightboxImage.alt = button.querySelector('img')?.alt || button.dataset.caption;
    lightboxCaption.textContent = button.dataset.caption;
    previousOverflow = document.body.style.overflow;
    lightbox.showModal();
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  });
});

closeButton?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', (event) => {
  if (event.target !== lightbox) return;
  const bounds = lightbox.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) {
    lightbox.close();
  }
});
lightbox?.addEventListener('close', () => {
  document.body.style.overflow = previousOverflow;
});
