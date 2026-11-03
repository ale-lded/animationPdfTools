import type { IconName } from '../components/Icon'
import type { ToolId } from '../types'

export type Tool = {
  id: ToolId
  title: string
  description: string
  action: string
  actionOneFile: string
  actionManyFiles: (count: number) => string
  features: string[]
  icon: IconName
}

export const featuredTools: Tool[] = [
  {
    id: 'merge',
    title: 'Merge',
    description: 'Combine PDFs in the order you want.',
    action: 'Merge PDFs',
    actionOneFile: 'Add another PDF',
    actionManyFiles: (count) => `Merge ${count} PDFs`,
    features: ['Any order', 'No uploads', 'Unlimited'],
    icon: 'merge',
  },
  {
    id: 'split',
    title: 'Split',
    description: 'Split a document into clean pieces.',
    action: 'Split PDF',
    actionOneFile: 'Split this PDF',
    actionManyFiles: () => 'Choose a PDF to split',
    features: ['Page ranges', 'Extract', 'Fast'],
    icon: 'split',
  },
  {
    id: 'compress',
    title: 'Compress',
    description: 'Make your PDFs lighter, not worse.',
    action: 'Compress PDF',
    actionOneFile: 'Compress this PDF',
    actionManyFiles: (count) => `Compress ${count} PDFs`,
    features: ['Smart quality', 'Save space', 'Private'],
    icon: 'compress',
  },
  {
    id: 'reorder',
    title: 'Reorder',
    description: 'Move pages until everything flows.',
    action: 'Reorder pages',
    actionOneFile: 'Reorder this PDF',
    actionManyFiles: () => 'Choose a PDF to reorder',
    features: ['Drag & drop', 'Rotate', 'Preview'],
    icon: 'reorder',
  },
  {
    id: 'sign',
    title: 'Sign',
    description: 'Sign documents without printing them.',
    action: 'Sign PDF',
    actionOneFile: 'Sign this PDF',
    actionManyFiles: () => 'Choose a PDF to sign',
    features: ['Draw', 'Type', 'Secure'],
    icon: 'sign',
  },
  {
    id: 'protect',
    title: 'Protect',
    description: 'Add a password in a few seconds.',
    action: 'Protect PDF',
    actionOneFile: 'Protect this PDF',
    actionManyFiles: (count) => `Protect ${count} PDFs`,
    features: ['Private', 'Simple', 'On your device'],
    icon: 'protect',
  },
]
