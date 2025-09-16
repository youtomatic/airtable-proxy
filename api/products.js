export default async function handler(req, res) {
  const API_KEY = process.env.AIRTABLE_API_KEY; // stored in Vercel
  const BASE_ID = "appCkWbcWlRmLepOs";
  const TABLE_ID = "tblbzMXhwQXrH4upR";
  const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`;

  try {
    const response = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Airtable:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
