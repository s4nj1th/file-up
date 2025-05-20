import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  url?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Parse incoming form data using formidable
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing the file' });
    }

    const file = files.file as File | undefined;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const fileBuffer = fs.readFileSync(file.filepath);

      // Prepare form data to send to 0x0.st
      const formData = new FormData();
      formData.append('file', fileBuffer, file.originalFilename || 'file');

      // Send POST request to 0x0.st
      const uploadResponse = await fetch('https://0x0.st', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        return res.status(uploadResponse.status).json({ error: 'Upload failed' });
      }

      const text = await uploadResponse.text();

      return res.status(200).json({ url: text.trim() });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'Unknown error' });
    }
  });
}
