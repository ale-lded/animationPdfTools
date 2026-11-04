import { PDFDocument } from 'pdf-lib'

export async function mergePdfs(files: File[]): Promise<Uint8Array> {
  // 1. crea il documento nuovo
  const mergedPdf = await PDFDocument.create()

  // 2. per ogni file:
  for (const file of files) {
  // a. leggi i byte
    const fileBytes = await file.arrayBuffer()
    // b. caricali come PDF
    let sourcePdf: PDFDocument

    try {
        sourcePdf = await PDFDocument.load(fileBytes)
        } catch {
    throw new Error(`"${file.name}" could not be read. It may be damaged, password-protected or not a real PDF.`)
    }

        
    // c. copia le pagine
    const copiedPages = await mergedPdf.copyPages(sourcePdf, sourcePdf.getPageIndices())

    // d. aggiungile al documento nuovo
    for (const page of copiedPages) {
        mergedPdf.addPage(page)
    }


    }


  // 3. salva e restituisci il risultato
  return await mergedPdf.save()
}


