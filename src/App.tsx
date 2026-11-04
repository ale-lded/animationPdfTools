import { useEffect, useState } from 'react'
import { SiteHeader } from './components/SiteHeader'
import { CompressPage } from './pages/CompressPage'
import { HomePage } from './pages/HomePage'
import { MergePage } from './pages/MergePage'
import { ProgressPage } from './pages/ProgressPage'
import { ResultPage } from './pages/ResultPage'
import { SignPage } from './pages/SignPage'
import { ToolPlaceholder } from './pages/ToolPlaceholder'
import { mergePdfs } from './lib/mergePdfs'
import type { Screen, ToolId } from './types'

type Theme = 'dark' | 'light'

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [screen, setScreen] = useState<Screen>('home')
  const [files, setFiles] = useState<File[]>([])
  const [mergeError, setMergeError] = useState<string | null>(null)
  const [mergedPdf, setMergedPdf] = useState<Blob | null>(null)

  // Screens share one scroll position, so a new one would open scrolled down.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [screen])

  const selectTool = (tool: ToolId) => setScreen(tool)

  async function startMerge(orderedFiles: File[]) {
    setMergeError(null)
    setMergedPdf(null)
    setScreen('progress')

    try {
      const [mergedBytes] = await Promise.all([
        mergePdfs(orderedFiles),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ])

      const blob = new Blob([mergedBytes.slice()], { type: 'application/pdf' })
      setMergedPdf(blob)
      setScreen('result')
    } catch (error) {
      setMergeError(
        error instanceof Error
          ? error.message
          : 'Something went wrong while merging your PDFs.',
      )
      setScreen('merge')
    }
  }

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
            onFilesChange={(nextFiles) => {
              setFiles(nextFiles)
              setMergeError(null)
            }}
            onBack={() => {
              setScreen('home')
              setMergeError(null)
            }}
            onStart={startMerge}
            mergeError={mergeError}
          />
        ) : screen === 'compress' ? (
          <CompressPage onBack={() => setScreen('home')} />
        ) : screen === 'sign' ? (
          <SignPage onBack={() => setScreen('home')} />
        ) : screen === 'progress' ? (
          <ProgressPage
            fileCount={files.length}
          />
        ) : screen === 'result' ? (
          <ResultPage
            files={files}
            mergedPdf={mergedPdf}
            onHome={() => {
              setMergedPdf(null)
              setScreen('home')
            }}
            onRetry={() => {
              setMergedPdf(null)
              setScreen('merge')
            }}
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
