// ==UserScript==
// @name         Safe Yandex Popup Hider
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Безопасно скрывает окно "Сделать Яндекс основным поиском", не ломая прокрутку на сайте Яндекса
// @author       Baddibay https://github.com/Baddibay
// @match        *://*.yandex.ru/*
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    function hideYandexPopup() {
        const texts = [
            'Сделать Яндекс основным поиском',
            'Настройте быстрый доступ к поиску и сервисам Яндекса'
        ];
        document.querySelectorAll('div, section, aside, dialog').forEach(el => {
            const txt = el.textContent?.trim();
            if (txt) {
                for (const t of texts) {
                    if (txt.includes(t)) {
                        el.style.display = 'none';
                        el.style.visibility = 'hidden';
                        el.style.pointerEvents = 'none';
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
