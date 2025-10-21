// ==UserScript==
// @name         Safe Yandex Popup Hider (no scroll fix)
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Безопасно скрывает окно "Сделать Яндекс основным поиском", не ломая прокрутку
// @author       Baddibay
// @match        *://*.yandex.ru/*
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const TARGET_TEXTS = [
        'Сделать Яндекс основным поиском',
        'Настройте быстрый доступ к поиску и сервисам Яндекса'
    ];

    function hideYandexPopup() {
        document.querySelectorAll('div, section, aside, dialog').forEach(el => {
            const txt = el.textContent?.trim();
            if (!txt) return;

            for (const phrase of TARGET_TEXTS) {
                if (txt.includes(phrase)) {
                    if (!el.dataset.hiddenByYandexBlocker) {
                        el.style.display = 'none';
                        el.style.visibility = 'hidden';
                        el.style.pointerEvents = 'none';
                        el.dataset.hiddenByYandexBlocker = 'true';
                        console.log(`[Yandex Popup Blocker] Скрыто окно: "${phrase}"`);
                    }
                }
            }
        });

        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
    }
    const observer = new MutationObserver(() => hideYandexPopup());
    observer.observe(document, { childList: true, subtree: true });
    window.addEventListener('load', hideYandexPopup);
})();
