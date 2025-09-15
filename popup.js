const promptTextarea = document.getElementById('prompt');
const saveButton = document.getElementById('save');
const aiProviderSelect = document.getElementById('ai-provider');

// Load the saved prompt and AI provider when the popup opens
chrome.storage.sync.get(['prompt', 'aiProvider'], ({ prompt, aiProvider }) => {
    promptTextarea.value = prompt;
    if (aiProvider) {
        aiProviderSelect.value = aiProvider;
    }
});

// Save the prompt when the button is clicked
saveButton.addEventListener('click', () => {
    const promptValue = promptTextarea.value;
    if (!promptValue.includes('{videoUrl}')) {
        alert('Prompt must include {videoUrl}');
        return;
    }

    const aiProviderValue = aiProviderSelect.value;
    chrome.storage.sync.set({ prompt: promptValue, aiProvider: aiProviderValue }, () => {
        // Optional: Provide feedback to the user
        saveButton.textContent = 'Saved!';
        setTimeout(() => {
            saveButton.textContent = 'Save';
            window.close();
        }, 750);
    });
});
