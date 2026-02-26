const firebaseConfig = {
    apiKey: "AIzaSyCFX3eyBvzWe9AqUAh5JRQTSfXGdebpLRc",
    authDomain: "jayblendz-6a82e.firebaseapp.com",
    projectId: "jayblendz-6a82e",
    storageBucket: "jayblendz-6a82e.firebasestorage.app",
    messagingSenderId: "787076804424",
    appId: "1:787076804424:web:01b5d5f82d6a8f274e8d7d",
    measurementId: "G-CR7J6FSQNR"
  };

window.db = null;
window.JBFirebaseReady = false;

(function () {
    const isConfigured = firebaseConfig.projectId !== 'YOUR_PROJECT_ID';
    if (isConfigured && typeof firebase !== 'undefined') {
        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
            window.db = firebase.firestore();
            window.JBFirebaseReady = true;
        } catch (e) {
            console.warn('Firebase init failed:', e.message);
        }
    }
})();
