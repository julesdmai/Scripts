// ==UserScript==
// @name         Human-Like Scrolling with Random Pause
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Rapidly scrolls down in steps, waits randomly between 5-15s, jumps to the top, refreshes, and repeats.
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Set your target website URL here (leave empty to work on any page)
    const TARGET_URL = "https://example.com"; // Change to your desired website or leave empty for all

    function getRandomDelay(min = 5000, max = 15000) {
        return Math.floor(Math.random() * (max - min + 1)) + min; // Random delay between 5s and 15s
    }

    function rapidScroll(callback) {
        let totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        let scrollAmount = totalHeight * 0.10; // 10% of total scrollable height
        let steps = Math.ceil(totalHeight / scrollAmount);
        let currentStep = 0;

        function step() {
            if (currentStep < steps) {
                let start = window.scrollY;
                let end = Math.min(start + scrollAmount, totalHeight);
                let duration = 200; // 200ms rapid scroll

                let startTime = performance.now();

                function animateScroll(currentTime) {
                    let elapsed = currentTime - startTime;
                    let progress = Math.min(elapsed / duration, 1);
                    let newPosition = start + (end - start) * progress;
                    window.scrollTo(0, newPosition);

                    if (progress < 1) {
                        requestAnimationFrame(animateScroll);
                    } else {
                        currentStep++;
                        setTimeout(step, 800); // 800ms pause before next jump
                    }
                }

                requestAnimationFrame(animateScroll);
            } else if (callback) {
                let delay = getRandomDelay();
                console.log(`Waiting for ${delay / 1000} seconds before refresh.`);
                setTimeout(callback, delay); // Wait a random time before refreshing
            }
        }

        step();
    }

    function startScrollCycle() {
        rapidScroll(() => {
            window.scrollTo(0, 0); // Instantly jump to the top
            setTimeout(() => location.reload(), 1000); // Refresh 1s after jumping to the top
        });
    }

    // Ensure the page starts at the top after refresh
    window.scrollTo(0, 0);

    // Only run on the specified target URL (if set)
    if (!TARGET_URL || window.location.href.includes(TARGET_URL)) {
        setTimeout(startScrollCycle, 1000); // Start 1 second after page load
    }
})();
