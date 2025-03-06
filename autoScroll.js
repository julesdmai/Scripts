// ==UserScript==
// @name         Auto Scroll and Refresh (10s Scroll, 30s Delay)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Automatically scrolls from top to bottom over 10 seconds, then waits 30 seconds before refreshing and resetting to the top.
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Set your target website URL here (leave empty to work on any page)
    const TARGET_URL = "https://example.com"; // Change this to your desired website or leave empty for all

    function smoothScroll(duration = 10000) { // 10 seconds scroll time
        let start = 0;
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
                setTimeout(() => {
                    location.reload(); // Refresh after 30s delay
                }, 30000); // 30-second delay before refreshing
            }
        }

        requestAnimationFrame(step);
    }

    // Ensure the page starts at the top after refresh
    window.scrollTo(0, 0);

    // Only run on the specified target URL (if set)
    if (!TARGET_URL || window.location.href.includes(TARGET_URL)) {
        setTimeout(smoothScroll, 1000); // Wait 1 second before starting the scroll
    }
})();
