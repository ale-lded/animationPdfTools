import { Icon } from './Icon'

type Theme = 'dark' | 'light'

type SiteHeaderProps = {
  theme: Theme
  onHome: () => void
  onToggleTheme: () => void
}

export function SiteHeader({
  theme,
  onHome,
  onToggleTheme,
}: SiteHeaderProps) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="site-header__inner">
          <button
            aria-label="Folio home"
            className="brand"
            onClick={onHome}
            type="button"
          >
            <span className="brand__mark">
              <Icon name="file" size={18} />
            </span>
            <span>Folio</span>
          </button>
          <button
            aria-label={`Switch to ${nextTheme} theme`}
            className="theme-toggle"
            onClick={onToggleTheme}
            type="button"
          >
            <Icon name="sun" size={15} />
            <Icon name="moon" size={15} />
            <span
              aria-hidden="true"
              className={`theme-toggle__thumb theme-toggle__thumb--${theme}`}
            />
          </button>
        </div>
      </header>
    </>
  )
}
