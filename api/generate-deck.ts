import { NowRequest, NowResponse } from '@vercel/node'
import { Card } from '../src/global/app'
import { APKG } from './anki-apkg'
const fs = require('fs')
const fetch = require('node-fetch')

async function addCard(apkg: any, text: string, audioUrl: string, imageUrls: string[]) {
  const suffix = Math.random().toString(36).substring(7)
  const fileName = `${encodeURIComponent(text)}-${suffix}`

  const audioBuffer = await fetch(audioUrl).then(res => res.buffer()) as Buffer
  const imageBuffers = await Promise.all(imageUrls.map(url => fetch(url).then(res => res.buffer()))) as Buffer[]

  console.log(`Adding card: ${text}`)
  apkg.addCard({
    content: [
      text,
      `[sound:${fileName}.mp3]`,
      imageBuffers.map((_, i) => `<img src="${fileName}-${i}.jpg" />`).join(),
    ]
  })

  for (let i = 0; i < imageBuffers.length; i++) {
    apkg.addMedia(`${fileName}-${i}.jpg`, imageBuffers[i])
  }
  apkg.addMedia(`${fileName}.mp3`, audioBuffer)
}

export default async (req: NowRequest, res: NowResponse) => {
  const cards = req.body?.cards as Card[]
  if (!cards || cards.length === 0) {
    res.status(400).send("You must include at least one card in the body")
    return
  }

  const apkg = new APKG({
    name: 'New-Vocab',
    card: {
      fields: ['Text', 'Sound', 'Images'],
      template: {
          question: '{{Text}}{{Sound}}',
          answer: '{{FrontSide}}<hr id=answer>{{Images}}'
      }
    }
  })

  console.log(`Adding ${cards.length} cards`)
  for (const card of cards) {
    await addCard(apkg, card.text, card.audioUrl, card.imageUrls)
  }

  await apkg.save(__dirname)

  const apkgPath = __dirname + '/New-Vocab.apkg'
  const buffer = fs.readFileSync(apkgPath) as Buffer
  res.status(200).send(buffer)
}
