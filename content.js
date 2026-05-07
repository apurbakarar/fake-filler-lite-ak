function generateRandomNumber(length = 6) {
  return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
}

function generateDynamicValue(value) {
  let val = value.toString();

  // ✅ ALWAYS handle {rand} FIRST
  if (val.includes("{rand}")) {
    return val.replace(/{rand}/g, generateRandomNumber(6));
  }

  // ✅ Email auto-random (every time)
  if (val.includes("@") && !val.match(/\d{6}@/)) {
    const [prefix, domain] = val.split("@");
    return `${prefix}${generateRandomNumber(6)}@${domain}`;
  }

  // ✅ Other tokens
  if (val.includes("{timestamp}")) {
    return val.replace(/{timestamp}/g, Date.now());
  }

  return val;
}

function isTruthy(val) {
  return ["true", "on", "1", "yes"].includes(val.toLowerCase());
}

function extractFieldName(field) {
  let label = "";

  if (field.labels && field.labels.length > 0) {
    label = field.labels[0].innerText;
  }

  return (
    field.name ||
    field.id ||
    label ||
    field.placeholder ||
    field.getAttribute("aria-label") ||
    ""
  );
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  // ✅ Fill Form
  if (request.action === "fillForm") {
    chrome.storage.sync.get("formData", (data) => {
      const formData = data.formData || {};

      const fields = document.querySelectorAll(
        "input:not([type=hidden]), textarea, select"
      );

      fields.forEach((field) => {
        const key = extractFieldName(field);
        if (!key) return;

        const lowerKey = key.toLowerCase();

        for (let formKey in formData) {

          // ✅ NEW: Skip empty values from extension
          if (!formData[formKey] || formData[formKey].trim() === "") continue;

          if (lowerKey.includes(formKey.toLowerCase())) {

            let value = generateDynamicValue(formData[formKey]);

            // ✅ Checkbox
            if (field.type === "checkbox") {
              field.checked = isTruthy(value);
              field.dispatchEvent(new Event('change', { bubbles: true }));
              return;
            }

            // ✅ Radio
            if (field.type === "radio") {
              if (field.value.toLowerCase() === value.toLowerCase()) {
                field.checked = true;
                field.dispatchEvent(new Event('change', { bubbles: true }));
              }
              return;
            }

            // ✅ Select
            if (field.tagName === "SELECT") {
              field.value = value;
              field.dispatchEvent(new Event('change', { bubbles: true }));
              return;
            }

            // ✅ UPDATED: Always overwrite (important for random email)
            field.value = value;
            field.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }
      });
    });
  }

  // 🔍 Fetch Fields (unchanged)
  if (request.action === "fetchFields") {

    const elements = document.querySelectorAll(
      "input:not([type=hidden]), textarea, select"
    );

    const fields = [];

    elements.forEach(el => {
      const key = extractFieldName(el);

      if (key && key.length > 2 && !fields.includes(key)) {
        fields.push(key);
      }
    });

    sendResponse({ fields });
    return true;
  }
});