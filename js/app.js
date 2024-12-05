if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('Service Worker Registered!'))
    .catch(err => console.error('Service Worker Registration Failed:', err));
}
//End of service worker setup

require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs' } });

    require(['vs/editor/editor.main'], function () {
      // Create the Monaco editor instance
      const editor = monaco.editor.create(document.getElementById('editor'), {
        value: '',
        language: 'html',
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
