/**
 * Vercel Serverless Function to dynamically inject Environment Variables to Frontend
 * Serves window.ENV_KAKAO_JS_KEY from Vercel's secret KAKAO_JS_KEY environment variable.
 */
module.exports = (req, res) => {
  const kakaoKey = process.env.KAKAO_JS_KEY || process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '033d0971022acb44ebc09ce26768cfe0';
  
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.status(200).send(`window.ENV_KAKAO_JS_KEY = "${kakaoKey}";`);
};
