import { Icon } from '../components/Icon'

type ResultPageProps = {
  files: File[]
  onRetry: () => void
  onHome: () => void
}

export function ResultPage({ files, onRetry, onHome }: ResultPageProps) {
  return (
    <section aria-labelledby="result-title" className="center-state">
      <div className="result-card">
        <span aria-hidden="true" className="result-icon">
          <Icon name="check" size={28} />
        </span>
        <p className="eyebrow">Prototype preview</p>
        <h1 id="result-title">That is the end of the demo.</h1>
        <p className="result-card__description">
          The merge flow was previewed with {files.length}{' '}
          {files.length === 1 ? 'selected file' : 'selected files'}. No combined
          PDF was generated.
        </p>
        <div className="result-file-list">
          {files.map((file, index) => (
            <div
              className="result-file"
              key={`${file.name}-${file.lastModified}-${index}`}
            >
              <span className="file-row__icon">
                <Icon name="file" size={18} />
              </span>
              <span>
                <strong>{file.name}</strong>
                <small>Demo input · unchanged</small>
              </span>
            </div>
          ))}
        </div>
        <div className="result-actions">
          <button
            className="button button--primary"
            onClick={onRetry}
            type="button"
          >
            Back to merge
          </button>
          <button
            className="button button--secondary"
            onClick={onHome}
            type="button"
          >
            All tools
          </button>
        </div>
      </div>
    </section>
  )
}
