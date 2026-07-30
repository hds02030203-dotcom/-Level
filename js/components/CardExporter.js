/**
 * CardExporter Component
 * Renders Ultra-HD 3X Retina Canvas (1800x2400px Standard / 1080x1920px 9:16 Instagram Story Canvas).
 */
export class CardExporter {
  // 1. Standard Certificate Canvas (3:4 ratio for gallery download & Kakao CDN)
  static renderCanvas(resultData) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const scale = 3;
    canvas.width = 600 * scale;
    canvas.height = 800 * scale;
    ctx.scale(scale, scale);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

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

    // Dynamic Linked Header Title
    let certTitle = '🥋 태권도 레벨 공식 인증서';
    if (resultData.userName && resultData.userDojang) {
      certTitle = `🥋 [ ${resultData.userDojang} ] ${resultData.userName} 님의 인증서`;
    } else if (resultData.userName) {
      certTitle = `🥋 ${resultData.userName} 님의 태권도 레벨 인증서`;
    } else if (resultData.userDojang) {
      certTitle = `🥋 [ ${resultData.userDojang} ] 수련생의 인증서`;
    }

    ctx.fillStyle = '#94A3B8';
    ctx.font = 'bold 20px Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
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
    ctx.font = 'bold 18px Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`🔥 ${resultData.topPercent}`, 300, 134);

    // Belt Emblem / Icon
    ctx.font = '80px sans-serif';
    ctx.fillText(resultData.icon, 300, 240);

    // Result Level Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 38px Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(resultData.type, 300, 310);

    // Sub Title
    ctx.fillStyle = '#FBBF24';
    ctx.font = 'bold 24px Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`[${resultData.subTitle}]`, 300, 355);

    // Description (Multi-line wrap)
    ctx.fillStyle = '#CBD5E1';
    ctx.font = '16px Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    CardExporter.wrapText(ctx, resultData.description, 300, 420, 480, 26);

    // Quote
    ctx.fillStyle = '#F59E0B';
    ctx.font = 'italic 16px Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(resultData.quote, 300, 580);

    // Chemistry Box Background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(60, 620, 480, 90);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.strokeRect(60, 620, 480, 90);

    // Best Match
    ctx.fillStyle = '#34D399';
    ctx.font = 'bold 18px Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`💖 환상의 짝꿍: ${resultData.bestMatch}`, 300, 672);

    // Footer Watermark
    ctx.fillStyle = '#64748B';
    ctx.font = '14px Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('🥋 태권도 레벨 테스트 (Taekwondo Level Test)', 300, 750);

    return canvas;
  }

  // 2. Dedicated Instagram Story Canvas (Full Vertical 9:16 Ratio | 1080px x 1920px Retina Scale)
  static renderInstaStoryCanvas(resultData) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 1080 x 1920 Fullscreen Instagram Story Ratio
    const scale = 2; // 540x960 * 2 = 1080x1920
    canvas.width = 540 * scale;
    canvas.height = 960 * scale;
    ctx.scale(scale, scale);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1) Background Gradient (Rich Deep Slate Navy)
    const bgGradient = ctx.createLinearGradient(0, 0, 0, 960);
    bgGradient.addColorStop(0, '#090D16');
    bgGradient.addColorStop(0.5, '#0F172A');
    bgGradient.addColorStop(1, '#0B132B');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 540, 960);

    // 2) Top Header Instagram Story Tag
    ctx.fillStyle = '#F59E0B';
    ctx.font = 'bold 14px Pretendard, -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🥋 OFFICIAL TAEKWONDO CERTIFICATE 🥋', 270, 75);

    // 3) Certificate Main Card Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(35, 105, 470, 715);

    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 4;
    ctx.strokeRect(35, 105, 470, 715);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(43, 113, 454, 699);

    // User Name / Dojang Header
    let certTitle = '태권도 레벨 공식 인증서';
    if (resultData.userName && resultData.userDojang) {
      certTitle = `[ ${resultData.userDojang} ] ${resultData.userName} 님`;
    } else if (resultData.userName) {
      certTitle = `${resultData.userName} 님의 태권도 인증서`;
    } else if (resultData.userDojang) {
      certTitle = `[ ${resultData.userDojang} ] 수련생`;
    }

    ctx.fillStyle = '#94A3B8';
    ctx.font = 'bold 19px Pretendard, -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(certTitle, 270, 160);

    // Percent Badge
    ctx.fillStyle = '#F59E0B';
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(170, 185, 200, 36, 18);
    } else {
      ctx.rect(170, 185, 200, 36);
    }
    ctx.fill();

    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 17px Pretendard, -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`🔥 ${resultData.topPercent}`, 270, 209);

    // Icon
    ctx.font = '90px sans-serif';
    ctx.fillText(resultData.icon, 270, 325);

    // Belt Type Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 40px Pretendard, -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(resultData.type, 270, 400);

    // Sub Title
    ctx.fillStyle = '#FBBF24';
    ctx.font = 'bold 22px Pretendard, -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`[${resultData.subTitle}]`, 270, 442);

    // Description
    ctx.fillStyle = '#CBD5E1';
    ctx.font = '16px Pretendard, -apple-system, BlinkMacSystemFont, sans-serif';
    CardExporter.wrapText(ctx, resultData.description, 270, 500, 400, 27);

    // Quote
    ctx.fillStyle = '#F59E0B';
    ctx.font = 'italic 16px Pretendard, -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(resultData.quote, 270, 665);

    // Chemistry Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(70, 700, 400, 80);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.strokeRect(70, 700, 400, 80);

    ctx.fillStyle = '#34D399';
    ctx.font = 'bold 18px Pretendard, -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`💖 환상의 짝꿍: ${resultData.bestMatch}`, 270, 747);

    // Instagram Story Sticker Guide Watermark
    ctx.fillStyle = '#E2E8F0';
    ctx.font = 'bold 15px Pretendard, -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('👇 아래 스티커 버튼을 눌러 당신의 레벨도 측정해보세요! 👇', 270, 860);

    ctx.fillStyle = '#64748B';
    ctx.font = '13px Pretendard, -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('level-rouge-gamma.vercel.app', 270, 890);

    return canvas;
  }

  static exportCardAsPNG(resultData) {
    const canvas = CardExporter.renderCanvas(resultData);
    const dataUrl = canvas.toDataURL('image/png', 1.0);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = dataUrl;
    const namePart = resultData.userName ? `_${resultData.userName}` : '';
    downloadAnchor.download = `태권도_레벨_인증서${namePart}_${resultData.type.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  }

  static exportInstaStoryPNG(resultData) {
    const canvas = CardExporter.renderInstaStoryCanvas(resultData);
    const dataUrl = canvas.toDataURL('image/png', 1.0);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = dataUrl;
    const namePart = resultData.userName ? `_${resultData.userName}` : '';
    downloadAnchor.download = `인스타그램_스토리_인증서${namePart}_${resultData.type.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  }

  static getCanvasBlob(resultData) {
    return new Promise((resolve) => {
      const canvas = CardExporter.renderCanvas(resultData);
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png', 1.0);
    });
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
