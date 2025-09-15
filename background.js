// This script listens for messages from the content script and opens a new tab.

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'summarizeVideo') {
        const videoUrl = request.url;
        const perplexityUrl = `https://www.perplexity.ai/search/?q=summarize%20${encodeURIComponent(videoUrl)}`;
        chrome.tabs.create({ url: perplexityUrl });
    }
});

// This script listens for clicks on the extension icon and opens a new tab.
chrome.action.onClicked.addListener((tab) => {
    const videoUrl = tab.url;
    const perplexityUrl = `https://www.perplexity.ai/search/?q=summarize%20${encodeURIComponent(videoUrl)}`;
    chrome.tabs.create({ url: perplexityUrl });
});

// This script listens for tab updates and sends a message to the content script.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes('youtube.com/watch')) {
        chrome.tabs.sendMessage(tabId, { action: 'addSummarizeButton' });
    }
});