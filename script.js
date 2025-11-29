/* filename: script.js */
// Version: 1.30

/* -------------------------------------------------
   script.js – Hamburger-Menü, Smooth Scrolling, Galerie-Lightbox
   ------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navList = document.querySelector('#primary-navigation');
    const navLinks = navList ? navList.querySelectorAll('a[href]') : [];

    // Hamburger-Menü + ARIA
    if (burger && navList) {
        burger.setAttribute('aria-expanded', 'false');
        burger.addEventListener('click', () => {
            const isOpen = navList.classList.toggle('is-open');
            burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.matchMedia('(max-width: 600px)').matches) {
                    navList.classList.remove('is-open');
                    burger.setAttribute('aria-expanded', 'false');
                }
            });
        });
        window.addEventListener('resize', () => {
            if (!window.matchMedia('(max-width: 600px)').matches) {
                navList.classList.remove('is-open');
                burger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Smooth Scroll für In-Page-Anker (nur Desktop/Tablet)
    const isDesktopOrTablet = !window.matchMedia('(max-width: 600px)').matches;
    if (isDesktopOrTablet) {
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', (e) => {
                const targetId = a.getAttribute('href').slice(1);
                const target = document.getElementById(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    history.pushState(null, '', `#${targetId}`);
                }
            });
        });
    }

    // Galerie: Lightbox initialisieren
    initLightbox();
});

function initLightbox() {
    const grid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lbImg = lightbox ? lightbox.querySelector('.lightbox-img') : null;
    const lbCaption = lightbox ? lightbox.querySelector('.lightbox-caption') : null;
    const lbClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

    if (!grid || !lightbox || !lbImg || !lbCaption || !lbClose) return;

    // Öffnen der Lightbox beim Klick auf ein Bild
    grid.addEventListener('click', (e) => {
        const img = e.target.closest('img');
        if (!img) return;
        openLightbox(img.src, img.alt, img.nextElementSibling?.textContent || '');
    });

    // Schließen-Events
    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        // Klick außerhalb des Bildes schließt
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
            closeLightbox();
        }
    });

    function openLightbox(src, alt, caption) {
        lbImg.src = src;
        lbImg.alt = alt || '';
        lbCaption.textContent = caption || alt || '';
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
    }

    function closeLightbox() {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        lbImg.src = '';
        lbImg.alt = '';
        lbCaption.textContent = '';
    }
}
