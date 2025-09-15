// This script listens for messages from the content script and opens a new tab.

const DEFAULT_PROMPT = `Analyze the content of the video at this URL: {videoUrl}
Please provide a comprehensive summary of this YouTube video: [VIDEO URL/TITLE]
Include the following:
# Main Topics
- List the key topics discussed in order of appearance
- Highlight the central thesis or main argument
# Key Points & Details
- Summarize the most important information, statistics, or facts presented
- Include any notable examples or case studies mentioned
- Capture any unique insights or perspectives shared
# Actionable Takeaways
- List any tips, strategies, or action items suggested
- Include step-by-step processes if explained
# Important Quotes
- Note any memorable quotes or statements
- Include timestamps for reference if available
# Conclusion
- Summarize the video's conclusion or final thoughts
- Note any calls-to-action or next steps suggested
Please organize this information in a scannable format with bullet points and clear sections. If the video includes any warnings, disclaimers, or important caveats, please highlight those as well.
Length: Aim for a 3-10 minute read that captures 95% of the video's value."

For tutorials: Include all steps in the process
For interviews: Highlight key questions and answers
For educational content: Add "Explain complex concepts in simple terms
For reviews: Include pros, cons, and final verdict
For q&a sessions: Summarize each question and detailed answers
`;

// When the extension is installed, set the default prompt and AI provider
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(['prompt', 'aiProvider'], ({ prompt, aiProvider }) => {
        if (!prompt) {
            chrome.storage.sync.set({ prompt: DEFAULT_PROMPT });
        }
        if (!aiProvider) {
            chrome.storage.sync.set({ aiProvider: 'perplexity' });
        }
    });
});

function summarizeUrl(videoUrl) {
    if (!videoUrl) return;

    chrome.storage.sync.get(['prompt', 'aiProvider'], ({ prompt, aiProvider }) => {
        const finalPrompt = prompt.replace('{videoUrl}', videoUrl);
        let url;
        switch (aiProvider) {
            case 'gemini':
                url = `https://gemini.google.com/app?q=${encodeURIComponent(finalPrompt)}`;
                break;
            case 'chatgpt':
                url = `https://chat.openai.com/?q=${encodeURIComponent(finalPrompt)}`;
                break;
            case 'claude':
                url = `https://claude.ai/chats?q=${encodeURIComponent(finalPrompt)}`;
                break;
            case 'perplexity':
            default:
                url = `https://www.perplexity.ai/search/?q=${encodeURIComponent(finalPrompt)}`;
                break;
        }
        chrome.tabs.create({ url });
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'summarizeVideo') {
        summarizeUrl(request.url);
    }
});

// This script listens for tab updates and sends a message to the content script.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes('youtube.com/watch')) {
        chrome.tabs.sendMessage(tabId, { action: 'addSummarizeButton' });
    }
});