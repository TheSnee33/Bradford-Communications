document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved user preference, if any, on load of the website
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    }

    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', '');
        } else {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Background Video Rotation Logic
    const bgVideos = [
        "AI Videos/High Voltage Vision.mp4",
        "AI Videos/The Rain and the Rise_01_Full.mp4",
        "AI Videos/33 I Am The Storm - Track 077.mp4"
    ];
    let currentVideoIndex = 0;
    
    const video1 = document.getElementById('bg-video-1');
    const video2 = document.getElementById('bg-video-2');
    
    if (video1 && video2) {
        let activeVideo = video1;
        let hiddenVideo = video2;

        // Initialize first video
        activeVideo.src = bgVideos[currentVideoIndex];
        activeVideo.onloadedmetadata = () => {
            if (activeVideo.duration > 5) {
                const randomStart = Math.random() * (activeVideo.duration - 5);
                activeVideo.currentTime = Math.max(0, randomStart);
            }
        };

        setInterval(() => {
            currentVideoIndex = (currentVideoIndex + 1) % bgVideos.length;
            hiddenVideo.src = bgVideos[currentVideoIndex];
            
            hiddenVideo.onloadedmetadata = () => {
                if (hiddenVideo.duration > 5) {
                    const randomStart = Math.random() * (hiddenVideo.duration - 5);
                    hiddenVideo.currentTime = Math.max(0, randomStart);
                }
                hiddenVideo.play().catch(e => console.error("Video play failed:", e));
                
                // Crossfade
                hiddenVideo.classList.remove('hero-bg-hidden');
                activeVideo.classList.add('hero-bg-hidden');
                
                // Swap references
                const temp = activeVideo;
                activeVideo = hiddenVideo;
                hiddenVideo = temp;
            };
        }, 5000);
    }
});
