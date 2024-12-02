const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("./sw.js");
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};
//End of service worker setup

require.config({
    paths: { vs: 'https://unpkg.com/monaco-editor@0.52.0/min/vs' }
});

require(['vs/editor/editor.main'], function () {
    const editor = monaco.editor.create(document.getElementById('container'), {
        value: '<html>\n\t<head>\n\t\t<title>Emmet Example</title>\n\t</head>\n\t<body>\n\t\t\n\t</body>\n</html>',
        language: 'html',
        theme: 'vs-dark',
        automaticLayout: true,
    });

    // Initialize Emmet plugin
    emmetMonaco.emmetHTML(editor);

    // Optional: Log a success message
    console.log('Monaco Editor with Emmet initialized successfully.');
});
registerServiceWorker();
