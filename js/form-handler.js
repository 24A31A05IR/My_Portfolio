// ── Form handling and toast notifications
const contactForm = document.getElementById('contactForm');
const formToast = document.getElementById('formToast');
const toastTitle = document.getElementById('toastTitle');
const toastMessage = document.getElementById('toastMessage');

function showToast(type, title, message) {
  if (!formToast || !toastTitle || !toastMessage) return;

  formToast.classList.remove('success', 'error', 'visible');
  formToast.classList.add(type);
  toastTitle.textContent = title;
  toastMessage.textContent = message;

  const icon = formToast.querySelector('.form-toast-icon');
  if (icon) {
    icon.textContent = type === 'success' ? '✓' : '!';
  }

  requestAnimationFrame(() => {
    formToast.classList.add('visible');
  });

  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    formToast.classList.remove('visible');
  }, 3200);
}

if (contactForm) {
  contactForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="ti ti-loader-2" style="animation:spin 1s linear infinite;"></i> Sending...';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      contactForm.reset();
      showToast('success', 'Success', 'Your message has been sent successfully. I will get back to you.');
    } catch (error) {
      showToast('error', 'Oops', 'Something went wrong while sending the message. Please try again later or email me directly.');
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  });
}

// ── Animation utility
const spinStyle = document.createElement('style');
spinStyle.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
document.head.appendChild(spinStyle);
