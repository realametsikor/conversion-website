document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);
            
            const outputArea = document.getElementById('output-area');
            outputArea.style.display = 'block';
            outputArea.innerHTML = `
                <p style="color: var(--accent); font-weight: bold;">Compression Complete!</p>
                <a href="${compressedDataUrl}" download="compressed-${file.name}" class="btn btn-accent">Download Compressed Image</a>
            `;
        };
    };
    reader.readAsDataURL(file);
});
