const promptTextarea = document.getElementById('prompt');
const saveButton = document.getElementById('save');

// Load the saved prompt when the popup opens
chrome.storage.sync.get(['prompt'], ({ prompt }) => {
    promptTextarea.value = prompt;
});

// Save the prompt when the button is clicked
saveButton.addEventListener('click', () => {
    const promptValue = promptTextarea.value;
    if (!promptValue.includes('{videoUrl}')) {
        alert('Prompt must include {videoUrl}');
        return;
    }

    chrome.storage.sync.set({ prompt: promptValue }, () => {
        // Optional: Provide feedback to the user
        saveButton.textContent = 'Saved!';
        setTimeout(() => {
            saveButton.textContent = 'Save';
            window.close();
        }, 750);
    });
});
