import { useRef, useState } from 'react'
import { Icon } from '../components/Icon'
import { WorkspaceHeading } from '../components/WorkspaceHeading'
import { addPdfFiles, formatFileSize } from '../lib/pdfFiles'
import type { PageRange } from '../lib/splitPdf'

type SplitMode = 'every-page' | 'every-n' | 'custom'

type SplitPageProps = {
  file: File | null
  onFileChange: (file: File | null) => void
  onStart: (file: File, ranges: PageRange[]) => void
  onBack: () => void
  splitError: string | null
}

export function SplitPage({
  file,
  onFileChange,
  onStart,
  onBack,
  splitError,
}: SplitPageProps) {
  const [mode, setMode] = useState<SplitMode>('every-page')
  const [pagesPerPart, setPagesPerPart] = useState(2)
  const [customRanges, setCustomRanges] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  function chooseFile(fileList: FileList) {
    // Same checks as merge (PDF only, size limit), on a list that starts empty.
    const result = addPdfFiles([], fileList)
    const [chosenFile] = result.added

    if (!chosenFile) {
      setError('Choose a PDF file that is no larger than 100 MB.')
      return
    }

    setError(
      fileList.length > 1
        ? `Split works on one file at a time, so only "${chosenFile.name}" was added.`
        : null,
    )
    onFileChange(chosenFile)
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)
    chooseFile(event.dataTransfer.files)
  }

  // TODO: leggere quante pagine ha il file scelto (serve per "every page" e "every N")

  function getRanges(): PageRange[] {
    // TODO: trasformare la modalità scelta in una lista di PageRange
    return []
  }

  return (
    <section aria-labelledby="split-title" className="workspace">
      <WorkspaceHeading
        description="Choose a PDF, then decide how to divide its pages."
        eyebrow="One file in, several files out"
        icon="split"
        onBack={onBack}
        title="Split PDF"
        titleId="split-title"
      />

      <div className="merge-layout">
        <div className="merge-files">
          {/* 1. scelta del file */}
          {file ? (
            <div className="file-row">
              <span aria-hidden="true" className="file-row__icon">
                <Icon name="file" size={18} />
              </span>
              <span className="file-row__details">
                <strong>{file.name}</strong>
                <small>{formatFileSize(file.size)} · PDF</small>
              </span>
              <div className="file-row__actions">
                <button
                  aria-label={`Remove ${file.name}`}
                  className="icon-button icon-button--remove"
                  onClick={() => {
                    onFileChange(null)
                    setError(null)
                  }}
                  type="button"
                >
                  <Icon name="close" size={16} />
                </button>
              </div>
            </div>
          ) : (
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
                <strong>Drop a PDF here</strong>
                <p>or select one from your device</p>
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
                aria-label="Choose a PDF file"
                className="visually-hidden"
                onChange={(event) => {
                  if (event.currentTarget.files) {
                    chooseFile(event.currentTarget.files)
                    event.currentTarget.value = ''
                  }
                }}
                ref={inputRef}
                type="file"
              />
            </div>
          )}

          {error && (
            <p className="form-message form-message--error" role="alert">
              {error}
            </p>
          )}
          {splitError && (
            <p className="form-message form-message--error" role="alert">
              {splitError}
            </p>
          )}
        </div>

        <aside aria-label="Split options" className="options">
          {/* 2. scelta della modalità */}
          <select
            aria-label="Split mode"
            onChange={(event) => setMode(event.currentTarget.value as SplitMode)}
            value={mode}
          >
            <option value="every-page">Every page</option>
            <option value="every-n">Every N pages</option>
            <option value="custom">Custom ranges</option>
          </select>

          {/* 3. le opzioni della modalità scelta */}
          {mode === 'every-n' && (
            <input
              min={1}
              onChange={(event) => setPagesPerPart(Number(event.currentTarget.value))}
              type="number"
              value={pagesPerPart}
            />
          )}

          {mode === 'custom' && (
            <input
              onChange={(event) => setCustomRanges(event.currentTarget.value)}
              placeholder="1-3, 5, 8-10"
              type="text"
              value={customRanges}
            />
          )}

          {/* 4. avvio */}
          <button
            className="button button--primary"
            disabled={!file}
            onClick={() => {
              if (file) {
                onStart(file, getRanges())
              }
            }}
            type="button"
          >
            Split PDF
            <Icon name="arrow" size={17} />
          </button>
        </aside>
      </div>
    </section>
  )
}
