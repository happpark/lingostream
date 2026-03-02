document.getElementById('get-thumbnail').addEventListener('click', () => {
    const url = document.getElementById('youtube-url').value;
    const videoId = extractVideoId(url);
    const container = document.getElementById('thumbnail-container');

    if (videoId) {
        // Clear previous content
        container.innerHTML = '';
        
        // Create image element
        const img = document.createElement('img');
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        
        img.src = thumbnailUrl;
        img.alt = 'YouTube Thumbnail';
        img.className = 'thumbnail-image';
        
        // Handle case where maxresdefault doesn't exist
        img.onerror = function() {
            this.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            this.onerror = null;
        };
        
        container.appendChild(img);
        
        // Add download link
        const downloadLink = document.createElement('a');
        downloadLink.href = thumbnailUrl;
        downloadLink.target = '_blank';
        downloadLink.className = 'download-btn';
        downloadLink.innerText = 'View Full Size';
        container.appendChild(downloadLink);
    } else {
        alert('Please enter a valid YouTube URL.');
    }
});

function extractVideoId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}
