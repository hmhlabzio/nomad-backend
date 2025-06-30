import { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
      read: () => true,
      create: () => true,
      update: () => true,
      delete: () => true,
    },
  upload: true, // Enables file upload (image, video, etc.)
  admin: {
    useAsTitle: 'alt', // Optional label
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
    },
  ],
};
