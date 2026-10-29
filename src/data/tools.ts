import type { IconName } from '../components/Icon'
import type { ToolId } from '../types'

export type Tool = {
  id: ToolId
  title: string
  description: string
  action: string
  features: string[]
  icon: IconName
}

export const featuredTools: Tool[] = [
  {
    id: 'merge',
    title: 'Merge',
    description: 'Combine PDFs in the order you want.',
    action: 'Merge PDFs',
    features: ['Any order', 'No uploads', 'Unlimited'],
    icon: 'merge',
  },
  {
    id: 'split',
    title: 'Split',
    description: 'Split a document into clean pieces.',
    action: 'Split PDF',
    features: ['Page ranges', 'Extract', 'Fast'],
    icon: 'split',
  },
  {
    id: 'compress',
    title: 'Compress',
    description: 'Make your PDFs lighter, not worse.',
    action: 'Compress PDF',
    features: ['Smart quality', 'Save space', 'Private'],
    icon: 'compress',
  },
  {
    id: 'reorder',
    title: 'Reorder',
    description: 'Move pages until everything flows.',
    action: 'Reorder pages',
    features: ['Drag & drop', 'Rotate', 'Preview'],
    icon: 'reorder',
  },
  {
    id: 'sign',
    title: 'Sign',
    description: 'Sign documents without printing them.',
    action: 'Sign PDF',
    features: ['Draw', 'Type', 'Secure'],
    icon: 'sign',
  },
  {
    id: 'protect',
    title: 'Protect',
    description: 'Add a password in a few seconds.',
    action: 'Protect PDF',
    features: ['Private', 'Simple', 'On your device'],
    icon: 'protect',
  },
]
