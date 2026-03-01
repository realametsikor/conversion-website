/**
 * resize-image.js
 * Handles client-side image resizing.
 */
(function() {
    const fileInput = document.getElementById('file-input');
    const widthInput = document.getElementById('resize-width');
    const heightInput = document.getElementById('resize-height');
    const controls = document.getElementById('resize-controls');
    const applyBtn = document.getElementById('apply-resize');
    
    let originalImage = new Image();
    let currentFileName = "image.png";

    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        currentFileName = file.name;

        const reader = new FileReader();
        reader.onload = function(event) {
            originalImage.src = event.target.result;
            originalImage.onload = function() {
                // Populate inputs with current dimensions
                widthInput.value = originalImage.width;
                heightInput.value = originalImage.height;
                controls.style.display = 'block';
            };
        };
        reader.readAsDataURL(file);
    });

    applyBtn.addEventListener('click', function() {
        const newWidth = parseInt(widthInput.value, 10);
        const newHeight = parseInt(heightInput.value, 10);

        if (!newWidth || !newHeight) {
            alert("Please enter valid dimensions.");
            return;
        }

        // Process client-side using Canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);
        
        // Download the result instantly
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        const link = document.createElement('a');
        link.download = `resized-${currentFileName}`;
        link.href = dataUrl;
        link.click();
    });
})();
