import { useRef } from 'react';
import domtoimage from 'dom-to-image';

export default function useDownload(view, questionType) {
  const chartRef = useRef(null);
  const tableRef = useRef(null);

  const handleDownload = () => {
    const node = view === 'table' ? tableRef.current : chartRef.current;
    if (!node) return;

    domtoimage.toPng(node, { cacheBust: true, bgcolor: '#fff' })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${questionType || 'chart'}-${view}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error('Görsel indirilemedi:', err));
  };

  return { handleDownload, chartRef, tableRef };
}
