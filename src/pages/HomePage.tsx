import { useEffect, useRef, useState } from 'react'
import { FileUpload } from '../components/FileUpload'
import { Icon } from '../components/Icon'
// More tools temporarily hidden: restore together with the grid below.
// import { MoreToolsGrid } from '../components/MoreToolsGrid'
import { ToolAccordion } from '../components/ToolAccordion'
import { addPdfFiles, type RejectedFile } from '../lib/pdfFiles'
import type { ToolId } from '../types'

type HomePageProps = {
  files: File[]
  onFilesChange: (files: File[]) => void
  onSelectTool: (tool: ToolId) => void
}

function describeRejected(rejected: RejectedFile[]) {
  if (rejected.length === 0) {
    return null
  }

  const [first] = rejected

  if (rejected.length === 1 && first) {
    return first.reason === 'not-pdf'
      ? `“${first.file.name}” isn’t a PDF, so it wasn’t added.`
      : `“${first.file.name}” is larger than 100 MB, so it wasn’t added.`
  }

  return `${rejected.length} files weren’t added. Choose PDF files no larger than 100 MB each.`
}

export function HomePage({
  files,
  onFilesChange,
  onSelectTool,
}: HomePageProps) {
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const uploadButtonRef = useRef<HTMLButtonElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const replaceOnPick = useRef(false)
  const dragDepth = useRef(0)
  const pendingFocus = useRef<'box' | 'upload' | null>(null)
  const revealNewFiles = useRef(false)
  const revealTools = useRef(false)

  function addFiles(incoming: FileList | File[], replace = false) {
    const result = addPdfFiles(replace ? [] : files, incoming)

    setError(describeRejected(result.rejected))

    if (result.added.length > 0) {
      onFilesChange(result.files)
      revealNewFiles.current = true
      revealTools.current = files.length === 0
    }

    pendingFocus.current =
      result.added.length > 0 || files.length > 0 ? 'box' : null
  }

  function removeFile(file: File) {
    const remaining = files.filter((item) => item !== file)

    setError(null)
    onFilesChange(remaining)
    pendingFocus.current = remaining.length > 0 ? 'box' : 'upload'
  }

  function pickFiles(replace: boolean) {
    replaceOnPick.current = replace
    inputRef.current?.click()
  }

  // Focus and scrolling need the updated list to be on screen first.
  useEffect(() => {
    if (pendingFocus.current === 'box') {
      boxRef.current?.focus({ preventScroll: true })
    } else if (pendingFocus.current === 'upload') {
      uploadButtonRef.current?.focus({ preventScroll: true })
    }

    pendingFocus.current = null

    if (revealNewFiles.current) {
      revealNewFiles.current = false

      // New files join the end of the list, next to the upload button.
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight
      }

      const visual = visualRef.current

      // In the stacked layouts the shelf can be below the fold after the first
      // upload. Later additions keep the list in view.
      if (
        revealTools.current &&
        visual &&
        visual.getBoundingClientRect().top > innerHeight * 0.55
      ) {
        const reduceMotion = matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches

        visual.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'center',
        })
      }
    }
  }, [files, error])

  useEffect(() => {
    const hasFiles = (event: DragEvent) =>
      Array.from(event.dataTransfer?.types ?? []).includes('Files')

    function handleDragEnter(event: DragEvent) {
      if (hasFiles(event)) {
        event.preventDefault()
        dragDepth.current += 1
        setIsDragging(true)
      }
    }

    function handleDragOver(event: DragEvent) {
      if (hasFiles(event)) {
        event.preventDefault()
      }
    }

    function handleDragLeave(event: DragEvent) {
      if (hasFiles(event)) {
        dragDepth.current = Math.max(0, dragDepth.current - 1)

        if (dragDepth.current === 0) {
          setIsDragging(false)
        }
      }
    }

    function handleDrop(event: DragEvent) {
      if (hasFiles(event) && event.dataTransfer) {
        event.preventDefault()
        dragDepth.current = 0
        setIsDragging(false)
        addFiles(event.dataTransfer.files)
      }
    }

    window.addEventListener('dragenter', handleDragEnter)
    window.addEventListener('dragover', handleDragOver)
    window.addEventListener('dragleave', handleDragLeave)
    window.addEventListener('drop', handleDrop)

    return () => {
      window.removeEventListener('dragenter', handleDragEnter)
      window.removeEventListener('dragover', handleDragOver)
      window.removeEventListener('dragleave', handleDragLeave)
      window.removeEventListener('drop', handleDrop)
    }
    // Re-registered with the file list, the only thing addFiles reads.
  }, [files])

  const [firstFile] = files
  const hint =
    files.length === 0
      ? 'Explore the tools'
      : files.length === 1 && firstFile
        ? `Choose what to do with ${firstFile.name}`
        : `Choose what to do with your ${files.length} PDFs`

  return (
    <div className="home-page">
      <section aria-labelledby="hero-title" className="hero">
        <div className="hero__copy">
          <p className="privacy-badge">
            <Icon name="lock" size={16} />
            Your files never leave your device
          </p>
          <h1 id="hero-title">Everything your PDFs need.</h1>
          {files.length === 0 && (
            <p className="hero__description">
              Merge, split, compress and sign, right in your browser.
            </p>
          )}
          <FileUpload
            boxRef={boxRef}
            error={error}
            files={files}
            listRef={listRef}
            onPick={pickFiles}
            onRemove={removeFile}
            uploadButtonRef={uploadButtonRef}
          />
          <input
            accept="application/pdf,.pdf"
            aria-label="Upload PDF files"
            hidden
            multiple
            onChange={(event) => {
              if (event.target.files) {
                addFiles(event.target.files, replaceOnPick.current)
              }

              event.target.value = ''
            }}
            ref={inputRef}
            type="file"
          />
        </div>
        <div className="hero__visual" ref={visualRef}>
          <ToolAccordion
            files={files}
            onAddFile={() => pickFiles(false)}
            onSelectTool={onSelectTool}
          />
          <p
            aria-live="polite"
            className={`hero__hint${files.length > 0 ? ' hero__hint--ready' : ''}`}
            title={firstFile?.name}
          >
            {hint}
          </p>
        </div>
      </section>
      {/* More tools temporarily hidden.
      <MoreToolsGrid onSelectTool={onSelectTool} />
      */}
      {isDragging && (
        <div aria-hidden="true" className="drop-veil">
          Drop your PDFs anywhere
        </div>
      )}
    </div>
  )
}
