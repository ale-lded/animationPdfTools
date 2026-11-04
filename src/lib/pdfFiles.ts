export const maxFileSize = 100 * 1024 * 1024
export const maxFiles = 20
export const maxTotalSize = 600 * 1024 * 1024

export type RejectedFile = {
  file: File
  reason: 'not-pdf' | 'too-large'
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function isPdf(file: File) {
  return (
    file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
  )
}

function fileKey(file: File) {
  return `${file.name}|${file.size}|${file.lastModified}`
}

/**
 * Adds the incoming files to the current list. Anything that isn't a PDF or is
 * over the size limit is rejected, and files already in the list are skipped.
 * The limits on file count and total size are checked before processing, not
 * here, because adding a file to the list doesn't read it.
 */
export function addPdfFiles(current: File[], incoming: FileList | File[]) {
  const seen = new Set(current.map(fileKey))
  const added: File[] = []
  const rejected: RejectedFile[] = []

  for (const file of Array.from(incoming)) {
    if (!isPdf(file)) {
      rejected.push({ file, reason: 'not-pdf' })
    } else if (file.size > maxFileSize) {
      rejected.push({ file, reason: 'too-large' })
    } else if (!seen.has(fileKey(file))) {
      seen.add(fileKey(file))
      added.push(file)
    }
  }

  return { files: [...current, ...added], added, rejected }
}
