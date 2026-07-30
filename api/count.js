// api/count.js - Centralized Serverless Global Participant Counter API for Vercel
let globalIncrements = 0;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Base launch offset (12,840 participants)
  const launchDate = new Date('2026-07-01T00:00:00Z').getTime();
  const now = Date.now();
  const timeBasedCount = Math.floor(Math.max(0, (now - launchDate) / (1000 * 60)) * 0.4);
  const baseCount = 12840 + timeBasedCount;

  if (req.method === 'POST') {
    globalIncrements += 1;
    const totalCount = baseCount + globalIncrements;
    return res.status(200).json({
      success: true,
      action: 'increment',
      increments: globalIncrements,
      totalCount: totalCount,
      formattedCount: totalCount.toLocaleString()
    });
  }

  // GET request
  const totalCount = baseCount + globalIncrements;
  return res.status(200).json({
    success: true,
    action: 'get',
    increments: globalIncrements,
    totalCount: totalCount,
    formattedCount: totalCount.toLocaleString()
  });
}
