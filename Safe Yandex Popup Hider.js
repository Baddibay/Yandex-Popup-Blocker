// ==UserScript==
// @name         Safe Yandex Popup Hider (no scroll fix)
// @namespace    https://github.com/Baddibay/Yandex-Popup-Blocker
// @version      1.4
// @description  Безопасно скрывает окно «Сделать Яндекс основным поиском», не ломая прокрутку
// @author       Baddibay
// @license      MIT
// @homepageURL  https://github.com/Baddibay/Yandex-Popup-Blocker
// @supportURL   https://github.com/Baddibay/Yandex-Popup-Blocker/issues
// @updateURL    https://raw.githubusercontent.com/Baddibay/Yandex-Popup-Blocker/main/Safe%20Yandex%20Popup%20Hider.js
// @downloadURL  https://raw.githubusercontent.com/Baddibay/Yandex-Popup-Blocker/main/Safe%20Yandex%20Popup%20Hider.js
// @match        *://*.yandex.ru/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const DEBUG = false; // включи true, если хочешь видеть логи в консоли

    const TARGET_TEXTS = [
        'Сделать Яндекс основным поиском',
        'Настройте быстрый доступ к поиску и сервисам Яндекса'
    ];

    function hideYandexPopup() {
        const candidates = document.querySelectorAll('.Modal-Wrapper, .Modal-Overlay, div, section, aside, dialog');

        for (const el of candidates) {
            if (el.dataset.hiddenByYandexBlocker) continue;
            const text = el.textContent?.trim();
            if (!text) continue;

            if (TARGET_TEXTS.some(t => text.includes(t))) {
                el.style.setProperty('display', 'none', 'important');
                el.style.setProperty('visibility', 'hidden', 'important');
                el.style.setProperty('pointer-events', 'none', 'important');
                el.dataset.hiddenByYandexBlocker = 'true';
                if (DEBUG) console.log(`[Yandex Popup Blocker] Скрыто окно: ${text.slice(0, 40)}...`);
            }
        }


        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
    }

    const observer = new MutationObserver(hideYandexPopup);
    observer.observe(document, { childList: true, subtree: true });
    window.addEventListener('load', hideYandexPopup);
})();
