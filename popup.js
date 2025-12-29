const output = document.getElementById("output");
const scanBtn = document.getElementById("scan");
const metrics = document.getElementById("metrics");
const baseMetrics = document.getElementById("baseMetrics");

scanBtn.onclick = async () => {

  output.textContent = "Scanning page...";
  metrics.style.display = "none";
  baseMetrics.style.display = "none";

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });

  chrome.tabs.sendMessage(tab.id, { cmd: "GET_JS" }, (res) => {

    if (!res || !res.code) {
      output.textContent = "Unable to analyze this page.";
      return;
    }

    const r = calculateHalstead(res.code);
    const liveVars = calculateLiveVariables(res.code);

    output.textContent = "Analysis complete ✓";

    baseMetrics.style.display = "grid";
    metrics.style.display = "grid";

    document.getElementById("n1").innerText = r.n1;
    document.getElementById("n2").innerText = r.n2;
    document.getElementById("N1").innerText = r.N1;
    document.getElementById("N2").innerText = r.N2;

    document.getElementById("vocab").innerText = r.vocabulary;
    document.getElementById("length").innerText = r.length;
    document.getElementById("volume").innerText = r.volume.toFixed(2);
    document.getElementById("difficulty").innerText = r.difficulty.toFixed(2);
    document.getElementById("effort").innerText = r.effort.toFixed(2);
    document.getElementById("liveVars").innerText = liveVars;
  });
};
