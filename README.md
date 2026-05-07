# Fake Filler Lite - AK

## What It Does

A browser extension that automatically fills web forms with custom values, supporting dynamic tokens like `{rand}` for random numbers and `{timestamp}` for timestamps. It also fetches form fields from the current page to simplify configuration.

## Why I Built It

Manually entering test data into forms during development or testing is repetitive and time-consuming. This extension eliminates the daily annoyance of re-typing the same information across multiple form fields, especially when testing checkout page form or post checkout pages.

## Tech Stack

- **JavaScript (ES6+)** - Core logic for form filling and field detection
- **HTML5** - Popup interface structure
- **CSS3** - Styling with flexbox layout
- **Chrome Extension APIs** - `storage`, `tabs`, `scripting` for browser integration
- **Manifest V3** - Modern extension framework

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/apurbakarar/fake-filler-pro-ak.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked" and select the project folder
5. The extension icon will appear in your browser toolbar
6. Open any webpage with forms and click the extension icon to configure and fill fields

## AI Tools Used

- **Claude (Cline)** - Code analysis, debugging, and documentation generation

## What AI Got Right

1. **Form field detection logic** - Correctly identified all input types (text, email, checkbox, radio, select) and handled them appropriately with proper event dispatching
2. **Dynamic value generation** - Properly implemented token replacement for `{rand}` and `{timestamp}` with correct random number generation
3. **Storage management** - Accurately used `chrome.storage.sync` for persisting form data across sessions and devices

## What I Had to Fix

1. **Responsive design** - Fixed the design of the popup. It was breaking. So i have checked manually and instructed to AI to fix the particular section.
2. **Functionality** - AI confidently said that all the functionlaity is working correct but when I checked that the Clear Fields button was not working.

## What I Learned About Vibe Coding

- **What works**: AI excels at generating boilerplate code, handling standard patterns (like form filling logic), and catching common edge cases in well-defined problems
- **What doesn't**: AI sometimes misses subtle UX issues like responsive design constraints and accessibility requirements that require human testing on actual devices
- **What surprised me**: The AI's ability to understand complex message-passing patterns between popup and content scripts, and suggest appropriate event dispatching for form elements

# Author

Created by Apurba Karar
