import { useEffect, useState } from 'react'
import { Icon } from '../components/Icon'

type ProgressPageProps = {
  fileCount: number
  onCancel: () => void
  onComplete: () => void
}

export function ProgressPage({
  fileCount,
  onCancel,
  onComplete,
}: ProgressPageProps) {
  const [progress, setProgress] = useState(8)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setProgress((currentProgress) => Math.min(currentProgress + 7, 92))
    }, 140)
    const timeoutId = window.setTimeout(() => {
      window.clearInterval(intervalId)
      setProgress(100)
      onComplete()
    }, 1900)

    return () => {
      window.clearInterval(intervalId)
      window.clearTimeout(timeoutId)
    }
  }, [onComplete])

  return (
    <section aria-labelledby="progress-title" className="center-state">
      <div aria-live="polite" className="process-card" role="status">
        <span className="process-icon">
          <Icon name="merge" size={26} />
        </span>
        <p className="eyebrow">Prototype preview</p>
        <h1 id="progress-title">Previewing the merge flow</h1>
        <p className="process-card__description">
          This is a simulated progress screen. Your {fileCount}{' '}
          {fileCount === 1 ? 'file is' : 'files are'} not being processed.
        </p>
        <div className="progress-label">
          <span>Demo progress</span>
          <strong>{progress}%</strong>
        </div>
        <div
          aria-label={`Demo progress ${progress}%`}
          className="progress-track"
          role="progressbar"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={progress}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="process-card__note">
          No PDF is uploaded, changed, or generated.
        </p>
        <button className="button button--ghost" onClick={onCancel} type="button">
          Cancel preview
        </button>
      </div>
    </section>
  )
}
