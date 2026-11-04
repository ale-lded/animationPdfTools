# Folio PDF Suite

A private PDF toolkit that runs entirely in the browser. No backend, no accounts, no file storage: documents are meant to stay on the user's device from start to finish.

> **Status: early development.** Merge works. The compress and sign screens are still previews, and the other tools are placeholders.

## Tools

| Tool | What it does | Status |
| --- | --- | --- |
| Merge | Combine several PDFs in a chosen order | Working |
| Split | Split a document by page ranges | Placeholder |
| Compress | Reduce file size with three quality levels | Interface preview |
| Reorder | Reorder, rotate and delete pages | Placeholder |
| Protect | Add or remove a password | Placeholder |
| Sign | Add a name, initials or a hand-drawn mark to chosen pages | Interface preview |

**Sign adds a visual mark only.** It is not a certificate-based digital signature and has no legal value.

## How it works

1. The user picks one or more files, which the browser reads into memory.
2. A library running in the page processes them. Merge runs on the main thread for now, so very large files can make the page less responsive. Moving long jobs to a Web Worker is planned.
3. The result is offered as a local download, and is released from memory when the user leaves the result screen.

There is no server to upload to, so one visitor's files cannot reach another visitor. Each browser tab holds its own data.

Client-side processing has real trade-offs:

- Available memory and speed depend on the user's device, and phones have much less headroom than desktops.
- Very large files can fail. The app currently rejects PDFs over 100 MB.
- Closing or reloading the tab discards any work in progress.
- Merge keeps page content but not bookmarks, forms or other document-level data.

## Libraries

pdf-lib is in use. The others are planned, and each choice will be confirmed when its tool is built.

| Library | Purpose | License |
| --- | --- | --- |
| [pdf-lib](https://pdf-lib.js.org/) | Merge, split, reorder, sign | MIT |
| [PDF.js](https://mozilla.github.io/pdf.js/) | Page previews | Apache-2.0 |
| [qpdf](https://qpdf.sourceforge.io/), compiled to WebAssembly | Password protection | Apache-2.0 |
| [Ghostscript](https://www.ghostscript.com/), compiled to WebAssembly | Compression | AGPL-3.0 |

## Tech stack

React 19, TypeScript, Vite and Tailwind CSS v4.

## Getting started

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm install
npm run dev
```

## Validation

```sh
npm run typecheck
npm run build
```

There are no automated tests yet.

## License

Folio PDF Suite is free software, released under the [GNU Affero General Public License v3.0 or later](LICENSE). This license was chosen so the project can include Ghostscript, which is distributed under the AGPL.

Copyright (C) 2026 Alessio Mura

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the [license](LICENSE) for details.
