// Browser compatibility script
(function() {
  // Check if browser is not defined
  if (typeof window.browser === 'undefined') {
    // Create a browser polyfill
    window.browser = {
      // Add common browser API methods that might be needed
      runtime: {
        sendMessage: function() {
          console.warn('Browser runtime sendMessage polyfill called');
          return Promise.resolve({});
        },
        onMessage: {
          addListener: function() {
            console.warn('Browser runtime onMessage.addListener polyfill called');
          },
          removeListener: function() {
            console.warn('Browser runtime onMessage.removeListener polyfill called');
          }
        }
      },
      storage: {
        local: {
          get: function() {
            console.warn('Browser storage.local.get polyfill called');
            return Promise.resolve({});
          },
          set: function() {
            console.warn('Browser storage.local.set polyfill called');
            return Promise.resolve();
          }
        },
        sync: {
          get: function() {
            console.warn('Browser storage.sync.get polyfill called');
            return Promise.resolve({});
          },
          set: function() {
            console.warn('Browser storage.sync.set polyfill called');
            return Promise.resolve();
          }
        }
      },
      tabs: {
        query: function() {
          console.warn('Browser tabs.query polyfill called');
          return Promise.resolve([]);
        },
        sendMessage: function() {
          console.warn('Browser tabs.sendMessage polyfill called');
          return Promise.resolve();
        },
        create: function() {
          console.warn('Browser tabs.create polyfill called');
          return Promise.resolve({});
        }
      }
    };

    // Chrome compatibility (some scripts check for chrome)
    if (typeof window.chrome === 'undefined') {
      window.chrome = {
        runtime: window.browser.runtime,
        storage: window.browser.storage,
        tabs: window.browser.tabs
      };
    }
  }
})(); 