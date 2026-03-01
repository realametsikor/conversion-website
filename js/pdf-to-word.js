document.getElementById('file-input').addEventListener('change', async function(event) {
    const file = event.target.files[0];
    if (!file || file.type !== "application/pdf") {
        alert("Please upload a valid PDF file.");
        return;
    }

    const outputArea = document.getElementById('output-area');
    outputArea.style.display = 'block';
    outputArea.innerHTML = `<p>Uploading and converting... Please wait.</p>`;

    // Mocking the delay for now:
    setTimeout(() => {
        outputArea.innerHTML = `
            <p style="color: var(--accent); font-weight: bold;">Conversion Complete!</p>
            <button class="btn btn-accent">Download Word Document</button>
            <p style="font-size: 0.8rem; margin-top: 1rem;">(Note: Backend API required for actual file conversion)</p>
        `;
    }, 2500);
});
