// This script creates a stylish "Summarize" button that matches YouTube's UI.

// We only want to inject our CSS styles once.
let stylesInjected = false;

function injectStyles() {
    // If styles are already injected, do nothing.
    if (stylesInjected) return;

    const style = document.createElement('style');
    style.textContent = `
        #perplexity-summary-button {
            display: flex;
            align-items: center;
            gap: 6px; /* Space between icon and text */
            padding: 0 16px;
            height: 36px;
            border-radius: 18px; /* Pill shape */
            border: none;
            cursor: pointer;
            font-family: "Roboto", "Arial", sans-serif;
            font-size: 14px;
            font-weight: 500;
            white-space: nowrap; /* Prevent text wrapping */
            transition: background-color .2s; /* Smooth hover transition */
            margin-right: 8px; /* Space from other buttons */
        }

        /* Specific hover style for light mode */
        html:not([dark]) #perplexity-summary-button:hover {
            background-color: #e5e5e5 !important;
        }

        /* Specific hover style for dark mode */
        html[dark] #perplexity-summary-button:hover {
            background-color: #3f3f3f !important;
        }

        #perplexity-summary-button img {
            width: 20px;
            height: 20px;
        }
    `;
    document.head.appendChild(style);
    stylesInjected = true;
}

function addButton() {
    // 1. Inject the CSS for the button's appearance and hover effects.
    injectStyles();

    const topLevelButtonsComputed = document.querySelector('#top-level-buttons-computed');
    // Check if the container exists and if our button hasn't been added yet.
    if (topLevelButtonsComputed && !document.getElementById('perplexity-summary-button')) {

        // 2. Create the button element.
        const summarizeButton = document.createElement('button');
        summarizeButton.id = 'perplexity-summary-button';
        summarizeButton.title = 'Summarize with Perplexity';

        // 3. Create the icon element.
        const buttonIcon = document.createElement('img');
        buttonIcon.src = chrome.runtime.getURL('icon.png');
        buttonIcon.alt = 'Summarize';

        // 4. Create the text element.
        const buttonText = document.createElement('span');
        buttonText.textContent = 'Summarize';

        // 5. Add the icon and text to the button.
        summarizeButton.appendChild(buttonIcon);
        summarizeButton.appendChild(buttonText);

        // 6. Check for dark mode and apply the correct colors.
        const isDarkMode = document.documentElement.getAttribute('dark') !== null;
        if (isDarkMode) {
            summarizeButton.style.backgroundColor = '#272727';
            summarizeButton.style.color = '#f1f1f1';
            // Invert icon color to be visible on dark background
            buttonIcon.style.filter = 'invert(1)';
        } else {
            summarizeButton.style.backgroundColor = '#f2f2f2';
            summarizeButton.style.color = '#0f0f0f';
        }

        // 7. Add the click functionality.
        summarizeButton.addEventListener('click', () => {
            const videoUrl = window.location.href;
            chrome.runtime.sendMessage({ action: 'summarizeVideo', url: videoUrl });
        });

        // 8. Add the button to the page.
        topLevelButtonsComputed.prepend(summarizeButton);
    }
}

// YouTube's layout is dynamic, so we'll check for the button container periodically.
setInterval(addButton, 1000);