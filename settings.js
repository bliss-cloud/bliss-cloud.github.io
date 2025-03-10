// Initialize the settings when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load saved settings
    const panicKey = localStorage.getItem('panicKey');
    const panicUrl = localStorage.getItem('panicUrl');
    const aboutBlank = localStorage.getItem('aboutBlank') === 'true';
    const tabName = localStorage.getItem('tabName');
    const faviconUrl = localStorage.getItem('faviconUrl');

    // Set values on page load
    if (panicKey) {
        document.getElementById('panic-key').value = panicKey;
    }
    if (panicUrl) {
        document.getElementById('panic-url').value = panicUrl;
    }
    if (aboutBlank) {
        document.getElementById('about-blank').checked = true;
    }
    if (tabName) {
        document.getElementById('tab-name').value = tabName;
    }
    if (faviconUrl) {
        document.getElementById('favicon').value = faviconUrl;
    }

    // Event listener for the panic key
    document.getElementById('panic-key').addEventListener('change', function() {
        const key = this.value;
        localStorage.setItem('panicKey', key);
    });

    // Event listener for the panic URL
    document.getElementById('panic-url').addEventListener('change', function() {
        const url = this.value;
        localStorage.setItem('panicUrl', url);
    });

    // Event listener for the About:Blank cloaking switch
    document.getElementById('about-blank').addEventListener('change', function() {
        const aboutBlank = this.checked;
        localStorage.setItem('aboutBlank', aboutBlank);

        if (aboutBlank) {
            // Open current page in an iframe inside about:blank
            const iframeContent = `
                <html>
                    <head>
                        <title>About:Blank Cloaking</title>
                        <style>
                            body {
                                margin: 0;
                                padding: 0;
                                height: 100%;
                                background-color: #111;
                            }
                            iframe {
                                width: 100%;
                                height: 100%;
                                border: none;
                            }
                        </style>
                    </head>
                    <body>
                        <iframe src="${window.location.href}"></iframe>
                    </body>
                </html>
            `;

            // Open a new about:blank window and inject the iframe
            const aboutBlankWindow = window.open('about:blank', '_blank');
            aboutBlankWindow.document.open();
            aboutBlankWindow.document.write(iframeContent);
            aboutBlankWindow.document.close();
        }
    });

    // Event listener for saving Tab Name and Favicon
    document.getElementById('tab-name').addEventListener('change', function() {
        const tabName = this.value;
        localStorage.setItem('tabName', tabName);
        document.title = tabName || 'Default Title';
    });

    document.getElementById('favicon').addEventListener('change', function() {
        const faviconUrl = this.value;
        localStorage.setItem('faviconUrl', faviconUrl);
        if (faviconUrl) {
            const link = document.querySelector("link[rel*='icon']");
            if (link) {
                link.href = faviconUrl;
            } else {
                const link = document.createElement('link');
                link.rel = 'icon';
                link.href = faviconUrl;
                document.head.appendChild(link);
            }
        }
    });

    // Set the favicon initially
    const faviconUrlLoaded = localStorage.getItem('faviconUrl');
    if (faviconUrlLoaded) {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = faviconUrlLoaded;
        document.head.appendChild(link);
    }

    // Event listener for panic key press
    window.addEventListener('keydown', function(event) {
        const panicKey = localStorage.getItem('panicKey');
        if (event.key === panicKey) {
            const panicUrl = localStorage.getItem('panicUrl');
            if (panicUrl) {
                window.location.href = panicUrl;
            }
        }
    });

    // Event listener for Save Settings button
    document.getElementById('save-settings').addEventListener('click', function() {
        // No action needed here, since settings are auto-saved on change
        alert("Settings have been saved!");
    });
});
