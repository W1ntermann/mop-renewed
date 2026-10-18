import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/program`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/register`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]
}