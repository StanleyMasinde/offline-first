import './style.css'


/**
 * Register the service worker that controls this application
 */
if ('serviceWorker' in navigator) {
  navigator
    .serviceWorker
    .register('/sw.js')
    .then(registration => {
      console.log(`Service worker registered for scope: ${registration.scope}`);
    })
    .catch(error => {
      // Something went wrong!
      console.log(error)
    })
} else {
  // Service worker is not supported fail gracefully 
}
