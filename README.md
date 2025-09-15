# YouTube Summarizer with AI

This Chrome extension enhances your YouTube experience by providing a convenient way to summarize videos using a customizable prompt with your choice of AI provider.

## Features

- **In-Page Summarize Button**: A "Summarize" button is automatically added to the YouTube video page, next to the like and dislike buttons.
- **Multiple AI Providers**: Choose between Perplexity, Gemini, ChatGPT, and Claude to generate your summaries.
- **Customizable Prompt**: Click the extension icon in your browser's toolbar to open a popup where you can edit and save your custom summarization prompt. The placeholder `{videoUrl}` will be automatically replaced with the video's URL.

## How to Use

1.  **Configure the Extension**: Click the extension's icon in your Chrome toolbar. A popup will appear.
    *   **Select AI Provider**: Choose your desired AI provider from the dropdown menu.
    *   **Customize the Prompt**: Edit the prompt in the textarea. **Your prompt must include the `{videoUrl}` placeholder.**
    *   Click "Save" to store your changes.
2.  **Summarize a Video**: Navigate to any YouTube video, and you will see a "Summarize" button. Click it to open a new tab with the AI-generated summary.

## Default Prompt

The default prompt is:
```
Analyze the content of the video at this URL: {videoUrl}
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
```

## Installation

1.  Download this repository as a ZIP file.
2.  Unzip the file.
3.  Open Chrome and navigate to `chrome://extensions`.
4.  Enable "Developer mode".
5.  Click "Load unpacked" and select the unzipped folder.
