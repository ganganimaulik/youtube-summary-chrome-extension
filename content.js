// This script creates a stylish "Summarize" button that matches YouTube's UI.

const BUTTON_ID = 'perplexity-summary-button';
const BUTTON_CONTAINER_SELECTOR = '#above-the-fold #top-level-buttons-computed';
const ICON_NAME = 'icon.png';
const BUTTON_TEXT = 'Summarize';

let observer = null;

function createSummarizeButton() {
    const button = document.createElement('button');
    button.id = BUTTON_ID;
    button.title = 'Summarize with Perplexity';

    const icon = document.createElement('img');
    icon.src = chrome.runtime.getURL(ICON_NAME);
    icon.alt = 'Summarize';

    const text = document.createElement('span');
    text.textContent = BUTTON_TEXT;

    button.appendChild(icon);
    button.appendChild(text);

    return button;
}

function styleButtonForTheme(button) {
    const isDarkMode = document.documentElement.getAttribute('dark') !== null;
    const icon = button.querySelector('img');

    if (isDarkMode) {
        button.style.backgroundColor = '#272727';
        button.style.color = '#f1f1f1';
        if (icon) {
            icon.style.filter = 'invert(1)';
        }
    } else {
        button.style.backgroundColor = '#f2f2f2';
        button.style.color = '#0f0f0f';
        if (icon) {
            icon.style.filter = 'none';
        }
    }
}

function addButton() {
    if (!window.location.href.includes('youtube.com/watch')) {
        return;
    }

    const buttonContainer = document.querySelector(BUTTON_CONTAINER_SELECTOR);
    if (!buttonContainer || buttonContainer.querySelector(`#${BUTTON_ID}`)) {
        return;
    }

    const summarizeButton = createSummarizeButton();
    styleButtonForTheme(summarizeButton);

    summarizeButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({
            action: 'summarizeVideo',
            url: window.location.href
        });
    });

    buttonContainer.prepend(summarizeButton);
}

function startObserver() {
    if (observer) {
        observer.disconnect();
    }

    observer = new MutationObserver(() => {
        addButton();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}

// Handle initial load
startObserver();

// Handle SPA navigation
document.addEventListener('yt-navigate-finish', () => {
    // The DOM is updated, so we just need to try adding the button.
    // The observer will also catch this, but calling it directly can be faster.
    addButton();
});
