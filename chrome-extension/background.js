const BASE = "https://www.usetoolnest.com";

// ── Context menu setup ─────────────────────────────────────────────
chrome.runtime.onInstalled.addListener(() => {
  // Parent menu
  chrome.contextMenus.create({
    id: "toolsnest-parent",
    title: "ToolsNest",
    contexts: ["all"],
  });

  // Compress Image
  chrome.contextMenus.create({
    id: "compress-image",
    parentId: "toolsnest-parent",
    title: "Compress Image",
    contexts: ["all"],
  });

  // Convert PDF
  chrome.contextMenus.create({
    id: "convert-pdf",
    parentId: "toolsnest-parent",
    title: "Convert PDF",
    contexts: ["all"],
  });

  // Open Converter
  chrome.contextMenus.create({
    id: "open-converter",
    parentId: "toolsnest-parent",
    title: "Open File Converter",
    contexts: ["all"],
  });

  // Separator
  chrome.contextMenus.create({
    id: "separator-1",
    parentId: "toolsnest-parent",
    type: "separator",
    contexts: ["all"],
  });

  // All Tools
  chrome.contextMenus.create({
    id: "all-tools",
    parentId: "toolsnest-parent",
    title: "Browse All Tools",
    contexts: ["all"],
  });
});

// ── Context menu click handlers ────────────────────────────────────
chrome.contextMenus.onClicked.addListener((info) => {
  const routes = {
    "compress-image": "/image-tools/image-compressor",
    "convert-pdf":    "/file-tools/pdf-to-word",
    "open-converter": "/file-tools",
    "all-tools":      "/all-tools",
  };

  const path = routes[info.menuItemId];
  if (path) {
    chrome.tabs.create({ url: BASE + path });
  }
});
