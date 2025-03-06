// ==UserScript==
// @name         Human-Like Scrolling with Top Reset and Delay
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Rapidly scrolls down in steps, jumps to 20% from the top, waits 15-18s, resets to top on refresh, and repeats.
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Set your target website URL here (leave empty to work on any page)
    const TARGET_URL = "https://example.com"; // Change this to your desired website or leave empty for all

    function getRandomDelay(min = 15000, max = 18000) {
        return Math.floor(Math.random() * (max - min + 1)) + min; // Random delay between 15-18s
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
            } else {
                // After reaching the bottom, jump to 20% down from the top
                let jumpPosition = totalHeight * 0.20; // 20% of total scroll height
                window.scrollTo(0, jumpPosition);

                // Wait before refreshing
                let delay = getRandomDelay();
                console.log(`Jumped to 20% down (${jumpPosition}px). Waiting for ${delay / 1000} seconds before refresh.`);
                
                setTimeout(callback, delay); // Wait before refreshing
            }
        }

        step();
    }

    function startScrollCycle() {
        rapidScroll(() => {
            setTimeout(() => location.reload(), 1000); // Refresh 1s after waiting at the 20% position
        });
    }

    function ensureStartAtTop() {
        window.scrollTo(0, 0); // Force reset to the top
        console.log("Resetting to top on page load.");
    }

    // Ensure the page starts at the top after refresh
    ensureStartAtTop();

    // Only run on the specified target URL (if set)
    if (!TARGET_URL || window.location.href.includes(TARGET_URL)) {
        setTimeout(startScrollCycle, 1000); // Start 1 second after page load
    }
})();
