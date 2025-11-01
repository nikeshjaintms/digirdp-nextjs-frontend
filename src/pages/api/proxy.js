import axios from "axios";
import { parseStringPromise } from "xml2js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const response = await axios.post(
      "https://manage.digirdp.com/includes/api.php",
      req.body, // Forward the request body
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const jsonData = await parseStringPromise(response.data, { explicitArray: false });

    res.status(200).json(jsonData); // Send the response back to the frontend
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
}
