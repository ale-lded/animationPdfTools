import { Icon } from '../components/Icon'

type ProgressPageProps = {
  fileCount: number
}

export function ProgressPage({ fileCount }: ProgressPageProps) {
  return (
    <section aria-labelledby="progress-title" className="center-state">
      <div aria-live="polite" className="process-card" role="status">
        <span className="process-icon">
          <Icon name="merge" size={26} />
        </span>
        <h1 id="progress-title">Merging your PDFs</h1>
        <p className="process-card__description">
          Combining {fileCount} {fileCount === 1 ? 'file' : 'files'} on your
          device. Large files can take a while.
        </p>
        <div
          aria-label="Merging your PDFs"
          className="progress-track"
          role="progressbar"
        >
          <span className="progress-track__loop" />
        </div>

      </div>
    </section>
  )
}
