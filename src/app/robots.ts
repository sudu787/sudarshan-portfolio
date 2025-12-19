import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/logs', '/admin'], // 🛑 Hide your secret spy dashboard from Google
    },
    sitemap: 'https://sudarshanajoysindhu.vercel.app/sitemap.xml',
  }
}