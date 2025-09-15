// This script listens for messages from the content script and opens a new tab.

const DEFAULT_PROMPT = `Analyze the content of the video at this URL: {videoUrl}

Your task is to provide a comprehensive summary with the following structure:

### Key Takeaways (Most to Least Important)
- Main point 1
- Main point 2
- ...

### Learning Roadmap
If the video is a tutorial or teaches a skill, provide a step-by-step roadmap for a beginner to follow. If not applicable, state that the video is not instructional.
- **Step 1:** Description
- **Step 2:** Description
- ...

### Noteworthy Details
- Interesting detail or quote 1
- Interesting detail or quote 2
- ...`;

// When the extension is installed, set the default prompt
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get('prompt', ({ prompt }) => {
        if (!prompt) {
            chrome.storage.sync.set({ prompt: DEFAULT_PROMPT });
        }
    });
});

function summarizeUrlInPerplexity(videoUrl) {
    if (!videoUrl) return;

    chrome.storage.sync.get('prompt', ({ prompt }) => {
        const finalPrompt = prompt.replace('{videoUrl}', videoUrl);
        const perplexityUrl = `https://www.perplexity.ai/search/?q=${encodeURIComponent(finalPrompt)}`;
        chrome.tabs.create({ url: perplexityUrl });
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'summarizeVideo') {
        summarizeUrlInPerplexity(request.url);
    }
});

// This script listens for tab updates and sends a message to the content script.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes('youtube.com/watch')) {
        chrome.tabs.sendMessage(tabId, { action: 'addSummarizeButton' });
    }
});