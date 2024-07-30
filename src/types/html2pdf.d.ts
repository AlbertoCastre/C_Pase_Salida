declare module 'html2pdf.js' {
    interface Html2PdfOptions {
      margin?: number | [number, number, number, number];
      filename?: string;
      image?: {
        type: string;
        quality: number;
      };
      html2canvas?: {
        scale?: number;
        useCORS?: boolean;
      };
      jsPDF?: {
        unit?: string;
        format?: string | [number, number];
        orientation?: 'portrait' | 'landscape';
      };
    }
  
    interface Html2Pdf {
      from(element: HTMLElement): {
        set(options: Html2PdfOptions): Html2Pdf;
        save(filename?: string): void;
      };
    }
  
    function html2pdf(): Html2Pdf;
  
    export = html2pdf;
  }
  