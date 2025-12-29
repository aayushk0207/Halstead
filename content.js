async function collectPageJS() {

  let code = "";

  document.querySelectorAll("script").forEach(s => {
    if (!s.src && s.textContent) code += "\n" + s.textContent;
  });

  for (const s of document.querySelectorAll("script[src]")) {
    try {
      const res = await fetch(s.src);
      code += "\n" + await res.text();
    } catch {}
  }

  return code;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.cmd === "GET_JS") {
    collectPageJS().then(code => sendResponse({ code }));
  }
  return true;
});
