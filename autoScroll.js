// ==UserScript==
// @name         Auto Scroll and Refresh
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically scrolls from top to bottom over 5 seconds, then refreshes the page and repeats.
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Set your target website URL here (leave empty to work on any page)
    const TARGET_URL = "https://www.newegg.com/p/pl?N=100007709%20601469156%204021%204022&Order=1"; // Change this to your desired website or leave it empty for all

    function smoothScroll(duration = 5000) {
        let start = window.scrollY || window.pageYOffset;
        let end = document.documentElement.scrollHeight - window.innerHeight;
        let startTime = performance.now();

        function step(currentTime) {
            let elapsedTime = currentTime - startTime;
            let progress = Math.min(elapsedTime / duration, 1);
            let position = start + (end - start) * progress;
            window.scrollTo(0, position);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                setTimeout(() => location.reload(), 1000); // Refresh 1s after reaching the bottom
            }
        }

        requestAnimationFrame(step);
    }

    // Only run on the specified target URL (if set)
    if (!TARGET_URL || window.location.href.includes(TARGET_URL)) {
        setTimeout(smoothScroll, 1000); // Wait 1 second before starting the scroll
    }
})();
