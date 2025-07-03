import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  cors: ['http://localhost:5173', 'https://nomad-sooty.vercel.app'],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    {
      slug: 'places',
      access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
      },
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'image', type: 'text', required: true }, // URL of image
        { name: 'tagline', type: 'text' },
        { name: 'country', type: 'text', required: true },
        { name: 'continent', type: 'text', required: true },
        { name: 'cost', type: 'number', min: 0, max: 100 },
        { name: 'internet', type: 'number', min: 0, max: 100 },
        { name: 'safety', type: 'number', min: 0, max: 100 },
        { name: 'liked', type: 'number', min: 0, max: 100 },
        { name: 'monthlyCost', type: 'text' },
        { name: 'temperature', type: 'text' },
        { name: 'aqi', type: 'number' },
      ],
    },
    {
      slug: 'inquiries',
      access: {
        read: () => true,
        create: () => true,
      },
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'country', type: 'text', required: true },
        { name: 'message', type: 'textarea', required: true },
        { name: 'cityId', type: 'text', required: true },
      ],
    },
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
})
