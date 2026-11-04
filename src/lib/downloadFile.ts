export function downloadFile(file: Blob, fileName: string) {
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()

  // Libera l'indirizzo temporaneo, lasciando al browser il tempo di avviare il download.
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
