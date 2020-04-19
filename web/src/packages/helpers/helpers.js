import { saveAs } from 'file-saver'

export const makeTxtFile = (id, content) => {
  var blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  saveAs(blob, id + '.txt')
}

export const buildFileSelector = () => {
  const fileSelector = document.createElement('input')
  fileSelector.setAttribute('type', 'file')
  fileSelector.setAttribute('multiple', 'multiple')
  return fileSelector
}
