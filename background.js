// This script listens for messages from the content script and opens a new tab.

function summarizeUrlInPerplexity(videoUrl) {
    if (!videoUrl) return;

    const prompt = `${videoUrl} Extract the key points around this video. Summarize using bullet points from the most important to the least important. Write a roadmap on how to achieve what the speaker is trying to teach if speaker is teaching anything. make sure you dont miss any details regarding important keytake aways or something worth learning.`;
    const perplexityUrl = `https://www.perplexity.ai/search/?q=${encodeURIComponent(prompt)}`;
    chrome.tabs.create({ url: perplexityUrl });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'summarizeVideo') {
        summarizeUrlInPerplexity(request.url);
    }
});

// This script listens for clicks on the extension icon and opens a new tab.
chrome.action.onClicked.addListener((tab) => {
    summarizeUrlInPerplexity(tab.url);
});

// This script listens for tab updates and sends a message to the content script.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes('youtube.com/watch')) {
        chrome.tabs.sendMessage(tabId, { action: 'addSummarizeButton' });
    }
});