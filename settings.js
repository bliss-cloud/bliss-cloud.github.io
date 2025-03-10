// Initialize settings when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load saved settings from localStorage
    const tabName = localStorage.getItem('tabName');
    const faviconUrl = localStorage.getItem('faviconUrl');
    const panicKey = localStorage.getItem('panicKey');
    const panicUrl = localStorage.getItem('panicUrl');
    
    // Apply Tab Cloak settings if available
    if (tabName) {
        document.title = tabName; // Set the tab name
    }

    if (faviconUrl) {
        const link = document.querySelector("link[rel*='icon']");
        if (link) {
            link.href = faviconUrl; // Set the favicon if it's already set
        } else {
            const link = document.createElement('link');
            link.rel = 'icon';
            link.href = faviconUrl;
            document.head.appendChild(link); // Create a new link element if not already present
        }
    }

    // Activate Panic Key functionality if saved settings exist
    if (panicKey && panicUrl) {
        // Set up the keydown event listener for the panic key
        window.addEventListener('keydown', function(event) {
            if (event.key === panicKey) {
                window.location.href = panicUrl; // Redirect to the panic URL when the panic key is pressed
            }
        });
    }

    // Event listeners to allow users to configure Panic Key and Panic URL (you can modify your settings page accordingly)
    const panicKeyInput = document.getElementById('panic-key');
    const panicUrlInput = document.getElementById('panic-url');

    // Set the current panic key and URL in the settings input fields, if available
    if (panicKeyInput && panicKey) {
        panicKeyInput.value = panicKey; // Set the initial value for the panic key input
    }

    if (panicUrlInput && panicUrl) {
        panicUrlInput.value = panicUrl; // Set the initial value for the panic URL input
    }

    // Update panic key setting in localStorage
    if (panicKeyInput) {
        panicKeyInput.addEventListener('change', function() {
            const key = this.value;
            localStorage.setItem('panicKey', key); // Save the panic key to localStorage
        });
    }

    // Update panic URL setting in localStorage
    if (panicUrlInput) {
        panicUrlInput.addEventListener('change', function() {
            const url = this.value;
            localStorage.setItem('panicUrl', url); // Save the panic URL to localStorage
        });
    }
});

document.addEventListener('keydown', function(event) {
            if (event.ctrlKey && event.key === '0') { // If CTRL + N is pressed
                const navbar = document.querySelector('.bottom-nav');
                navbar.classList.toggle('hidden'); // Toggle the navbar visibility
            }
        });