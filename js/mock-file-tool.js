/**
 * mock-file-tool.js
 * Shared frontend logic for tools that require backend processing.
 */
document.getElementById('file-input').addEventListener('change', function(event) {
    const files = event.target.files;
    if (files.length === 0) return;

    const outputArea = document.getElementById('output-area');
    outputArea.style.display = 'block';
    outputArea.innerHTML = `<p style="color: var(--primary);">Uploading and processing securely...</p>`;

    // Simulating a backend API call delay
    setTimeout(() => {
        outputArea.innerHTML = `
            <p style="color: var(--accent); font-weight: bold; margin-bottom: 1rem;">✅ Processing Complete!</p>
            <button class="btn btn-accent">Download File</button>
            <p style="font-size: 0.8rem; margin-top: 1rem; color: var(--text-muted);">(Note: Connect Node.js backend for actual file processing)</p>
        `;
    }, 2500);
});
