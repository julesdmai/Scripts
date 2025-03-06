// ==UserScript==
// @name         Rapid Human-Like Scrolling
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Mimics human scrolling by rapidly scrolling in steps instead of smooth gliding. Scrolls down, pauses, scrolls up, then refreshes.
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Set your target website URL here (leave empty to work on any page)
    const TARGET_URL = "https://www.newegg.com/p/pl?N=100007709%20601469156%204021%204022&Order=1"; // Change this to your desired website or leave empty for all

    function rapidScroll(direction, callback) {
        let totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        let scrollAmount = totalHeight * 0.10; // 10% of total scrollable height
        let steps = Math.ceil(totalHeight / scrollAmount);
        let currentStep = 0;

        function step() {
            if (currentStep < steps) {
                let start = window.scrollY;
                let end = direction === "down"
                    ? Math.min(start + scrollAmount, totalHeight)
                    : Math.max(start - scrollAmount, 0);
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
                setTimeout(callback, 5000); // Wait 5 seconds before next action
            }
        }

        step();
    }

    function startScrollCycle() {
        rapidScroll("down", () => {  // Scroll down in rapid steps
            rapidScroll("up", () => { // Scroll up in rapid steps
                setTimeout(() => location.reload(), 5000); // Wait 5s, then refresh
            });
        });
    }

    // Ensure the page starts at the top after refresh
    window.scrollTo(0, 0);

    // Only run on the specified target URL (if set)
    if (!TARGET_URL || window.location.href.includes(TARGET_URL)) {
        setTimeout(startScrollCycle, 1000); // Start 1 second after page load
    }
})();
