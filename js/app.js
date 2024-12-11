// Service worker registration is handled in index.html

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

  // Optional: You can trigger Emmet expansion using a shortcut
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Space, function() {
    emmetMonaco.expandAbbreviation(editor);
  });
});
