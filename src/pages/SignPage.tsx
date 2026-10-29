import { useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { Icon } from '../components/Icon'

type SignatureMode = 'draw' | 'type' | 'upload'

type SignPageProps = {
  onBack: () => void
}

export function SignPage({ onBack }: SignPageProps) {
  const [mode, setMode] = useState<SignatureMode>('draw')
  const [typedName, setTypedName] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageName, setImageName] = useState<string | null>(null)
  const [drawnSignature, setDrawnSignature] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawing = useRef(false)

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl)
      }
    }
  }, [imageUrl])

  function getCanvasPoint(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current
    const bounds = canvas?.getBoundingClientRect()

    if (!canvas || !bounds) {
      return null
    }

    return {
      x: (event.clientX - bounds.left) * (canvas.width / bounds.width),
      y: (event.clientY - bounds.top) * (canvas.height / bounds.height),
    }
  }

  function startDrawing(event: PointerEvent<HTMLCanvasElement>) {
    if (mode !== 'draw') {
      return
    }

    const canvas = canvasRef.current
    const point = getCanvasPoint(event)
    const context = canvas?.getContext('2d')

    if (!canvas || !point || !context) {
      return
    }

    event.currentTarget.setPointerCapture(event.pointerId)
    isDrawing.current = true
    context.beginPath()
    context.moveTo(point.x, point.y)
  }

  function continueDrawing(event: PointerEvent<HTMLCanvasElement>) {
    if (!isDrawing.current) {
      return
    }

    const point = getCanvasPoint(event)
    const context = canvasRef.current?.getContext('2d')

    if (!point || !context) {
      return
    }

    context.strokeStyle = '#ff5b14'
    context.lineWidth = 2.5
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.lineTo(point.x, point.y)
    context.stroke()
  }

  function finishDrawing() {
    if (!isDrawing.current) {
      return
    }

    isDrawing.current = false
    const canvas = canvasRef.current

    if (canvas) {
      setDrawnSignature(canvas.toDataURL('image/png'))
    }
  }

  function clearSignature() {
    setMessage(null)
    setDrawnSignature(null)
    setTypedName('')
    setImageUrl(null)
    setImageName(null)

    const context = canvasRef.current?.getContext('2d')
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }

  function chooseSignatureImage(file: File | undefined) {
    if (!file) {
      return
    }

    if (!file.type.startsWith('image/')) {
      setMessage('Choose an image file for the signature preview.')
      return
    }

    setImageUrl(URL.createObjectURL(file))
    setImageName(file.name)
    setMessage(null)
  }

  const signaturePreview =
    mode === 'type'
      ? typedName
      : mode === 'upload'
        ? imageUrl
        : drawnSignature

  return (
    <section aria-labelledby="sign-title" className="workspace sign-page">
      <button className="back-link" onClick={onBack} type="button">
        <span aria-hidden="true">←</span>
        All tools
      </button>
      <div className="workspace-heading">
        <div>
          <p className="eyebrow">Add your signature</p>
          <h1 id="sign-title">Sign PDF</h1>
          <p className="workspace-heading__description">
            Create a signature preview on this sample document.
          </p>
        </div>
        <span aria-hidden="true" className="workspace-heading__art">
          <Icon name="sign" size={40} />
        </span>
      </div>

      <div className="sign-layout">
        <aside aria-label="Signature options" className="sign-controls">
          <div aria-label="Signature method" className="signature-tabs" role="tablist">
            {(['draw', 'type', 'upload'] as const).map((option) => (
              <button
                aria-selected={mode === option}
                className={`signature-tab${mode === option ? ' signature-tab--selected' : ''}`}
                id={`signature-tab-${option}`}
                key={option}
                onClick={() => {
                  setMode(option)
                  setMessage(null)
                }}
                role="tab"
                type="button"
              >
                <Icon
                  name={option === 'draw' ? 'draw' : option === 'type' ? 'type' : 'upload'}
                  size={15}
                />
                {option === 'draw' ? 'Draw' : option === 'type' ? 'Type' : 'Upload'}
              </button>
            ))}
          </div>

          <div
            aria-labelledby={`signature-tab-${mode}`}
            className="signature-panel"
            role="tabpanel"
          >
            {mode === 'draw' ? (
              <>
                <p className="signature-instruction">Draw with your mouse or finger.</p>
                <canvas
                  aria-label="Draw your signature in this area"
                  className="signature-canvas"
                  height={160}
                  onPointerCancel={finishDrawing}
                  onPointerDown={startDrawing}
                  onPointerMove={continueDrawing}
                  onPointerUp={finishDrawing}
                  ref={canvasRef}
                  width={560}
                />
              </>
            ) : mode === 'type' ? (
              <label className="signature-input-label">
                Type your name
                <input
                  autoComplete="name"
                  maxLength={80}
                  onChange={(event) => setTypedName(event.currentTarget.value)}
                  placeholder="Your name"
                  type="text"
                  value={typedName}
                />
              </label>
            ) : (
              <label className="signature-upload">
                <Icon name="upload" size={22} />
                <strong>{imageName ?? 'Choose a signature image'}</strong>
                <small>PNG, JPG, or another image format</small>
                <input
                  accept="image/*"
                  className="visually-hidden"
                  onChange={(event) =>
                    chooseSignatureImage(event.currentTarget.files?.[0])
                  }
                  type="file"
                />
              </label>
            )}
          </div>

          <div className="sign-controls__actions">
            <button
              className="button button--secondary"
              onClick={clearSignature}
              type="button"
            >
              Clear signature
            </button>
            <button
              className="button button--primary"
              onClick={() => {
                if (!signaturePreview) {
                  setMessage('Add a signature preview before continuing.')
                  return
                }

                setMessage(
                  'Signature preview ready. No PDF was signed or generated.',
                )
              }}
              type="button"
            >
              Add signature
              <Icon name="arrow" size={16} />
            </button>
          </div>
          {message && (
            <p
              className={`form-message${signaturePreview ? ' form-message--info' : ' form-message--error'}`}
              role={signaturePreview ? 'status' : 'alert'}
            >
              {message}
            </p>
          )}
          <p className="privacy-note">
            <Icon name="lock" size={14} />
            Demo only — no document is selected or modified.
          </p>
        </aside>

        <section aria-label="Sample document signature preview" className="sign-preview">
          <article className="contract">
            <p className="contract__eyebrow">Folio documents</p>
            <h2>Independent contractor agreement</h2>
            <p>
              This sample document is for preview purposes only. It demonstrates
              how a signature could appear in the final layout.
            </p>
            <p>
              The preview does not represent a signed contract and does not
              change or create a PDF file.
            </p>
            <div className="contract__signature-area">
              <span>Signature</span>
              {mode === 'upload' && imageUrl ? (
                <img alt="Selected signature preview" src={imageUrl} />
              ) : mode === 'draw' && drawnSignature ? (
                <img alt="Drawn signature preview" src={drawnSignature} />
              ) : mode === 'type' && typedName ? (
                <span className="contract__typed-signature">{typedName}</span>
              ) : (
                <span className="contract__signature-placeholder">
                  Signature preview appears here
                </span>
              )}
              <span className="contract__signature-line" />
            </div>
          </article>
        </section>
      </div>
    </section>
  )
}
