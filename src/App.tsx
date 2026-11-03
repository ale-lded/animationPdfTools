import { useCallback, useEffect, useState } from 'react'
import { SiteHeader } from './components/SiteHeader'
import { CompressPage } from './pages/CompressPage'
import { HomePage } from './pages/HomePage'
import { MergePage } from './pages/MergePage'
import { ProgressPage } from './pages/ProgressPage'
import { ResultPage } from './pages/ResultPage'
import { SignPage } from './pages/SignPage'
import { ToolPlaceholder } from './pages/ToolPlaceholder'
import type { Screen, ToolId } from './types'

type Theme = 'dark' | 'light'

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [screen, setScreen] = useState<Screen>('home')
  const [files, setFiles] = useState<File[]>([])

  // Screens share one scroll position, so a new one would open scrolled down.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [screen])

  const selectTool = (tool: ToolId) => setScreen(tool)
  const completeMergePreview = useCallback(
    () => setScreen('result'),
    [setScreen],
  )

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
          <HomePage
            files={files}
            onFilesChange={setFiles}
            onSelectTool={selectTool}
          />
        ) : screen === 'merge' ? (
          <MergePage
            files={files}
            onFilesChange={setFiles}
            onBack={() => setScreen('home')}
            onStart={() => setScreen('progress')}
          />
        ) : screen === 'compress' ? (
          <CompressPage onBack={() => setScreen('home')} />
        ) : screen === 'sign' ? (
          <SignPage onBack={() => setScreen('home')} />
        ) : screen === 'progress' ? (
          <ProgressPage
            fileCount={files.length}
            onCancel={() => setScreen('merge')}
            onComplete={completeMergePreview}
          />
        ) : screen === 'result' ? (
          <ResultPage
            files={files}
            onHome={() => setScreen('home')}
            onRetry={() => setScreen('merge')}
          />
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
