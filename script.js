// SCRIPT.JS UNTUK MENAMBAHKAN TRANSISI HALAMAN YANG MULUS (SLIDE/FADE OUT)
// DAN EFEK SCROLL REVEAL (FADE IN ELEMEN SAAT DISCRROLL)

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------
    // 0. Logic Transisi Masuk Halaman (Slide In dari Bawah)
    // FIX: Menggunakan kelas baru dan requestAnimationFrame untuk mencegah blank page
    // ------------------------------------
    
    // 1. Tambahkan kelas start state (body akan diatur ke 100vh, opacity 0)
    // CATATAN: Karena CSS di atas sudah di-update, body sudah di posisi 0,
    // kita perlu menambahkan dan menghapus kelas ini.
    document.body.classList.add('slide-in-start');

    // 2. Gunakan requestAnimationFrame untuk memastikan browser mendaftarkan state awal
    window.requestAnimationFrame(() => {
        // 3. Hapus kelas start state untuk memicu transisi slide up ke posisi normal (0, opacity 1)
        document.body.classList.remove('slide-in-start');
    });

    // ------------------------------------
    // 1. Logic Transisi Halaman (Slide Out)
    // ------------------------------------
    
    // Ambil semua link internal (yang tidak dimulai dengan http/https, #, atau mailto:)
    const internalLinks = document.querySelectorAll('a[href]:not([href^="http"]):not([href^="#"]):not([href^="mailto"])');
    
    // Durasi transisi harus sama dengan yang ada di style.css (0.6s = 600ms)
    const transitionDuration = 600; 

    internalLinks.forEach(link => {
        // Hanya tambahkan event listener jika link tersebut mengarah ke halaman yang sama (internal)
        if (link.hostname === location.hostname || link.hostname === "") {
            link.addEventListener('click', function(e) {
                // Jangan lakukan navigasi langsung
                e.preventDefault();
                const newLocation = this.href;
                
                // Tambahkan kelas slide-out ke body (Memicu slide UP untuk halaman keluar)
                document.body.classList.add('slide-out');
                
                // Setelah durasi transisi berlalu, baru lakukan navigasi
                setTimeout(() => {
                    window.location = newLocation;
                }, transitionDuration); 
            });
        }
    });

    // ------------------------------------
    // 2. Logic Slideshow / Carousel
    // ------------------------------------

    const slideImgs = document.querySelectorAll(".slide-item");
    const dotsContainer = document.getElementById("dots");
    const slideshow = document.getElementById("slideshow");

    if (slideImgs.length > 0 && dotsContainer && slideshow) {
        let current = 0;
        let autoSlide;

        // Generate dots
        slideImgs.forEach((_, i) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");

            dot.addEventListener("click", () => showSlide(i));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll(".dot");

        // Show slide function
        function showSlide(i) {
            slideImgs[current].classList.remove("active");
            dots[current].classList.remove("active");

            // Pastikan current selalu berada dalam batas array (looping)
            current = (i % slideImgs.length + slideImgs.length) % slideImgs.length; 

            slideImgs[current].classList.add("active");
            dots[current].classList.add("active");
        }

        // Buttons
        const prevButton = document.getElementById("prev");
        const nextButton = document.getElementById("next");

        if (prevButton) {
            prevButton.addEventListener("click", () => {
                showSlide(current - 1);
                stopAuto(); // Hentikan auto slide saat interaksi manual
                startAuto();
            });
        }

        if (nextButton) {
            nextButton.addEventListener("click", () => {
                showSlide(current + 1);
                stopAuto(); // Hentikan auto slide saat interaksi manual
                startAuto();
            });
        }

        // Auto slide
        function startAuto() {
            stopAuto(); // Pastikan tidak ada interval ganda
            autoSlide = setInterval(() => {
                showSlide(current + 1);
            }, 3000);
        }

        function stopAuto() {
            clearInterval(autoSlide);
        }

        // Mulai tampilan awal
        showSlide(0); 
        startAuto();

        // Pause on hover
        slideshow.addEventListener("mouseenter", stopAuto);
        slideshow.addEventListener("mouseleave", startAuto);
        
        console.log("Slideshow diinisialisasi.");
    }
    
    // ------------------------------------
    // 3. Logic Scroll Reveal (Fade In Elemen)
    // ------------------------------------
    const setupScrollReveal = () => {
        // Pilih semua elemen dengan class 'scroll-fade'
        const fadeElements = document.querySelectorAll('.scroll-fade');
        
        // Buat Intersection Observer
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Jika elemen memasuki viewport
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Hentikan pengamatan setelah elemen terlihat
                    observer.unobserve(entry.target);
                }
            });
        }, {
            // Root margin 0 berarti observer akan memicu saat elemen masuk/keluar sepenuhnya
            rootMargin: '0px',
            // Threshold 0.1 berarti observer memicu saat 10% elemen terlihat
            threshold: 0.1 
        });

        // Amati setiap elemen yang dipilih
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    };

    // Panggil fungsi scroll reveal saat DOM siap
    setupScrollReveal();

});
