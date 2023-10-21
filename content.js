require("events").EventEmitter.defaultMaxListeners = 15;
import $ from "jquery";

class ElementObserver {
    constructor(blockedElements) {
        this.blockedElements = blockedElements;
        this.holdTime = 0;
        this.intervalFunc = null;

        this.initializeObserver();
        this.initializeEventListeners();
    }

    initializeObserver() {
        this.observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                blockedElements.forEach(function(selector) {
                    $(mutation.target).find(selector).remove();
                });
            });
        });

        this.observer.observe(document, { childList: true, subtree: true });
    }

    initializeEventListeners() {
        window.addEventListener("mousemove", this.handleMouseMove.bind(this), true);
    }

    handleMouseMove(e) {
        if (e.target.id || e.target.className) {
            this.startHoldTimer(e);
        }
    }

    startHoldTimer(e) {
        if (this.intervalFunc) {
            clearInterval(this.intervalFunc)
        }

        this.intervalFunc = setInterval(() => {
            if (e.shiftKey) {
                this.holdTime += 100;
            } else {
                this.holdTime = 0;
            }

            if (this.holdTime === 2000) {
                clearInterval(this.intervalFunc);
                e.preventDefault();
                e.stopPropagation();

                if (e.target.id) {
                    let id = e.target.id;
                    id = id.replace(/\s/g, ".");
                    blockedElements.push(`#${id}`);
                }

                if (e.target.className) {
                    let className = e.target.className;
                    className = className.replace(/\s/g, ".");
                    blockedElements.push(`.${className}`);
                }

                chrome.storage.local.set({ blockedElements: blockedElements });

                location.reload();
            }
        }, 100);
    }
}

let blockedElements = [];

chrome.storage.local.get("blockedElements", function(result) {
    blockedElements = result.blockedElements || [];
    console.log("Blocked elements retrieved: %o", blockedElements);
});

const elementObserver = new ElementObserver(blockedElements);