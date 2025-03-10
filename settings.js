// Load settings from localStorage when the page loads
window.addEventListener('load', function() {
    // Tab Name & Favicon
    const tabName = localStorage.getItem('tabName');
    const faviconUrl = localStorage.getItem('faviconUrl');
    if (tabName) document.title = tabName;
    if (faviconUrl) {
        const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
        favicon.rel = 'icon';
        favicon.href = faviconUrl;
        document.head.appendChild(favicon);
    }

    // About:Blank Cloaking
    const aboutBlankEnabled = JSON.parse(localStorage.getItem('aboutBlankEnabled'));
    if (aboutBlankEnabled) {
        window.location.href = 'about:blank';
    }
    document.getElementById('about-blank').checked = aboutBlankEnabled;

    // Panic Key & URL
    const panicKey = localStorage.getItem('panicKey');
    const panicUrl = localStorage.getItem('panicUrl');
    if (panicKey && panicUrl) {
        setupPanicKey(panicKey, panicUrl);
        document.getElementById('panic-key').value = panicKey;
        document.getElementById('panic-url').value = panicUrl;
    }
});

// Tab Cloak
document.getElementById('tab-name').addEventListener('input', function() {
    const tabName = this.value;
    document.title = tabName;
    localStorage.setItem('tabName', tabName);
});

document.getElementById('favicon').addEventListener('input', function() {
    const faviconUrl = this.value;
    const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = faviconUrl;
    document.head.appendChild(favicon);
    localStorage.setItem('faviconUrl', faviconUrl);
});

// About:Blank Cloaking
document.getElementById('about-blank').addEventListener('change', function() {
    const aboutBlankEnabled = this.checked;
    localStorage.setItem('aboutBlankEnabled', JSON.stringify(aboutBlankEnabled));
    if (aboutBlankEnabled) {
        window.location.href = 'about:blank';
    }
});

// Panic Key
document.getElementById('panic-key').addEventListener('change', function() {
    const panicKey = this.value;
    const panicUrl = document.getElementById('panic-url').value;
    localStorage.setItem('panicKey', panicKey);
    localStorage.setItem('panicUrl', panicUrl);
    setupPanicKey(panicKey, panicUrl);
});

document.getElementById('panic-url').addEventListener('input', function() {
    const panicUrl = this.value;
    const panicKey = document.getElementById('panic-key').value;
    localStorage.setItem('panicUrl', panicUrl);
    setupPanicKey(panicKey, panicUrl);
});

// Setup panic key listener
function setupPanicKey(panicKey, panicUrl) {
    document.removeEventListener('keydown', panicKeyListener); // Remove old listener
    document.addEventListener('keydown', panicKeyListener);

    function panicKeyListener(e) {
        if (e.key === panicKey) {
            window.location.href = panicUrl;
        }
    }
}
