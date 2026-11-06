import { PDFDocument } from 'pdf-lib'

/**
 * A range of pages as the user sees them: numbered from 1, with both ends
 * included. `{ start: 2, end: 4 }` means pages 2, 3 and 4.
 */
export type PageRange = {
  start: number
  end: number
}

/**
 * Splits a PDF into one new PDF per range. Ranges may overlap and may come in
 * any order, because each one becomes a separate file.
 */
export async function splitPdf(
  file: File,
  ranges: PageRange[],
): Promise<Uint8Array[]> {
  // 1. leggi i byte e caricali come PDF
  const fileBytes = await file.arrayBuffer()
  let sourcePdf: PDFDocument

  try {
    sourcePdf = await PDFDocument.load(fileBytes)
  } catch {
    throw new Error(
      `"${file.name}" could not be read. It may be damaged, password-protected or not a real PDF.`,
    )
  }

  const pageCount = sourcePdf.getPageCount()

  // 2. controlla tutti gli intervalli prima di creare qualsiasi file
  if (ranges.length === 0) {
    throw new Error('Choose at least one range of pages to split.')
  }

  for (const range of ranges) {
    if (!Number.isInteger(range.start) || !Number.isInteger(range.end)) {
      throw new Error(
        `Page numbers must be whole numbers (got ${range.start}-${range.end}).`,
      )
    }

    if (range.start < 1) {
      throw new Error(`Pages start from 1, so page ${range.start} doesn't exist.`)
    }

    if (range.end > pageCount) {
      throw new Error(
        `Page ${range.end} doesn't exist: "${file.name}" has ${pageCount} pages.`,
      )
    }

    if (range.start > range.end) {
      throw new Error(
        `The range ${range.start}-${range.end} is backwards: the first page must come before the last.`,
      )
    }
  }

  // 3. crea un PDF per ogni intervallo
  const parts: Uint8Array[] = []

  for (const range of ranges) {
    // a. crea un documento nuovo
    const partPdf = await PDFDocument.create()

    // b. calcola gli indici delle pagine (pdf-lib conta da 0)
    const pageIndices: number[] = []

    for (let pageNumber = range.start; pageNumber <= range.end; pageNumber++) {
      pageIndices.push(pageNumber - 1)
    }

    // c. copia le pagine dal sourcePdf e aggiungile
    const copiedPages = await partPdf.copyPages(sourcePdf, pageIndices)

    for (const page of copiedPages) {
      partPdf.addPage(page)
    }

    // d. salva e metti il risultato in parts
    parts.push(await partPdf.save())
  }

  // 4. restituisci i PDF
  return parts
}
