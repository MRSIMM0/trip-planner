import React from 'react'
import styles from './PdfViewer.module.css'
import usePdfViewerStore from '@/store/pdfViewerStore'

export default function PdfViewer() {

    const {close} = usePdfViewerStore();

  return (
    <section onClick={() => {
        close();
    }} className={styles.viewer}>
        <div className={styles.iframe_wrapper}>
            <iframe className={styles.frame} src="./content/przykladowe-zadania.pdf" width="100%" height="100%"></iframe>
        </div>
    </section>
  )
}
