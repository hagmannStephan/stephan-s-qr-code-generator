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
    canvas.toBlob(blob => {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]).then(() => {
            alert("QR Code copied to clipboard!");
        }).catch(err => console.error("Copy failed", err));
    });
});

// Download QR code as PNG
document.getElementById("downloadBtn").addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});

// Generate example QR code on pageload
document.addEventListener('DOMContentLoaded', () => {
    generateQRCode('https://example.com');
});