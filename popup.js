const container = document.getElementById("fieldsContainer");

// Create row
function createRow(key = "", value = "") {
  const row = document.createElement("div");
  row.className = "field-row";

  row.innerHTML = `
    <input type="text" class="key" placeholder="Field name (e.g. email)" value="${key}">
    <input type="text" class="value" placeholder="Value (text | on/off | {rand})" value="${value}">
    <button class="delete-btn">X</button>
  `;

  row.querySelector(".delete-btn").addEventListener("click", () => {
    row.remove();
  });

  container.appendChild(row);
}

// ➕ Add new field
document.getElementById("addField").addEventListener("click", () => {
  createRow();
});

// 💾 Save data
document.getElementById("save").addEventListener("click", () => {
  const rows = document.querySelectorAll(".field-row");
  const data = {};

  rows.forEach(row => {
    const key = row.querySelector(".key").value.trim();
    const value = row.querySelector(".value").value.trim();

    if (key) data[key] = value;
  });

  chrome.storage.sync.set({ formData: data }, () => {
    alert("Saved!");
  });
});

// ⚡ Fill form
document.getElementById("fill").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "fillForm" });
  });
});

// 🔍 Fetch form fields
document.getElementById("fetch").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

    chrome.tabs.sendMessage(tabs[0].id, { action: "fetchFields" }, (response) => {

      if (!response || !response.fields) {
        alert("No fields found!");
        return;
      }

      // ✅ Clear UI first
      container.innerHTML = "";

      // ✅ Populate fetched fields
      response.fields.forEach(field => {
        createRow(field, "");
      });

      // ✅ Also clear stored data (important)
      chrome.storage.sync.set({ formData: {} });
    });
  });
});

// 🗑 CLEAR FIELDS (FIXED)
document.getElementById("clear").addEventListener("click", () => {

  // Optional confirmation
  const confirmClear = confirm("Are you sure you want to clear all fields?");
  if (!confirmClear) return;

  // ✅ Clear UI
  container.innerHTML = "";

  // ✅ Clear storage
  chrome.storage.sync.remove("formData", () => {

    // ✅ Add one empty row (better UX)
    createRow();

    // Optional feedback
    alert("All fields cleared!");
  });
});

// 📥 Load saved data
window.onload = () => {
  chrome.storage.sync.get("formData", (result) => {
    const data = result.formData || {};

    container.innerHTML = ""; // ✅ prevent duplicate rows

    if (Object.keys(data).length === 0) {
      createRow();
    } else {
      for (let key in data) {
        createRow(key, data[key]);
      }
    }
  });
};