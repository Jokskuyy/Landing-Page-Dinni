// ENHANCED CAROUSEL - SEAMLESS LOOP FUNCTIONALITY
// Auto-duplicate carousel content for perfect infinite loop

document.addEventListener('DOMContentLoaded', function() {
    // Function untuk membuat seamless loop
    function createSeamlessLoop() {
        const carouselTracks = document.querySelectorAll('.enhanced-carousel-track');
        
        carouselTracks.forEach(track => {
            // Ambil semua item dalam track
            const items = track.querySelectorAll('.enhanced-carousel-item');
            
            // Jika sudah ada duplikasi, skip
            if (track.querySelector('.carousel-duplicate')) {
                return;
            }
            
            // Buat container untuk item asli
            const originalContainer = document.createElement('div');
            originalContainer.className = 'carousel-content-original';
            
            // Pindahkan semua item ke container asli
            items.forEach(item => {
                originalContainer.appendChild(item.cloneNode(true));
            });
            
            // Buat container untuk duplikasi
            const duplicateContainer = document.createElement('div');
            duplicateContainer.className = 'carousel-content-duplicate carousel-duplicate';
            
            // Duplikasi semua item
            items.forEach(item => {
                duplicateContainer.appendChild(item.cloneNode(true));
            });
            
            // Bersihkan track dan tambahkan container baru
            track.innerHTML = '';
            track.appendChild(originalContainer);
            track.appendChild(duplicateContainer);
        });
    }
    
    // Function untuk menghitung durasi animasi berdasarkan jumlah item
    function calculateAnimationDuration() {
        const carouselTracks = document.querySelectorAll('.enhanced-carousel-track');
        
        carouselTracks.forEach(track => {
            const items = track.querySelectorAll('.enhanced-carousel-item');
            const itemCount = items.length / 2; // Dibagi 2 karena ada duplikasi
            
            // Hitung durasi berdasarkan jumlah item (4-6 detik per item)
            const duration = Math.max(20, itemCount * 5);
            
            // Set CSS custom property untuk durasi
            track.style.setProperty('--carousel-duration', `${duration}s`);
        });
    }
    
    // Function untuk pause/resume animasi saat hover
    function setupHoverControls() {
        const containers = document.querySelectorAll('.enhanced-carousel-container');
        
        containers.forEach(container => {
            const track = container.querySelector('.enhanced-carousel-track');
            
            container.addEventListener('mouseenter', () => {
                track.style.animationPlayState = 'paused';
            });
            
            container.addEventListener('mouseleave', () => {
                track.style.animationPlayState = 'running';
            });
        });
    }
    
    // Function untuk observer ketika carousel masuk viewport
    function setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const track = entry.target.querySelector('.enhanced-carousel-track');
                if (entry.isIntersecting) {
                    track.style.animationPlayState = 'running';
                } else {
                    track.style.animationPlayState = 'paused';
                }
            });
        }, {
            threshold: 0.1
        });
        
        document.querySelectorAll('.enhanced-carousel-container').forEach(container => {
            observer.observe(container);
        });
    }
    
    // Jalankan semua function
    createSeamlessLoop();
    calculateAnimationDuration();
    setupHoverControls();
    setupIntersectionObserver();
    
    // Re-run jika ada perubahan konten dinamis
    const mutationObserver = new MutationObserver(() => {
        createSeamlessLoop();
        calculateAnimationDuration();
    });
    
    document.querySelectorAll('.enhanced-carousel-container').forEach(container => {
        mutationObserver.observe(container, {
            childList: true,
            subtree: true
        });
    });
});

// CSS tambahan yang perlu ditambahkan via JavaScript
const additionalCSS = `
.enhanced-carousel-normal {
    animation: enhanced-scroll-left-seamless var(--carousel-duration, 30s) linear infinite;
}

.enhanced-carousel-reverse {
    animation: enhanced-scroll-right-seamless var(--carousel-duration, 30s) linear infinite;
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
