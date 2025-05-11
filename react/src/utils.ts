export function initializeClipboardCopy() {
  const copyButtons = document.querySelectorAll('[data-copy-to-clipboard-target]');
  console.log(copyButtons);

  copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
      try {
        const targetId = button.getAttribute('data-copy-to-clipboard-target');
        const targetElement = document.getElementById(targetId);

        if (!targetElement) {
          console.error(`Target element with ID '${targetId}' not found`);
          return;
        }

        const contentType = button.getAttribute('data-copy-to-clipboard-content-type') || 'textContent';
        let content = contentType === 'innerHTML' ? targetElement.innerHTML : targetElement.textContent;

        const handleHtmlEntities = button.getAttribute('data-copy-to-clipboard-html-entities') === 'true';

        if (handleHtmlEntities && contentType === 'innerHTML') {
          const tempElement = document.createElement('div');
          tempElement.innerHTML = content;
          content = tempElement.textContent;
        }

        await navigator.clipboard.writeText(content);

        const defaultMessage = button.querySelector('#default-message');
        const successMessage = button.querySelector('#success-message');

        if (defaultMessage && successMessage) {
          defaultMessage.classList.add('hidden');
          successMessage.classList.remove('hidden');

          setTimeout(() => {
            defaultMessage.classList.remove('hidden');
            successMessage.classList.add('hidden');
          }, 3000);
        }

      } catch (error) {
        console.error('Failed to copy text to clipboard:', error);
      }
    });
  });
}

export function copyToClipboard(elementId: string) {
  const text = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(text)
    .then(() => {
      alert('copied: ' + text);
    })
    .catch(err => {
      console.error('Failed to copy text: ', err);
    });
}
