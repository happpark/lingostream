// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// 시스템 테마 확인 (사용자 설정이 없을 경우 대비)
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

if (currentTheme === "dark") {
    document.documentElement.setAttribute('data-theme', 'dark');
} else if (currentTheme === "light") {
    document.documentElement.setAttribute('data-theme', 'light');
} else if (prefersDarkScheme.matches) {
    // 저장된 설정이 없으면 시스템 설정을 따름
    document.documentElement.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// YouTube Thumbnail Logic
document.getElementById('get-thumbnail').addEventListener('click', () => {
    const url = document.getElementById('youtube-url').value;
    const videoId = extractVideoId(url);
    const container = document.getElementById('thumbnail-container');

    if (videoId) {
        container.innerHTML = '';
        
        const img = document.createElement('img');
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        
        img.src = thumbnailUrl;
        img.alt = 'YouTube Thumbnail';
        img.className = 'thumbnail-image';
        
        img.onerror = function() {
            this.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            this.onerror = null;
        };
        
        container.appendChild(img);
        
        const downloadLink = document.createElement('a');
        downloadLink.href = thumbnailUrl;
        downloadLink.target = '_blank';
        downloadLink.className = 'download-btn';
        downloadLink.innerText = 'View Full Size Image';
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
