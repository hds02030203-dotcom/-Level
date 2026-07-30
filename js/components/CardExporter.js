/**
 * CardExporter Component
 * Renders high-resolution Canvas and exports PNG image card linked with User Name & Dojang.
 */
export class CardExporter {
  static exportCardAsPNG(resultData) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Canvas resolution (Mobile friendly high-res card)
    canvas.width = 600;
    canvas.height = 800;

    // Background Gradient (Deep Navy Dojang)
    const bgGradient = ctx.createLinearGradient(0, 0, 0, 800);
    bgGradient.addColorStop(0, '#0F172A');
    bgGradient.addColorStop(1, '#0B132B');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 600, 800);

    // Border Frame (Gold Accent)
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, 560, 760);

    // Inner Line Frame
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, 540, 740);

    // Dynamic Linked Header Title (Name + Dojang)
    let certTitle = '🥋 태권도 레벨 공식 인증서';
    if (resultData.userName && resultData.userDojang) {
      certTitle = `🥋 [ ${resultData.userDojang} ] ${resultData.userName} 님의 인증서`;
    } else if (resultData.userName) {
      certTitle = `🥋 ${resultData.userName} 님의 태권도 레벨 인증서`;
    } else if (resultData.userDojang) {
      certTitle = `🥋 [ ${resultData.userDojang} ] 수련생의 인증서`;
    }

    ctx.fillStyle = '#94A3B8';
    ctx.font = 'bold 20px Pretendard, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(certTitle, 300, 80);

    // Top Percent Tag Pill
    ctx.fillStyle = '#F59E0B';
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(190, 110, 220, 36, 18);
    } else {
      ctx.rect(190, 110, 220, 36);
    }
    ctx.fill();

    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 18px Pretendard, sans-serif';
    ctx.fillText(`🔥 ${resultData.topPercent}`, 300, 134);

    // Belt Emblem / Icon
    ctx.font = '80px sans-serif';
    ctx.fillText(resultData.icon, 300, 240);

    // Result Level Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 38px Pretendard, sans-serif';
    ctx.fillText(resultData.type, 300, 310);

    // Sub Title
    ctx.fillStyle = '#FBBF24';
    ctx.font = 'bold 24px Pretendard, sans-serif';
    ctx.fillText(`[${resultData.subTitle}]`, 300, 355);

    // Description (Multi-line wrap)
    ctx.fillStyle = '#CBD5E1';
    ctx.font = '16px Pretendard, sans-serif';
    CardExporter.wrapText(ctx, resultData.description, 300, 420, 480, 26);

    // Quote
    ctx.fillStyle = '#F59E0B';
    ctx.font = 'italic 16px Pretendard, sans-serif';
    ctx.fillText(resultData.quote, 300, 580);

    // Chemistry Box Background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(60, 620, 480, 90);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.strokeRect(60, 620, 480, 90);

    // Best Match (Centered)
    ctx.fillStyle = '#34D399';
    ctx.font = 'bold 18px Pretendard, sans-serif';
    ctx.fillText(`💖 환상의 짝꿍: ${resultData.bestMatch}`, 300, 672);

    // Footer Watermark
    ctx.fillStyle = '#64748B';
    ctx.font = '14px Pretendard, sans-serif';
    ctx.fillText('🥋 태권도 레벨 테스트 (Taekwondo Level Test)', 300, 750);

    // Convert Canvas to PNG and Trigger Download
    const dataUrl = canvas.toDataURL('image/png');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = dataUrl;
    const namePart = resultData.userName ? `_${resultData.userName}` : '';
    downloadAnchor.download = `태권도_레벨_인증서${namePart}_${resultData.type.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  }

  static wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
  }
}
