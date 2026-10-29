import { useState } from 'react'
import { featuredTools } from '../data/tools'
import type { ToolId } from '../types'
import { Icon } from './Icon'

type ToolAccordionProps = {
  onSelectTool: (tool: ToolId) => void
}

export function ToolAccordion({ onSelectTool }: ToolAccordionProps) {
  const [activeTool, setActiveTool] = useState<ToolId>('merge')

  return (
    <div aria-label="Featured PDF tools" className="tool-accordion">
      {featuredTools.map((tool) => {
        const isActive = tool.id === activeTool

        return (
          <article
            className={`accordion-panel${isActive ? ' accordion-panel--active' : ''}`}
            key={tool.id}
            onMouseEnter={() => setActiveTool(tool.id)}
          >
            <div aria-hidden="true" className={`paper-art paper-art--${tool.id}`}>
              <span className="paper-art__page paper-art__page--one" />
              <span className="paper-art__page paper-art__page--two" />
              <span className="paper-art__page paper-art__page--three" />
              <span className="paper-art__glow" />
            </div>
            <button
              aria-controls={`tool-panel-${tool.id}`}
              aria-expanded={isActive}
              aria-label={`${isActive ? 'Selected' : 'Show'} ${tool.title} tool`}
              className="accordion-panel__toggle"
              onClick={() => setActiveTool(tool.id)}
              onFocus={() => setActiveTool(tool.id)}
              type="button"
            >
              <span className="icon-disc">
                <Icon name={tool.icon} />
              </span>
              {!isActive && (
                <span className="accordion-panel__collapsed-title">
                  {tool.title}
                </span>
              )}
            </button>
            {isActive && (
              <div
                aria-labelledby={`tool-heading-${tool.id}`}
                className="accordion-panel__content"
                id={`tool-panel-${tool.id}`}
                role="region"
              >
                <div className="accordion-panel__copy">
                  <h2 id={`tool-heading-${tool.id}`}>{tool.title}</h2>
                  <p>{tool.description}</p>
                </div>
                <ul aria-label={`${tool.title} highlights`} className="feature-pills">
                  {tool.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <button
                  className="button button--primary accordion-panel__action"
                  onClick={() => onSelectTool(tool.id)}
                  type="button"
                >
                  {tool.action}
                  <Icon name="arrow" size={17} />
                </button>
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
