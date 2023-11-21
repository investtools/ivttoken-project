import { type NextApiRequest, type NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { GIGA_URL, GIGA_AUTH_TOKEN } = process.env
  if (!GIGA_URL) return res.status(500).json({ error: 'GIGA_URL not configured' })
  if (!GIGA_AUTH_TOKEN) return res.status(500).json({ error: 'GIGA_AUTH_TOKEN not configured' })

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GIGA_AUTH_TOKEN}`
    }
  }

  if (req.method === 'GET') {
    try {
      const response = await axios.get(`${GIGA_URL}/api/v1/schools/country/144?size=138754&page=1`, headers)
      res.status(200).json(response.data)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}