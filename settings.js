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
        document.getElementById('panic-url').value = panicUrl;
        document.getElementById('panic-key').value = panicKey;
    }
});

// Tab Cloak
document.getElementById('tab-name').addEventListener('input', function() {
    const tabName = this.value;
    document.title = tabName;
});

document.getElementById('favicon').addEventListener('input', function() {
    const faviconUrl = this.value;
    const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = faviconUrl;
    document.head.appendChild(favicon);
});

// About:Blank Cloaking
document.getElementById('about-blank').addEventListener('change', function() {
    if (this.checked) {
        window.location.href = 'about:blank';
    }
});

// Panic Key
let selectedPanicKey = '';
document.getElementById('panic-key').addEventListener('keydown', function(e) {
    selectedPanicKey = e.key;
    this.value = e.key; // Display the selected key in the input field
});

// Save Settings
document.getElementById('save-settings').addEventListener('click', function() {
    // Tab Cloak
    const tabName = document.getElementById('tab-name').value;
    const faviconUrl = document.getElementById('favicon').value;
    localStorage.setItem('tabName', tabName);
    localStorage.setItem('faviconUrl', faviconUrl);

    // About:Blank Cloaking
    const aboutBlankEnabled = document.getElementById('about-blank').checked;
    localStorage.setItem('aboutBlankEnabled', JSON.stringify(aboutBlankEnabled));

    // Panic Key
    const panicUrl = document.getElementById('panic-url').value;
    localStorage.setItem('panicKey', selectedPanicKey);
    localStorage.setItem('panicUrl', panicUrl);

    // Setup panic key listener
    setupPanicKey(selectedPanicKey, panicUrl);

    alert('Settings saved successfully!');
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
