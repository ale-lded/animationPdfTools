import { Icon } from '../components/Icon'
import { moreTools } from '../data/moreTools'
import { featuredTools } from '../data/tools'
import type { ToolId } from '../types'

type ToolPlaceholderProps = {
  tool: ToolId
  onBack: () => void
}

export function ToolPlaceholder({ tool, onBack }: ToolPlaceholderProps) {
  const metadata =
    featuredTools.find((item) => item.id === tool) ??
    moreTools.find((item) => item.id === tool)

  if (!metadata) {
    throw new Error(`Unknown PDF tool: ${tool}`)
  }

  return (
    <section aria-labelledby="tool-placeholder-title" className="tool-placeholder">
      <button className="back-link" onClick={onBack} type="button">
        <span aria-hidden="true">←</span>
        All tools
      </button>
      <div className="tool-placeholder__card">
        <span className="icon-disc">
          <Icon name={metadata.icon} size={24} />
        </span>
        <p className="eyebrow">Folio PDF</p>
        <h1 id="tool-placeholder-title">{metadata.title}</h1>
        <p>
          This tool is represented in the interface prototype. Its PDF workflow
          is not implemented, and no files are processed.
        </p>
        <button className="button button--secondary" onClick={onBack} type="button">
          Back to all tools
        </button>
      </div>
    </section>
  )
}
