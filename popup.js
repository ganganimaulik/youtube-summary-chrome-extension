const promptTextarea = document.getElementById('prompt');
const saveButton = document.getElementById('save');

// Load the saved prompt when the popup opens
chrome.storage.sync.get('prompt', ({ prompt }) => {
    promptTextarea.value = prompt;
});

// Save the prompt when the button is clicked
saveButton.addEventListener('click', () => {
    chrome.storage.sync.set({ prompt: promptTextarea.value }, () => {
        // Optional: Provide feedback to the user
        saveButton.textContent = 'Saved!';
        setTimeout(() => {
            saveButton.textContent = 'Save';
            window.close();
        }, 750);
    });
});
