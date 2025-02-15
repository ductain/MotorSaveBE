const query = require("../config/dbConfig");

const calculateMoney = async (distance) => {
  // Fetch rates from the database
  const result = await query("SELECT * FROM distancerate");
  const rates = result.rows;

  // Identify d1, d2, m1, m2, m3 dynamically
  const sortedRates = rates.sort((a, b) => a.distance - b.distance); // Sort by distance
  
  const d1 = sortedRates.find(r => !r.isbigger).distance; // First threshold distance
  const d2 = sortedRates.find(r => r.isbigger).distance;  // Second threshold distance
  
  const m1 = sortedRates[0].moneyperkm;
  const m2 = sortedRates[1].moneyperkm;
  const m3 = sortedRates[2].moneyperkm;

  const s = distance/1000;

  let totalMoney = 0;

  if (s <= d1) {
    totalMoney = m1;
  } else if (s > d1 && s <= d2) {
    totalMoney = m1 + (s - d1) * m2;
  } else {
    totalMoney = m1 + ((d2 - d1) * m2) + (s - d2) * m3;
  }
  
  totalMoney = Math.round(totalMoney / 1000) * 1000
  return totalMoney;
};

module.exports = {
  calculateMoney,
};