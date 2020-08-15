import { NowRequest, NowResponse } from '@vercel/node'
const linguee = require('linguee')

export default async (req: NowRequest, res: NowResponse) => {
  const { q, lang } = req.query

  const results = await linguee.translate(q, { from: lang, to: 'eng' })
  res.json(results)
}
