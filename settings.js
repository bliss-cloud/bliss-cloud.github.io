// Initialize the settings when the page loads
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

    // Activate Panic Key functionality on page load
    if (panicKey && panicUrl) {
        // Set up the keydown event listener for the panic key
        window.addEventListener('keydown', function(event) {
            if (event.key === panicKey) {
                window.location.href = panicUrl; // Redirect to the panic URL when the panic key is pressed
            }
        });
    }

    // Event listener for setting the Tab Name
    document.getElementById('tab-name').addEventListener('change', function() {
        const tabName = this.value;
        localStorage.setItem('tabName', tabName); // Save the tab name to localStorage
        document.title = tabName || 'Default Title'; // Apply the tab name to the document title
    });

    // Event listener for setting the Favicon URL
    document.getElementById('favicon').addEventListener('change', function() {
        const faviconUrl = this.value;
        localStorage.setItem('faviconUrl', faviconUrl); // Save the favicon URL to localStorage
        if (faviconUrl) {
            const link = document.querySelector("link[rel*='icon']");
            if (link) {
                link.href = faviconUrl; // Update the existing favicon
            } else {
                const link = document.createElement('link');
                link.rel = 'icon';
                link.href = faviconUrl;
                document.head.appendChild(link); // Create a new link element if not already present
            }
        }
    });

    // Event listener for panic key press (optional)
    document.getElementById('panic-key').addEventListener('change', function() {
        const key = this.value;
        localStorage.setItem('panicKey', key); // Save the panic key to localStorage
    });

    // Event listener for setting the Panic URL
    document.getElementById('panic-url').addEventListener('change', function() {
        const url = this.value;
        localStorage.setItem('panicUrl', url); // Save the panic URL to localStorage
    });
    
    // Event listener for Save Settings button
    document.getElementById('save-settings').addEventListener('click', function() {
        // No action needed here, settings are auto-saved
        alert("Settings have been saved!");
    });
});
