// Elements
const fileUpload = document.getElementById('file-upload');
const dropZone = document.getElementById('drop-zone');
const formatSelect = document.getElementById('format-select');
const convertBtn = document.getElementById('convert-btn');
const downloadBtn = document.getElementById('download-btn');
const progressBar = document.getElementById('progress-bar');
const progressSection = document.getElementById('progress');

// File uploading & drag-and-drop event listeners
fileUpload.addEventListener('change', handleFileSelect);
dropZone.addEventListener('dragover', (e) => e.preventDefault());
dropZone.addEventListener('drop', handleFileDrop);

// Handle file upload
let uploadedFile = null;

function handleFileSelect(event) {
    uploadedFile = event.target.files[0];
    displayFile(uploadedFile);
}

function handleFileDrop(event) {
    event.preventDefault();
    uploadedFile = event.dataTransfer.files[0];
    displayFile(uploadedFile);
}

function displayFile(file) {
    dropZone.innerHTML = `<p>File Selected: ${file.name}</p>`;
    convertBtn.style.display = 'block';
}

// Handle Conversion
convertBtn.addEventListener('click', () => {
    if (!uploadedFile) return alert("Please select a file first!");

    const outputFormat = formatSelect.value;
    convertFile(uploadedFile, outputFormat);
});

function convertFile(file, format) {
    // Show progress bar
    progressSection.style.display = 'block';
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = `${progress}%`;
        if (progress === 100) {
            clearInterval(interval);
            onConversionComplete(file, format);
        }
    }, 500);
}

// On conversion completion
function onConversionComplete(file, format) {
    // Simulating the conversion by generating a new file link
    const convertedFile = generateConvertedFile(file, format);
    downloadBtn.style.display = 'block';
    downloadBtn.onclick = () => downloadFile(convertedFile);
}

// Simulate the converted file creation (in a real scenario, integrate an API)
function generateConvertedFile(file, format) {
    const blob = new Blob([file], { type: `image/${format}` });
    const url = URL.createObjectURL(blob);
    return url;
}

// Handle file download
function downloadFile(fileUrl) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `converted-file.${formatSelect.value}`;
    link.click();
}
