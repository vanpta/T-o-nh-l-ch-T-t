
import { VIETNAMESE_MONTHS, DAYS_OF_WEEK } from "../constants";
import { CalendarMode } from "../types";

export const drawSingleMonth = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  month: number,
  year: number,
  showTitle: boolean = true
) => {
  const padding = w * 0.12;
  let currentY = y + h * 0.15;

  if (showTitle) {
    // Elegant Serif Title for Single Month
    ctx.fillStyle = '#C0A040';
    ctx.font = `bold ${Math.floor(w * 0.16)}px 'Playfair Display'`;
    ctx.fillText(`${year}`, x + padding, currentY);
    
    currentY += h * 0.08;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `300 ${Math.floor(w * 0.09)}px 'Inter'`;
    ctx.fillText(VIETNAMESE_MONTHS[month], x + padding, currentY);
    currentY += h * 0.1;
  } else {
    // Smaller but clear title for grid mode
    ctx.fillStyle = '#FFD700'; // Brighter gold for small text
    ctx.font = `bold ${Math.floor(w * 0.12)}px 'Inter'`;
    ctx.fillText(VIETNAMESE_MONTHS[month], x + padding, currentY);
    currentY += h * 0.14;
  }

  const colWidth = (w - padding * 2) / 7;
  const rowHeight = (h - (currentY - y)) / 8;

  // Header
  ctx.font = `bold ${Math.floor(w * 0.06)}px 'Inter'`;
  ctx.fillStyle = '#C0A040';
  DAYS_OF_WEEK.forEach((day, i) => {
    ctx.fillText(day, x + padding + i * colWidth, currentY);
  });

  currentY += rowHeight * 1.2;

  // Days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date().getDate();
  const isCurrentMonth = new Date().getMonth() === month && new Date().getFullYear() === year;

  ctx.font = `${Math.floor(w * 0.07)}px 'Inter'`;
  
  let day = 1;
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      if (r === 0 && c < firstDay) continue;
      if (day > daysInMonth) break;

      const dx = x + padding + c * colWidth;
      const dy = currentY + r * rowHeight;

      if (isCurrentMonth && day === today) {
        ctx.beginPath();
        ctx.arc(dx + colWidth * 0.15, dy - h * 0.025, w * 0.045, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.4)'; // Red circle for Tet today
        ctx.fill();
        ctx.strokeStyle = '#C0A040';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = '#FFFFFF';
      } else {
        ctx.fillStyle = (c === 0) ? '#FF4D4D' : '#FFFFFF'; // Red color for Sundays
      }

      ctx.fillText(day.toString(), dx, dy);
      day++;
    }
    if (day > daysInMonth) break;
  }
};

export const applyCalendarOverlay = (
  imageSrc: string,
  mode: CalendarMode,
  selectedMonth: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject("Canvas context failed");

      ctx.drawImage(img, 0, 0);
      const w = canvas.width;
      const h = canvas.height;

      if (mode === CalendarMode.SINGLE_MONTH) {
        const overlayWidth = w * 0.35;
        const gradient = ctx.createLinearGradient(0, 0, overlayWidth, 0);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
        gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, overlayWidth, h);

        const year = 2026;
        drawSingleMonth(ctx, 0, 0, overlayWidth, h, selectedMonth, year);
      } else {
        const overlayWidth = w * 0.45;
        const gradient = ctx.createLinearGradient(0, 0, overlayWidth, 0);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
        gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0.5)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, overlayWidth, h);

        const year = 2026;
        const gridCols = 3;
        const gridRows = 4;
        const mWidth = overlayWidth / gridCols;
        const mHeight = h / (gridRows + 0.6);

        // Header for Full Year
        ctx.fillStyle = '#C0A040';
        ctx.font = `bold ${Math.floor(w * 0.035)}px 'Playfair Display'`;
        ctx.fillText(`Lịch Bính Ngọ ${year}`, w * 0.03, h * 0.07);

        for (let i = 0; i < 12; i++) {
          const row = Math.floor(i / gridCols);
          const col = i % gridCols;
          drawSingleMonth(
            ctx, 
            col * mWidth, 
            h * 0.09 + row * mHeight, 
            mWidth, 
            mHeight, 
            i, 
            year, 
            false
          );
        }
      }

      // Shared footer quote
      ctx.fillStyle = '#FFD700';
      ctx.font = `italic ${Math.floor(w * 0.016)}px 'Charm'`;
      ctx.shadowColor = 'black';
      ctx.shadowBlur = 4;
      ctx.fillText("Xuân Bính Ngọ - Vạn Sự Như Ý - An Khang Thịnh Vượng", w * 0.03, h * 0.95);

      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = imageSrc;
  });
};
