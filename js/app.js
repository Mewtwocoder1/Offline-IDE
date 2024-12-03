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

require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs' } });

    require(['vs/editor/editor.main'], function () {
      // Create the Monaco editor instance
      const editor = monaco.editor.create(document.getElementById('editor'), {
        value: '<html>\n  <head>\n    <title>Monaco with Emmet</title>\n  </head>\n  <body>\n    <h1>Welcome to Monaco!</h1>\n  </body>\n</html>',
        language: 'html'
	theme: 'vs-dark'
      });

      // Initialize Emmet for Monaco
      emmetMonaco.emmetHTML(monaco);

      // Optional: You can trigger Emmet expansion using shortcut
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Space, function() {
        emmetMonaco.expandAbbreviation(editor);
      });
    });
registerServiceWorker();
