import { useState } from 'react'
import { Icon } from '../components/Icon'

type CompressPageProps = {
  onBack: () => void
}

const compressionLevels = [
  {
    id: 'light',
    title: 'Light',
    description: 'Best quality',
    sampleSize: '8.4 MB',
    sampleSaving: '30%',
  },
  {
    id: 'balanced',
    title: 'Balanced',
    description: 'Recommended',
    sampleSize: '3.4 MB',
    sampleSaving: '72%',
  },
  {
    id: 'strong',
    title: 'Strong',
    description: 'Smallest sample size',
    sampleSize: '1.8 MB',
    sampleSaving: '85%',
  },
] as const

type CompressionLevel = (typeof compressionLevels)[number]['id']

export function CompressPage({ onBack }: CompressPageProps) {
  const [level, setLevel] = useState<CompressionLevel>('balanced')
  const [demoMessage, setDemoMessage] = useState<string | null>(null)
  const selectedLevel = compressionLevels.find((item) => item.id === level)

  if (!selectedLevel) {
    throw new Error(`Unknown compression level: ${level}`)
  }

  return (
    <section aria-labelledby="compress-title" className="workspace">
      <button className="back-link" onClick={onBack} type="button">
        <span aria-hidden="true">←</span>
        All tools
      </button>
      <div className="workspace-heading">
        <div>
          <p className="eyebrow">Smaller files, same document</p>
          <h1 id="compress-title">Compress PDF</h1>
          <p className="workspace-heading__description">
            Choose a compression preset for this sample preview.
          </p>
        </div>
        <span aria-hidden="true" className="workspace-heading__art">
          <Icon name="compress" size={40} />
        </span>
      </div>

      <div className="compress-layout">
        <section aria-label="Sample compression comparison" className="compare">
          <div className="compare__heading">
            <strong>Sample document</strong>
            <span>Example only</span>
          </div>
          <div className="compare-label">
            <span>Original · 12 MB</span>
            <span>Sample · {selectedLevel.sampleSize}</span>
          </div>
          <div className="document-preview">
            <span className="document-preview__eyebrow">Folio documents</span>
            <strong>ANNUAL<br />REPORT</strong>
            <span className="document-preview__line" />
            <span className="document-preview__line document-preview__line--short" />
            <span className="document-preview__line" />
            <span className="document-preview__line document-preview__line--medium" />
            <span aria-hidden="true" className="document-preview__divider">↔</span>
          </div>
          <p className="compare__note">
            Sample sizes are illustrative and are not calculated from a PDF.
          </p>
        </section>

        <aside aria-labelledby="compression-level-title" className="options compression">
          <h2 id="compression-level-title">Compression level</h2>
          <fieldset className="compression-levels">
            <legend className="visually-hidden">Choose compression level</legend>
            {compressionLevels.map((option) => (
              <label
                className={`compression-option${level === option.id ? ' compression-option--selected' : ''}`}
                key={option.id}
              >
                <input
                  checked={level === option.id}
                  name="compression-level"
                  onChange={() => {
                    setLevel(option.id)
                    setDemoMessage(null)
                  }}
                  type="radio"
                  value={option.id}
                />
                <span aria-hidden="true" className="compression-option__radio" />
                <span className="compression-option__copy">
                  <strong>{option.title}</strong>
                  <small>{option.description}</small>
                </span>
                <span className="compression-option__size">{option.sampleSize}</span>
              </label>
            ))}
          </fieldset>
          <div className="estimate">
            <span>Sample estimated saving</span>
            <strong>−{selectedLevel.sampleSaving}</strong>
          </div>
          <p className="privacy-note">
            <Icon name="lock" size={14} />
            Prototype only — no file is selected or modified.
          </p>
          <button
            className="button button--primary merge-button"
            onClick={() =>
              setDemoMessage(
                `${selectedLevel.title} preset selected. No PDF was compressed or generated.`,
              )
            }
            type="button"
          >
            Preview this preset
            <Icon name="arrow" size={17} />
          </button>
          {demoMessage && (
            <p className="form-message form-message--info" role="status">
              {demoMessage}
            </p>
          )}
        </aside>
      </div>
    </section>
  )
}
