const query = require("../config/dbConfig");

const FLAGFALL = 50000;            // VNĐ cờ mở cửa
const FIRST_FREE = 1000;            // Mét đầu miễn phí
const RATE1 = 19200 / 1000;        // VNĐ/m cho dưới 30km
const RATE2 = 17000 / 1000;        // VNĐ/m cho từ 30km trở lên
const WAIT_RATE = 60000 / 3600;    // VNĐ/s chờ

const calculateMoney = async (metres, serPacRate) => {
  // 1. Load & sort your bands by distance (asc), putting the "over" band last
  const { rows } = await query(`
    SELECT distance, moneyperkm, isbigger
    FROM distancerate
    ORDER BY distance ASC, isbigger ASC
  `);
  // distances of the non‑“over” bands: [1, 5, 10]
  const thresholds = rows.filter(r => !r.isbigger).map(r => r.distance);
  // all the per‑km prices (including the “over” band)
  const rates = rows.map(r => r.moneyperkm);

  // unpack them
  const [d1, d2, d3] = thresholds;      // d1=1, d2=5, d3=10
  const [m1, m2, m3, m4] = rates;        // m1=55000, m2=50000, m3=45000, m4=40000

  // convert to km
  const s = metres / 1000;

  let total;

  if (s <= d1) {
    // ── s ≤ 1 km: flat first‑km fee
    total = m1 * serPacRate;
  }
  else if (s <= d2) {
    // ── 1 < s ≤ d2: first‑km flat + (s−d1) at m2
    total = (m1 + (s - d1) * m2) * serPacRate;
  }
  else if (s <= d3) {
    // ── d2 < s ≤ d3: add the full chunk from d1→d2 at m2, then (s−d2) at m3
    total = (m1
      + (d2 - d1) * m2
      + (s - d2) * m3) * serPacRate;
  }
  else {
    // ── s > d3: add full chunks for [d1→d2] & [d2→d3], then (s−d3) at m4
    total = ( m1
      + (d2 - d1) * m2
      + (d3 - d2) * m3
      + (s - d3) * m4 ) * serPacRate;
  }

  // final: round to the nearest 1 000
  return Math.round(total / 1000) * 1000;
};

const getDistanceRates = async () => {
  const results = await query(`
    SELECT name, distance, moneyperkm, isbigger
    FROM distancerate
    ORDER BY distance ASC, isbigger ASC`);
  return results.rows;
};

const updateDistanceRate = async (disRateId, disRateData, adminId) => {
  const { moneyperkm } = disRateData;
  const result = await query(
    `UPDATE distancerate SET moneyperkm = $1, managedby = $2
     WHERE id = $3 RETURNING *`,
    [moneyperkm, adminId, disRateId]
  );

  return result.rows[0];
};

const calculateFloodFare = (distance, waiting) => {
  let fare = FLAGFALL;
  const chargeDist = Math.max(0, distance - FIRST_FREE);

  if (chargeDist <= 30000) {
    fare += chargeDist * RATE1;
  } else {
    fare += 30000 * RATE1 + (chargeDist - 30000) * RATE2;
  }

  fare += waiting * WAIT_RATE;
  return Math.round(fare / 1000) * 1000;
};

module.exports = {
  calculateMoney,
  getDistanceRates,
  updateDistanceRate,
  calculateFloodFare,
};