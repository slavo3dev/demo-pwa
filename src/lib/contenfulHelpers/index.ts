// lib/contentful.ts
import { createClient, Entry, EntryCollection } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

export const fetchEntries = async (contentType: string): Promise<Entry<any>[]> => {
  const entries: EntryCollection<any> = await client.getEntries({
    content_type: contentType,
  });

  if (entries.items) return entries.items as Entry<any>[];
  console.log(`Error getting Entries for ${contentType}.`);
  return [];
};