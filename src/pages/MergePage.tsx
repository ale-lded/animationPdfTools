import { useMemo, useRef, useState } from 'react'
import { Icon } from '../components/Icon'

const maxFileSize = 100 * 1024 * 1024

type SortMode = 'manual' | 'name' | 'date'

type MergePageProps = {
  files: File[]
  onFilesChange: (files: File[]) => void
  onStart: (files: File[]) => void
  onBack: () => void
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function MergePage({
  files,
  onFilesChange,
  onStart,
  onBack,
}: MergePageProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [sortMode, setSortMode] = useState<SortMode>('manual')
  const [keepBookmarks, setKeepBookmarks] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const visibleFiles = useMemo(() => {
    if (sortMode === 'name') {
      return [...files].sort((a, b) => a.name.localeCompare(b.name))
    }

    if (sortMode === 'date') {
      return [...files].sort((a, b) => b.lastModified - a.lastModified)
    }

    return files
  }, [files, sortMode])

  const totalSize = files.reduce((total, file) => total + file.size, 0)

  function addFiles(fileList: FileList | File[]) {
    const incomingFiles = Array.from(fileList)
    const validFiles = incomingFiles.filter((file) => {
      const isPdf =
        file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')

      return isPdf && file.size <= maxFileSize
    })
    const rejectedFiles = incomingFiles.length - validFiles.length

    if (rejectedFiles > 0) {
      setError(
        'Some files were skipped. Choose PDF files that are no larger than 100 MB each.',
      )
    } else {
      setError(null)
    }

    if (validFiles.length > 0) {
      onFilesChange([...files, ...validFiles])
      setSortMode('manual')
    }
  }

  function moveFile(index: number, offset: -1 | 1) {
    const targetIndex = index + offset

    if (targetIndex < 0 || targetIndex >= files.length) {
      return
    }

    const nextFiles = [...files]
    const [movedFile] = nextFiles.splice(index, 1)

    if (movedFile) {
      nextFiles.splice(targetIndex, 0, movedFile)
    }

    onFilesChange(nextFiles)
    setSortMode('manual')
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)
    addFiles(event.dataTransfer.files)
  }

  return (
    <section aria-labelledby="merge-title" className="workspace">
      <button className="back-link" onClick={onBack} type="button">
        <span aria-hidden="true">←</span>
        All tools
      </button>
      <div className="workspace-heading">
        <div>
          <p className="eyebrow">Put everything in the right order</p>
          <h1 id="merge-title">Merge PDFs</h1>
          <p className="workspace-heading__description">
            Select files from your device, then arrange them before you continue.
          </p>
        </div>
        <span aria-hidden="true" className="workspace-heading__art">
          <Icon name="merge" size={40} />
        </span>
      </div>

      <div className="merge-layout">
        <div className="merge-files">
          <div
            className={`upload-box${isDragging ? ' upload-box--active' : ''}`}
            onDragEnter={(event) => {
              event.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={(event) => {
              const nextTarget = event.relatedTarget

              if (
                !(nextTarget instanceof Node) ||
                !event.currentTarget.contains(nextTarget)
              ) {
                setIsDragging(false)
              }
            }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
          >
            <span className="upload-box__icon">
              <Icon name="upload" size={24} />
            </span>
            <div>
              <strong>Drop PDFs here</strong>
              <p>or select files from your device</p>
            </div>
            <button
              className="button button--secondary"
              onClick={() => inputRef.current?.click()}
              type="button"
            >
              Browse files
            </button>
            <input
              accept="application/pdf,.pdf"
              aria-label="Choose PDF files"
              className="visually-hidden"
              multiple
              onChange={(event) => {
                if (event.currentTarget.files) {
                  addFiles(event.currentTarget.files)
                  event.currentTarget.value = ''
                }
              }}
              ref={inputRef}
              type="file"
            />
          </div>
          {error && (
            <p className="form-message form-message--error" role="alert">
              {error}
            </p>
          )}

          <div className="file-list-heading">
            <div>
              <h2>Your files</h2>
              <p>Use the arrows to set the final order.</p>
            </div>
            {files.length > 0 && (
              <label className="sort-control">
                <span>Sort</span>
                <select
                  aria-label="Sort PDF files"
                  onChange={(event) =>
                    setSortMode(
                      event.currentTarget.value === 'name'
                        ? 'name'
                        : event.currentTarget.value === 'date'
                          ? 'date'
                          : 'manual',
                    )
                  }
                  value={sortMode}
                >
                  <option value="manual">Manual order</option>
                  <option value="name">Name A–Z</option>
                  <option value="date">File date</option>
                </select>
              </label>
            )}
          </div>

          {files.length === 0 ? (
            <div className="file-empty-state">
              <span className="icon-disc">
                <Icon name="file" />
              </span>
              <strong>No PDFs selected yet</strong>
              <p>Add two or more files to prepare a merge.</p>
            </div>
          ) : (
            <ol aria-label="PDF merge order" className="file-list">
              {visibleFiles.map((file, index) => (
                <li className="file-row" key={`${file.name}-${file.lastModified}-${index}`}>
                  <span className="file-row__number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span aria-hidden="true" className="file-row__icon">
                    <Icon name="file" size={18} />
                  </span>
                  <span className="file-row__details">
                    <strong>{file.name}</strong>
                    <small>{formatFileSize(file.size)} · PDF</small>
                  </span>
                  <div className="file-row__actions">
                    <button
                      aria-label={`Move ${file.name} up`}
                      className="icon-button"
                      disabled={index === 0 || sortMode !== 'manual'}
                      onClick={() => moveFile(index, -1)}
                      type="button"
                    >
                      ↑
                    </button>
                    <button
                      aria-label={`Move ${file.name} down`}
                      className="icon-button"
                      disabled={
                        index === visibleFiles.length - 1 || sortMode !== 'manual'
                      }
                      onClick={() => moveFile(index, 1)}
                      type="button"
                    >
                      ↓
                    </button>
                    <button
                      aria-label={`Remove ${file.name}`}
                      className="icon-button icon-button--remove"
                      onClick={() => {
                        onFilesChange(
                          files.filter((candidate) => candidate !== file),
                        )
                      }}
                      type="button"
                    >
                      <Icon name="close" size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>

        <aside aria-label="Merge options" className="options">
          <div className="options__heading">
            <h2>Ready to merge</h2>
            <p>
              {files.length} {files.length === 1 ? 'file' : 'files'}
              {files.length > 0 && <> · {formatFileSize(totalSize)}</>}
            </p>
          </div>
          <div className="options__divider" />
          <div className="toggle-row">
            <span>
              <strong>Keep bookmarks</strong>
              <small>Preserve document outlines</small>
            </span>
            <button
              aria-checked={keepBookmarks}
              aria-label="Keep bookmarks"
              className={`switch${keepBookmarks ? ' switch--on' : ''}`}
              onClick={() => setKeepBookmarks((current) => !current)}
              role="switch"
              type="button"
            >
              <span />
            </button>
          </div>
          <p className="privacy-note">
            <Icon name="lock" size={14} />
            Demo only — files are not processed or uploaded.
          </p>
          <button
            className="button button--primary merge-button"
            disabled={files.length < 2}
            onClick={() => onStart(files)}
            type="button"
          >
            Continue
            <Icon name="arrow" size={17} />
          </button>
          <button
            className="button button--ghost clear-button"
            disabled={files.length === 0}
            onClick={() => {
              onFilesChange([])
              setError(null)
            }}
            type="button"
          >
            Clear all
          </button>
        </aside>
      </div>
    </section>
  )
}
