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

require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.42.0/min/vs' } });
require(['vs/editor/editor.main'], function () {
	const editor = monaco.editor.create(document.getElementById('container'), {
		value: [].join('\n'),
		language: 'html',
		theme: 'vs-dark'
	});
	emmetMonaco.emmetHTML(editor);
	window.myEditor = editor;
});

registerServiceWorker();
