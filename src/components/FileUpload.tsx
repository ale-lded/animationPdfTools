import type { Ref } from 'react'
import { formatFileSize } from '../lib/pdfFiles'
import { Icon } from './Icon'

type FileUploadProps = {
  files: File[]
  error: string | null
  onPick: (replace: boolean) => void
  onRemove: (file: File) => void
  uploadButtonRef: Ref<HTMLButtonElement>
  boxRef: Ref<HTMLDivElement>
  listRef: Ref<HTMLUListElement>
}

export function FileUpload({
  files,
  error,
  onPick,
  onRemove,
  uploadButtonRef,
  boxRef,
  listRef,
}: FileUploadProps) {
  const count = files.length
  const totalSize = files.reduce((total, file) => total + file.size, 0)
  const title = count === 1 ? 'Your file is ready' : `${count} PDFs ready`

  return (
    <div className="upload-stack">
      {count === 0 ? (
        <div className="drop-zone">Drop your PDFs here</div>
      ) : (
        <div
          aria-label={title}
          className="file-box"
          ref={boxRef}
          role="group"
          tabIndex={-1}
        >
          <div className="file-box__head">
            <p className="file-box__title">{title}</p>
            {count > 1 && (
              <span className="file-box__total">
                {formatFileSize(totalSize)} total
              </span>
            )}
            <button
              className="file-box__replace"
              onClick={() => onPick(true)}
              type="button"
            >
              {count === 1 ? 'Replace' : 'Replace all'}
            </button>
          </div>
          <ul className="file-box__list" ref={listRef}>
            {files.map((file) => (
              <li
                className="file-box__row"
                key={`${file.name}|${file.size}|${file.lastModified}`}
              >
                <span className="file-box__icon">
                  <Icon name="file" size={15} />
                </span>
                <span className="file-box__name" title={file.name}>
                  {file.name}
                </span>
                <span className="file-box__size">
                  {formatFileSize(file.size)}
                </span>
                <button
                  aria-label={`Remove ${file.name}`}
                  className="file-box__remove"
                  onClick={() => onRemove(file)}
                  type="button"
                >
                  <Icon name="close" size={15} />
                </button>
              </li>
            ))}
          </ul>
          <p className="file-box__note">
            Stays on this device. Refreshing the page clears it.
          </p>
        </div>
      )}
      {error && (
        <p className="upload-error" role="alert">
          {error}
        </p>
      )}
      <div className="hero__actions">
        <button
          className="button button--primary button--large"
          onClick={() => onPick(false)}
          ref={uploadButtonRef}
          type="button"
        >
          <Icon name="upload" />
          {count === 0 ? 'Upload a PDF' : 'Add more PDFs'}
        </button>
        <a className="button button--ghost button--large" href="#more-tools">
          See all tools
        </a>
      </div>
    </div>
  )
}
