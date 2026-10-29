import { useState } from 'react'
import { SiteHeader } from './components/SiteHeader'
import { HomePage } from './pages/HomePage'
import { ToolPlaceholder } from './pages/ToolPlaceholder'
import type { Screen, ToolId } from './types'

type Theme = 'dark' | 'light'

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [screen, setScreen] = useState<Screen>('home')

  const selectTool = (tool: ToolId) => setScreen(tool)

  return (
    <div className="app" data-theme={theme}>
      <SiteHeader
        onHome={() => setScreen('home')}
        onToggleTheme={() =>
          setTheme((currentTheme) =>
            currentTheme === 'dark' ? 'light' : 'dark',
          )
        }
        theme={theme}
      />
      <main className="page-container" id="main-content">
        {screen === 'home' ? (
          <HomePage onSelectTool={selectTool} />
        ) : (
          <ToolPlaceholder
            onBack={() => setScreen('home')}
            tool={screen}
          />
        )}
      </main>
      <footer className="site-footer">
        Folio PDF <span aria-hidden="true">·</span> private by design
      </footer>
    </div>
  )
}
