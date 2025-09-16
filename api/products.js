// File: api/products.js

export default async function handler(req, res) {
  // Enable CORS headers so WordPress can fetch from another domain
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const API_KEY = process.env.AIRTABLE_API_KEY;
  const BASE_ID = "appCkWbcWlRmLepOs";
  const TABLE_ID = "tblbzMXhwQXrH4upR";
  const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`;

  try {
    const response = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });

    if (!response.ok) {
      throw new Error(`Airtable responded with ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching from Airtable:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
