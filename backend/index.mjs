import express from "express";
import { PrismaClient } from "@prisma/client";
import { nanoid } from 'nanoid';
import cors from 'cors';

const BASE_URL = 'https://l-i.biz/';

const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

const corsOptions = {
  origin: 'https://hi.l-i.biz',
  method: ['POST', 'GET'],
  allowedHeaders: ['Content-Type'],
}
app.use(cors(corsOptions));

app.post('/shorten', async (req, res) => {
  let oUrl = req.body.url;
  if (!oUrl) return res.status(400).json({ error: 'Please provide a URL' });
  if (!oUrl.match(/^(http|https|ftp):\/\/[^\s/$.?#]+\.[^\s/$.?#]+[^\s]*$/)) 
    return res.status(400).json({ error: 'Please provide a valid URL (including http:// or https://)' });
  if (!oUrl.endsWith('/')) oUrl += '/';
  
  try {
    const existingUrl = await prisma.url.findFirst({
      where: { longUrl: oUrl },
    });

    if (existingUrl) {
      const shortUrl = `${BASE_URL}${existingUrl.shortId}`;
      return res.json({ url: shortUrl });
    }

    let shortId;
    let isUnique = false;
    while (!isUnique) {
      shortId = nanoid(6);
      const existingShortId = await prisma.url.findUnique({
        where: { shortId: shortId },
      });
      if (!existingShortId) isUnique = true;
    }

    await prisma.url.create({
      data: {
        shortId: shortId,
        createdAt: new Date(),
        longUrl: oUrl,
      },
    });

    const shortUrl = `${BASE_URL}${shortId}`;
    res.json({ url: shortUrl });
  } catch (err) {
    console.error("Error processing URL:", err);
    return res.status(500).json({ error: 'An error occurred while processing the URL' });
  }
});

app.get("/:id", async (req, res) => {
  const shortId = req.params.id;

  try {
    const urlRecord = await prisma.url.findUnique({
      where: { shortId: shortId },
    });

    if (urlRecord) {
      res.redirect(urlRecord.longUrl);
    } else {
      res.status(404).json({ error: '404 NOT FOUND' });
    }
  } catch (error) {
    console.error("Error fetching URL record:", error);
    res.status(500).json({ error: '500 INTERNAL SERVER ERROR' });
  }
});

app.get("/", (req, res) => {
  res.status(418).json({ message: "I'm a teapot" });
})

app.listen(PORT, () => {
  console.log(`HTTP SERVICE RUNNING ON PORT ${PORT}`);
});