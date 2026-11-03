import { useState } from 'react'
import { featuredTools } from '../data/tools'
import type { ToolId } from '../types'
import { Icon } from './Icon'

type ToolAccordionProps = {
  files: File[]
  onAddFile: () => void
  onSelectTool: (tool: ToolId) => void
}

function getFrontPage(tool: ToolId) {
  return tool === 'merge' || tool === 'compress' ? 'two' : 'three'
}

export function ToolAccordion({
  files,
  onAddFile,
  onSelectTool,
}: ToolAccordionProps) {
  const [activeTool, setActiveTool] = useState<ToolId>('merge')
  const fileCount = files.length
  const [previousFileCount, setPreviousFileCount] = useState(fileCount)

  // Reaching two files is the moment Merge becomes the obvious next step.
  if (fileCount !== previousFileCount) {
    setPreviousFileCount(fileCount)

    if (previousFileCount < 2 && fileCount >= 2) {
      setActiveTool('merge')
    }
  }

  const sheetName =
    fileCount === 1 ? files[0]?.name : fileCount > 1 ? `${fileCount} PDFs` : null

  return (
    <div aria-label="Featured PDF tools" className="tool-accordion">
      {featuredTools.map((tool) => {
        const isActive = tool.id === activeTool
        const frontPage = getFrontPage(tool.id)
        const actionLabel =
          fileCount === 0
            ? tool.action
            : fileCount === 1
              ? tool.actionOneFile
              : tool.actionManyFiles(fileCount)

        return (
          <article
            className={`accordion-panel accordion-panel--${tool.id}${isActive ? ' accordion-panel--active' : ''}`}
            key={tool.id}
            onMouseEnter={() => setActiveTool(tool.id)}
          >
            <div aria-hidden="true" className={`paper-art paper-art--${tool.id}`}>
              <span className="paper-art__page paper-art__page--one" />
              <span className="paper-art__page paper-art__page--two">
                {frontPage === 'two' && sheetName && (
                  <span className="paper-art__name">{sheetName}</span>
                )}
              </span>
              <span className="paper-art__page paper-art__page--three">
                {frontPage === 'three' && sheetName && (
                  <span className="paper-art__name">{sheetName}</span>
                )}
                {tool.id === 'sign' && (
                  <svg
                    aria-hidden="true"
                    className="paper-art__signature"
                    viewBox="0 0 100 48"
                  >
                    <path
                      className="paper-art__signature-path"
                      d="M4 34 C10 28 12 13 16 13 C20 13 13 36 20 34 C25 32 28 22 32 22 C37 22 31 37 37 34 C43 31 43 22 48 22 C54 22 47 36 54 34 C63 31 66 17 70 18 C75 19 65 34 72 34 C79 34 84 26 89 23 C93 21 96 24 99 22 M68 39 C77 34 87 31 97 30"
                      pathLength={1}
                    />
                  </svg>
                )}
                {tool.id === 'protect' && (
                  <svg
                    aria-hidden="true"
                    className="paper-art__protection"
                    viewBox="0 0 64 64"
                  >
                    <path
                      className="paper-art__protection-shield"
                      d="M32 4 53 12v16c0 14-8 24-21 32C19 52 11 42 11 28V12L32 4Z"
                      pathLength={1}
                    />
                    <g className="paper-art__protection-lock">
                      <path
                        className="paper-art__protection-shackle"
                        d="M23 29v-7a9 9 0 0 1 18 0v7"
                      />
                      <rect
                        className="paper-art__protection-lock-body"
                        height="24"
                        rx="4"
                        width="28"
                        x="18"
                        y="28"
                      />
                      <circle cx="32" cy="38" r="2.5" />
                      <path
                        className="paper-art__protection-keyhole"
                        d="M32 41v5"
                      />
                    </g>
                  </svg>
                )}
              </span>
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
            <div
              aria-labelledby={`tool-heading-${tool.id}`}
              className="accordion-panel__content"
              hidden={!isActive}
              id={`tool-panel-${tool.id}`}
              role="region"
            >
              <div className="accordion-panel__copy">
                <h2 id={`tool-heading-${tool.id}`}>
                  {tool.title}
                  {tool.id === 'merge' && fileCount > 1 && (
                    <span className="accordion-panel__badge">Suggested</span>
                  )}
                </h2>
                <p>{tool.description}</p>
              </div>
              <ul
                aria-label={`${tool.title} highlights`}
                className="feature-pills"
              >
                {tool.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button
                className="button button--primary accordion-panel__action"
                onClick={() =>
                  tool.id === 'merge' && fileCount === 1
                    ? onAddFile()
                    : onSelectTool(tool.id)
                }
                type="button"
              >
                {actionLabel}
                <Icon name="arrow" size={17} />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}
