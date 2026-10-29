import type { ReactNode } from 'react'

export type IconName =
  | 'arrow'
  | 'compress'
  | 'close'
  | 'check'
  | 'extract'
  | 'draw'
  | 'file'
  | 'image'
  | 'lock'
  | 'merge'
  | 'moon'
  | 'numbers'
  | 'protect'
  | 'reorder'
  | 'sign'
  | 'split'
  | 'sun'
  | 'type'
  | 'trash'
  | 'upload'
  | 'watermark'

const iconPaths: Record<IconName, ReactNode> = {
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  compress: (
    <>
      <path d="m8 4-4 4h4M16 4l4 4h-4M8 20l-4-4h4M16 20l4-4h-4" />
      <path d="M4 8l4-4m12 4-4-4M4 16l4 4m12-4-4 4" />
    </>
  ),
  close: <path d="m6 6 12 12m0-12L6 18" />,
  check: <path d="m5 12 4 4L19 6" />,
  extract: (
    <>
      <rect height="16" rx="2" width="12" x="4" y="4" />
      <path d="M9 9h4m-4 4h4m4-5h3v12H9" />
    </>
  ),
  draw: <path d="m4 20 4-1 10-10-3-3-10 10zM13 6l3 3" />,
  file: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v5h4M10 13h5M10 17h4" />
    </>
  ),
  image: (
    <>
      <rect height="16" rx="3" width="18" x="3" y="4" />
      <circle cx="9" cy="10" r="2" />
      <path d="m21 15-4-4-7 8" />
    </>
  ),
  lock: (
    <>
      <rect height="10" rx="2" width="12" x="6" y="10" />
      <path d="M8.5 10V7a3.5 3.5 0 0 1 7 0v3" />
    </>
  ),
  merge: (
    <>
      <path d="M7 4v4a4 4 0 0 0 4 4h7" />
      <path d="m15 9 3 3-3 3M7 20v-4a4 4 0 0 1 4-4" />
    </>
  ),
  moon: <path d="M20 15.3A8.5 8.5 0 0 1 8.7 4 8.5 8.5 0 1 0 20 15.3Z" />,
  numbers: (
    <>
      <path d="M8 4v16m8-16v16M4 9h16M4 15h16" />
    </>
  ),
  protect: (
    <>
      <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  reorder: (
    <>
      <path d="M7 7h11M7 12h11M7 17h11M4 7h.01M4 12h.01M4 17h.01" />
    </>
  ),
  sign: (
    <>
      <path d="M4 18c3-1 4-4 5-7 1-2 2-4 3-4 2 0-.5 8 1 8 1 0 2-3 3-3 1 0 .3 3 2 3 .8 0 1.5-.6 2-1" />
      <path d="M4 21h16" />
    </>
  ),
  split: (
    <>
      <path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
      <path d="M12 4v3m0 3v4m0 3v3" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  type: <path d="M5 5h14m-7 0v14m-4 0h8" />,
  trash: (
    <>
      <path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14" />
    </>
  ),
  upload: (
    <>
      <path d="m16 11-4-4-4 4m4-4v10" />
      <path d="M5 19h14" />
    </>
  ),
  watermark: (
    <>
      <path d="M4 6h16M4 18h16M8 6v12m8-12v12" />
      <path d="m10 15 2-7 2 7m-3-2h2" />
    </>
  ),
}

type IconProps = {
  name: IconName
  size?: number
  className?: string
}

export function Icon({ name, size = 20, className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      width={size}
    >
      {iconPaths[name]}
    </svg>
  )
}
