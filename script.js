/* filename: script.js */
// Version: 1.26

/* -------------------------------------------------
   script.js – Hamburger-Menü & Smooth Scrolling
   ------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navList = document.querySelector('#primary-navigation');
    const navLinks = navList ? navList.querySelectorAll('a[href]') : [];

    // Hamburger-Menu + ARIA
    if (burger && navList) {
        // Initialer ARIA-Zustand
        burger.setAttribute('aria-expanded', 'false');

        // Öffnen/Schließen
        burger.addEventListener('click', () => {
            const isOpen = navList.classList.toggle('is-open');
            burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Nach Link-Klick auf Mobil schließt das Menü
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.matchMedia('(max-width: 600px)').matches) {
                    navList.classList.remove('is-open');
                    burger.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Beim Resize auf Desktop/Tablet Menü schließen
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
});
