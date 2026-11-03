# Folio PDF Suite

A private PDF toolkit that runs entirely in the browser. No backend, no accounts, no file storage: documents are meant to stay on the user's device from start to finish.

> **Status: early development.** The interface is built, but PDF processing is not implemented yet. The merge, compress and sign screens are previews, and the other tools are placeholders. No tool produces a real output file today.

## Tools

| Tool | What it will do | Status |
| --- | --- | --- |
| Merge | Combine several PDFs in a chosen order | Interface preview |
| Split | Split a document by page ranges | Placeholder |
| Compress | Reduce file size with three quality levels | Interface preview |
| Reorder | Reorder, rotate and delete pages | Placeholder |
| Protect | Add or remove a password | Placeholder |
| Sign | Add a name, initials or a hand-drawn mark to chosen pages | Interface preview |

**Sign adds a visual mark only.** It is not a certificate-based digital signature and has no legal value.

## How it will work

1. The user picks one or more files, which the browser reads into memory.
2. A library running in the page processes them. Long jobs run in a Web Worker so the interface stays responsive.
3. The result is offered as a local download, then released from memory.

There is no server to upload to, so one visitor's files cannot reach another visitor. Each browser tab holds its own data.

Client-side processing has real trade-offs:

- Available memory and speed depend on the user's device, and phones have much less headroom than desktops.
- Very large files can fail. The app currently rejects PDFs over 100 MB.
- Closing or reloading the tab discards any work in progress.

## Planned libraries

None of these are installed yet. Each choice will be confirmed when its tool is built.

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
