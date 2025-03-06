// ==UserScript==
// @name         Human-Like Scrolling with Pause
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Mimics human scrolling by scrolling 10% of the page, pausing, then continuing. Scrolls down, pauses, scrolls up, then refreshes.
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Set your target website URL here (leave empty to work on any page)
    const TARGET_URL = "https://example.com"; // Change this to your desired website or leave empty for all

    function staggeredScroll(direction, callback) {
        let totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        let scrollAmount = totalHeight * 0.10; // 10% of total scrollable height
        let steps = Math.ceil(totalHeight / scrollAmount);
        let currentStep = 0;

        function step() {
            if (currentStep < steps) {
                let newPosition = direction === "down" 
                    ? window.scrollY + scrollAmount
                    : window.scrollY - scrollAmount;

                window.scrollTo(0, newPosition);
                currentStep++;

                if (currentStep < steps) {
                    setTimeout(step, 1000); // Pause for 1 second between jumps
                } else if (callback) {
                    setTimeout(callback, 5000); // Wait 5 seconds before next action
                }
            }
        }

        step();
    }

    function startScrollCycle() {
        staggeredScroll("down", () => {  // Scroll down in steps
            staggeredScroll("up", () => { // Scroll up in steps
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
