/**
 * jpg-to-png.js
 * Fully functional client-side format converter.
 */
document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const outputArea = document.getElementById('output-area');
    outputArea.style.display = 'block';
    outputArea.innerHTML = `<p style="color: var(--primary);">Converting image format...</p>`;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function() {
            // Draw to canvas to change format
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // Export as PNG
            const dataUrl = canvas.toDataURL('image/png');
            
            // Remove the old .jpg extension for the download file name
            const originalName = file.name.replace(/\.[^/.]+$/, "");

            outputArea.innerHTML = `
                <p style="color: var(--accent); font-weight: bold; margin-bottom: 1rem;">✅ Conversion Complete!</p>
                <a href="${dataUrl}" download="${originalName}.png" class="btn btn-accent" style="text-decoration: none;">Download PNG Image</a>
            `;
        };
    };
    reader.readAsDataURL(file);
});
