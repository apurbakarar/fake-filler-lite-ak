# Fake Filler Lite - AK

A Chrome browser extension that automates form filling with custom values and dynamic tokens.

---

## 📋 Overview

**Fake Filler Lite - AK** is a developer tool designed to streamline the testing and development workflow by automatically populating web forms with predefined or dynamically generated values.

### Key Features

- **Automatic Form Filling** - Fill all form fields on a page with a single click
- **Custom Values** - Define your own test data for different form fields
- **Dynamic Tokens** - Use `{rand}` for random 6-digit numbers and `{timestamp}` for current timestamps
- **Field Detection** - Automatically discover and list all form fields on the current page
- **Persistent Storage** - Save your form configurations across browser sessions

---

## Why I Built It

Manual data entry during web development and testing is repetitive and error-prone. Developers and QA engineers often need to:

- Test form submissions with various data combinations
- Fill checkout forms repeatedly during e-commerce testing
- Verify form validation with different input scenarios

This extension eliminates the daily friction of re-typing the same information across multiple form fields, saving time and reducing human error.

---

## 🛠️ Technology Stack

| Technology                | Purpose                                                                    |
| ------------------------- | -------------------------------------------------------------------------- |
| **JavaScript (ES6+)**     | Core logic for form filling, field detection, and dynamic value generation |
| **HTML5**                 | Popup interface structure and user controls                                |
| **CSS3**                  | Styling with flexbox layout, responsive design                             |
| **Chrome Extension APIs** | `storage`, `scripting` for browser integration                             |
| **Manifest V3**           | Modern Chrome extension framework                                          |

---

## 📦 Installation & Usage

### Installation Steps

1. **Clone or Download** the repository:

   ```bash
   git clone https://github.com/apurbakarar/fake-filler-lite-ak.git
   ```

2. **Open Chrome Extensions**:
   - Navigate to `chrome://extensions/` in your browser
   - Enable **Developer mode** (toggle in top-right corner)

3. **Load the Extension**:
   - Click **"Load unpacked"**
   - Select the project folder

4. **Start Using**:
   - The extension icon appears in your browser toolbar
   - Click it to open the popup interface

### Usage Workflow

1. Open any webpage with forms
2. Click the extension icon
3. Use **"Fetch Fields"** to discover form fields on the page
4. Configure values for each field (use `{rand}` for random numbers)
5. Click **"Fill Form"** to populate all fields
6. Use **"Clear Fields"** to reset form values

---

## 💡 Dynamic Tokens

| Token         | Description                       | Example Output  |
| ------------- | --------------------------------- | --------------- |
| `{rand}`      | Generates a random 6-digit number | `123456`        |
| `{timestamp}` | Inserts current Unix timestamp    | `1704067200000` |

### Token Usage Examples

- Email with random number: `user{rand}@example.com` → `user789456@example.com`
- Username with timestamp: `user_{timestamp}` → `user_1704067200000`

---

## 🏗️ Project Structure

```
fake-filler-lite-ak/
├── content.js      # Content script for form manipulation
├── popup.html      # Extension popup interface
├── popup.js        # Popup logic and UI handling
├── styles.css      # Styling for popup interface
├── manifest.json   # Extension configuration
└── README.md       # This file
```

---

### What AI Got Right

1. **Form field detection** - Correctly identified all input types and handled event dispatching
2. **Dynamic value generation** - Proper token replacement implementation
3. **Storage management** - Accurate use of `chrome.storage.sync`

---

## What I Had to Fix

1. Responsive Design – Fixed the popup design issues, as the layout was breaking. I manually checked the UI and instructed the AI to fix the specific sections.
2. Functionality – The AI confidently stated that all functionality was working correctly, but during manual testing I found that the Clear Fields button was not working properly.
3. I had not instructed the AI to add the {rand} functionality to all email fields, but it implemented it automatically. I manually reviewed it and instructed the AI to fix the issue.
4. Fetch From Fields – The functionality was working, but it was collecting all fields from the DOM. I reviewed it and instructed the AI to fetch only the fields inside the specific form element.

---

## What I Learned About Vibe Coding

- **What works**: AI excels at generating boilerplate code, handling standard patterns (like form filling logic), and catching common edge cases in well-defined problems
- **What doesn't**:
- AI sometimes misses subtle UX issues like responsive design constraints and accessibility requirements that require human testing on actual devices
- Human testing is essential for UX and accessibility
- **What surprised me**: The AI's ability to understand complex message-passing patterns between popup and content scripts, and suggest appropriate event dispatching for form elements

---

## 📸 Screenshots

![Extension Layout](./screenshots/Extention%20Layout.png)

_Extension popup interface_

![Extension With Data](./screenshots/Extension%20With%20Data.png)
_Extension popup with sample data filled_

![Fetch Fields](./screenshots/Extension%20Fetch%20All%20Fields.png)
_Fetching form fields from a webpage_

## 👤 Author

**Apurba Karar**

---

## 📄 License

This project is open source and available for personal and educational use.
