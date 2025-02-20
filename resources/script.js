import QRCode from "https://cdn.skypack.dev/qrcode";
let canvas = document.getElementById('qrcodeCanvas');

function generateQRCode(url) {
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }
    
    QRCode.toCanvas(canvas, url, function (error) {
        if (error) {
            console.error(error);
        } else {
            console.log('QR Code generated successfully!');
        }
    });
}

// Copy QR code to clipboard
document.getElementById("copyBtn").addEventListener("click", async () => {
    // For iOS, we need to use a different approach
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        try {
            // Create an offscreen canvas to render the image
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.drawImage(canvas, 0, 0);
            
            // Convert canvas to data URL
            const dataURL = tempCanvas.toDataURL('image/png');
            
            // Create a temporary image element
            const img = document.createElement('img');
            img.src = dataURL;
            img.style.position = 'fixed';
            img.style.left = '0';
            img.style.top = '0';
            img.style.opacity = '0';
            img.style.pointerEvents = 'none';
            img.style.zIndex = '-1';
            
            // Append the image to the document
            document.body.appendChild(img);
            
            // Create a range and selection
            const range = document.createRange();
            range.selectNode(img);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            
            // Execute copy command
            const successful = document.execCommand('copy');
            
            // Clean up
            selection.removeAllRanges();
            document.body.removeChild(img);
            
            if (successful) {
                alert("QR Code copied to clipboard!");
            } else {
                alert("Copy failed. Please try long-pressing the QR code to copy it manually.");
            }
        } catch (err) {
            console.error("iOS copy failed", err);
            alert("Could not copy automatically. Please screenshot the QR code instead.");
        }
    } else {
        // Original code for non-iOS devices
        canvas.toBlob(blob => {
            const item = new ClipboardItem({ "image/png": blob });
            navigator.clipboard.write([item]).then(() => {
                alert("QR Code copied to clipboard!");
            }).catch(err => console.error("Copy failed", err));
        });
    }
});

// Download QR code as PNG
document.getElementById("downloadBtn").addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});

// Generate QR code on input change
let inputField = document.getElementById('urlInput');

inputField.addEventListener('input', function() {
    generateQRCode(inputField.value);
});

document.addEventListener('DOMContentLoaded', function() {
    generateQRCode(inputField.value);
});