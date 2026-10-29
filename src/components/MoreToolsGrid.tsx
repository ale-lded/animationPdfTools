import { moreTools } from '../data/moreTools'
import type { ToolId } from '../types'
import { Icon } from './Icon'

type MoreToolsGridProps = {
  onSelectTool: (tool: ToolId) => void
}

export function MoreToolsGrid({ onSelectTool }: MoreToolsGridProps) {
  return (
    <section
      aria-labelledby="more-tools-title"
      className="more-tools"
      id="more-tools"
    >
      <div className="more-tools__heading">
        <div>
          <p className="eyebrow">Make every page work for you</p>
          <h2 id="more-tools-title">More tools</h2>
        </div>
        <span className="more-tools__count">{moreTools.length} tools</span>
      </div>
      <div className="more-grid">
        {moreTools.map((tool) => (
          <button
            aria-label={`${tool.title}: ${tool.description}`}
            className="more-card"
            key={tool.id}
            onClick={() => onSelectTool(tool.id)}
            type="button"
          >
            <span className="tool-tile">
              <Icon name={tool.icon} />
            </span>
            <strong>{tool.title}</strong>
            <small>{tool.description}</small>
            <span aria-hidden="true" className="more-card__arrow">
              <Icon name="arrow" size={16} />
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
