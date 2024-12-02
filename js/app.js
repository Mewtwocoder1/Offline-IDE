const originalConsoleLog = console.log;
const logs = [];
var theDiv = document.getElementById("#consoleLog");
var content = document.createTextNode('Console:');

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

console.log = function(...args) {
  logs.push(args);
  theDiv.appendChild(content);
};

//End of service worker setup

require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@latest/min/vs' }});
window.MonacoEnvironment = { getWorkerUrl: () => proxy };

let proxy = URL.createObjectURL(new Blob([`
	self.MonacoEnvironment = {
		baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
	};
	importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');
`], { type: 'text/javascript' }));

require(["vs/editor/editor.main"], function () {
	let editor = monaco.editor.create(document.getElementById('container'), {
		value: [
			'function x() {',
			'\tconsole.log("Hello world!");',
			'}'
		].join('\n'),
		language: 'javascript',
		theme: 'vs-dark'
	});
});
registerServiceWorker();
