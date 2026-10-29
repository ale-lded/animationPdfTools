import { Icon } from '../components/Icon'
import { MoreToolsGrid } from '../components/MoreToolsGrid'
import { ToolAccordion } from '../components/ToolAccordion'
import type { ToolId } from '../types'

type HomePageProps = {
  onSelectTool: (tool: ToolId) => void
}

export function HomePage({ onSelectTool }: HomePageProps) {
  return (
    <div className="home-page">
      <section aria-labelledby="hero-title" className="hero">
        <div className="hero__copy">
          <p className="privacy-badge">
            <Icon name="lock" size={14} />
            Your files never leave your device
          </p>
          <h1 id="hero-title">Everything your PDFs need.</h1>
          <p className="hero__description">
            Merge, split, compress and sign, right in your browser.
          </p>
          <div className="hero__actions">
            <button
              className="button button--primary button--large"
              onClick={() => onSelectTool('merge')}
              type="button"
            >
              Start with a file
              <Icon name="arrow" />
            </button>
            <a className="button button--ghost button--large" href="#more-tools">
              See all tools
            </a>
          </div>
        </div>
        <div className="hero__visual">
          <ToolAccordion onSelectTool={onSelectTool} />
          <p className="hero__hint">Explore the tools</p>
        </div>
      </section>
      <MoreToolsGrid onSelectTool={onSelectTool} />
    </div>
  )
}
