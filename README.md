# YouTube Summarizer with Perplexity

This Chrome extension enhances your YouTube experience by providing a convenient way to summarize videos using a customizable prompt with Perplexity AI.

## Features

- **In-Page Summarize Button**: A "Summarize" button is automatically added to the YouTube video page, next to the like and dislike buttons.
- **Customizable Prompt**: Click the extension icon in your browser's toolbar to open a popup where you can edit and save your custom summarization prompt. The placeholder `{videoUrl}` will be automatically replaced with the video's URL.

## How to Use

1.  **Summarize a Video**: Navigate to any YouTube video, and you will see a "Summarize" button. Click it to open a new tab with the Perplexity summary.
2.  **Customize the Prompt**: Click the extension's icon in your Chrome toolbar. A popup will appear with a textarea to edit the prompt. Click "Save" to store your changes.

## Default Prompt

The default prompt is:
```
Analyze the content of the video at this URL: {videoUrl}

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
- ...
```

## Installation

1.  Download this repository as a ZIP file.
2.  Unzip the file.
3.  Open Chrome and navigate to `chrome://extensions`.
4.  Enable "Developer mode".
5.  Click "Load unpacked" and select the unzipped folder.
