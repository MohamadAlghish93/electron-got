const titleInput = document.getElementById("apiEndpoint");

async function csvReadFile() {
  //const title = titleInput.value;
  //window.electronAPI.setTitle(title);
  const csv = await window.electronAPI.openFile();

  document.getElementById("logOutput").value = JSON.stringify(csv, null, 2);

  // return csv;
}
