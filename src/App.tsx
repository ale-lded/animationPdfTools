import { useState } from 'react'
import { SiteHeader } from './components/SiteHeader'

type Theme = 'dark' | 'light'

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark')

  return (
    <div className="app" data-theme={theme}>
      <SiteHeader
        onHome={() => undefined}
        onToggleTheme={() =>
          setTheme((currentTheme) =>
            currentTheme === 'dark' ? 'light' : 'dark',
          )
        }
        theme={theme}
      />
      <main className="page-container" id="main-content">
        <section aria-labelledby="scaffold-title" className="scaffold-card">
          <p className="eyebrow">Folio PDF</p>
          <h1 id="scaffold-title">
            A clean foundation for your PDF toolkit.
          </h1>
          <p className="scaffold-card__description">
            Your files stay on your device. The interface is coming together.
          </p>
        </section>
      </main>
      <footer className="site-footer">
        Folio PDF <span aria-hidden="true">·</span> private by design
      </footer>
    </div>
  )
}
