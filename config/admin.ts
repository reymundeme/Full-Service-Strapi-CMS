export default ({ env }) => ({
  // ...existing code...
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env('CLIENT_URL') || 'http://104.248.127.3'],
      async handler(uid, { documentId }) {
        const fallbackUrl = env('PREVIEW_URL') || 'http://104.248.127.3';

        if (!documentId) {
          console.warn('Preview: no documentId provided', { uid, documentId });
          return fallbackUrl;
        }

        let document;
        try {
          // Normalize id
          const id = Number(documentId) || documentId;

          // Prefer entityService (Strapi v4). Fallback to db.query if needed.
          if (strapi.entityService && typeof strapi.entityService.findOne === 'function') {
            document = await strapi.entityService.findOne(uid, id, { populate: '*' });
          } else if (strapi.db && typeof strapi.db.query === 'function') {
            document = await strapi.db.query(uid).findOne({ where: { id }, populate: '*' });
          } else {
            throw new Error('No supported fetch API available on strapi object');
          }
        } catch (err) {
          console.error('Preview handler error:', err, { uid, documentId });
          return fallbackUrl;
        }

        if (!document) {
          console.warn('Preview: document not found', { uid, documentId });
          return fallbackUrl;
        }

        if (uid === 'api::page.page') {
          const slug = document.slug === 'home' ? '/' : `/${document.slug}`;
          return `${fallbackUrl}/api/preview?secret=${env('NEXT_PREVIEW_SECRET')}&slug=${slug}`;
        }

        if (uid === 'api::child-page.child-page') {
          const slug = `/industries/${document.slug}`;
          return `${fallbackUrl}/api/preview?secret=${env('NEXT_PREVIEW_SECRET')}&slug=${slug}`;
        }

        return fallbackUrl;
      },
    },
  },
  // ...existing code...
});