import type { IconName } from '../components/Icon'
import type { ToolId } from '../types'

export type MoreTool = {
  id: ToolId
  title: string
  description: string
  icon: IconName
}

export const moreTools: MoreTool[] = [
  {
    id: 'extract',
    title: 'Extract pages',
    description: 'Pull out exactly what you need.',
    icon: 'extract',
  },
  {
    id: 'delete',
    title: 'Delete pages',
    description: 'Remove pages in a click.',
    icon: 'trash',
  },
  {
    id: 'pdf-to-images',
    title: 'PDF to images',
    description: 'Export pages in high quality.',
    icon: 'image',
  },
  {
    id: 'images-to-pdf',
    title: 'Images to PDF',
    description: 'Turn images into one document.',
    icon: 'file',
  },
  {
    id: 'watermark',
    title: 'Add watermark',
    description: 'Make it yours.',
    icon: 'watermark',
  },
  {
    id: 'page-numbers',
    title: 'Page numbers',
    description: 'Keep pages in order.',
    icon: 'numbers',
  },
  {
    id: 'metadata',
    title: 'Edit metadata',
    description: 'Update document details.',
    icon: 'reorder',
  },
]
