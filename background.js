// This script listens for messages from the content script and opens a new tab.

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'summarizeVideo') {
        const videoUrl = request.url;
        const perplexityUrl = `https://www.perplexity.ai/search/?q=summarize%20${encodeURIComponent(videoUrl)}`;
        chrome.tabs.create({ url: perplexityUrl });
    }
});