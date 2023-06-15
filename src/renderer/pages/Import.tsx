export default function Import() {
  return (
    <>
      <h1>Import</h1>
      <button
        type="button"
        onClick={() => window.electron.ipcRenderer.sendMessage('import-file')}
      >
        Import
      </button>
    </>
  );
}
