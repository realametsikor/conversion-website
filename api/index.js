import { google } from "googleapis";
import fs from "fs";

const key = JSON.parse(process.env.GOOGLE_KEY);

export default async function handler(req, res) {
  const urls = req.body.urls;

  const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ["https://www.googleapis.com/auth/indexing"]
  );

  const indexing = google.indexing({ version: "v3", auth: jwtClient });

  for (const url of urls) {
    await indexing.urlNotifications.publish({
      requestBody: {
        url,
        type: "URL_UPDATED",
      },
    });
  }

  res.json({ success: true });
}
