import { google } from "googleapis";

export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Grab the passwords exactly as we named them in Vercel
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  // This replace function fixes the hidden Vercel formatting bugs
  const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

  try {
    // 3. Authenticate with Google
    const jwtClient = new google.auth.JWT(
      clientEmail,
      null,
      privateKey,
      ["https://www.googleapis.com/auth/indexing"]
    );

    const indexing = google.indexing({ version: "v3", auth: jwtClient });

    // 4. Grab the URLs you want to send
    const urls = req.body.urls;

    if (!urls || urls.length === 0) {
      return res.status(400).json({ error: "No URLs provided" });
    }

    // 5. Fire them at Google
    for (const url of urls) {
      await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: "URL_UPDATED",
        },
      });
    }

    // 6. Success message
    res.status(200).json({ success: true, message: `Successfully pinged ${urls.length} URLs to Google!` });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to submit to Google" });
  }
}
