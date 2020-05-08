const defaults = {
  'SPS-Projects': [],
  'SPS-Settings': []
}

function loadFromStorage(category) {
  let data = localStorage.getItem(category)
  if (data === null) {
    data = JSON.stringify(defaults[category])
    localStorage.setItem(category, data)
  }

  return JSON.parse(data)
}

function saveToStorage(category, data) {
  localStorage.setItem(category, JSON.stringify(data))
}

function download(name, type, data) {
  let blob = new Blob([data], { type });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, name)
  }
  else {
    let elem = window.document.createElement('a')
    elem.href = window.URL.createObjectURL(blob)
    elem.download = name
    document.body.appendChild(elem)
    elem.click()
    document.body.removeChild(elem)
  }
}

export { loadFromStorage, saveToStorage, download }
