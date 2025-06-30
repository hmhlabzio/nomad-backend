// storage-adapter-import-placeholder
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

// Resolve __dirname equivalent in ESM
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  

  // Admin panel config
  cors: ['http://localhost:5173'], 
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  // Collections
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
      
      // ✅ This creates image upload from system via Media
      { name: 'image', type: 'upload', relationTo: 'media', required: true },

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


  // Lexical rich text editor
  editor: lexicalEditor(),

  // Secret key
  secret: process.env.PAYLOAD_SECRET || '',

  // TypeScript output
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // MongoDB connection
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  // Image processing
  sharp,

  // Plugins
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
