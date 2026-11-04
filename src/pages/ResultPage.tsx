import { Icon } from '../components/Icon'
import { downloadFile } from '../lib/downloadFile'
import { formatFileSize } from '../lib/pdfFiles'

type ResultPageProps = {
  files: File[]
  mergedPdf: Blob | null
  onRetry: () => void
  onHome: () => void
}

export function ResultPage({ files, mergedPdf, onRetry, onHome }: ResultPageProps) {
  return (
    <section aria-labelledby="result-title" className="center-state">
      <div className="result-card">
        <span aria-hidden="true" className="result-icon">
          <Icon name="check" size={28} />
        </span>
        <h1 id="result-title">Your PDF is ready</h1>
        <p className="result-card__description">
          {files.length} files merged
          {mergedPdf && <> · {formatFileSize(mergedPdf.size)}</>}
        </p>
        <div className="result-actions">
          <button
            className="button button--primary"
            disabled={!mergedPdf}
            onClick={() => mergedPdf && downloadFile(mergedPdf, 'merged.pdf')}
            type="button"
          >
            Download PDF
          </button>
          <button className="button button--secondary" onClick={onRetry} type="button">
            Back to merge
          </button>
          <button className="button button--ghost" onClick={onHome} type="button">
            All tools
          </button>
        </div>
      </div>
    </section>
  )
}
