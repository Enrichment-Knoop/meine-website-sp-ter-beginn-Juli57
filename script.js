/* -------------------------------------------------
   script.js – Klick‑Handler für den "Get in touch"-Button
   ------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn1');

    if (btn) {
        btn.addEventListener('click', () => {
            alert('Danke für dein Interesse! Wir melden uns bald.');
        });
    }
});
