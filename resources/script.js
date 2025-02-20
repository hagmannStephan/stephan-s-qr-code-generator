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
    const dataURL = canvas.toDataURL("image/png");
    const blob = await fetch(dataURL).then(res => res.blob());
    const item = new ClipboardItem({ "image/png": blob });

    try {
        await navigator.clipboard.write([item]);
        alert("QR Code copied to clipboard!");
    } catch (err) {
        console.error("Copy failed", err);
        alert("Failed to copy QR code.");
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