// This script creates a stylish "Summarize" button that matches YouTube's UI.

const BUTTON_ID = 'perplexity-summary-button';
const BUTTON_CONTAINER_SELECTOR = '#top-level-buttons-computed';
const ICON_NAME = 'icon.png';
const BUTTON_TEXT = 'Summarize';
const ADD_BUTTON_DELAY_MS = 1000;

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
    const buttonContainer = document.querySelector(BUTTON_CONTAINER_SELECTOR);
    if (!buttonContainer || document.getElementById(BUTTON_ID)) {
        return; // Exit if container not found or button already exists
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

// Listen for messages from the background script to add the button.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'addSummarizeButton') {
        // Use a delay to ensure the YouTube page has fully loaded its dynamic content.
        setTimeout(addButton, ADD_BUTTON_DELAY_MS);
    }
});