export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: { salt: env('API_TOKEN_SALT') },
  transfer: { token: { salt: env('TRANSFER_TOKEN_SALT') } },
  secrets: { encryptionKey: env('ENCRYPTION_KEY') },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },

  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env('CLIENT_URL') || 'http://104.248.127.3'],
      async handler(uid, { documentId }) {
        if (!documentId) {
          // ⚠ Always return a fallback URL
          return env('PREVIEW_URL') || 'http://104.248.127.3';
        }

        const document = await strapi.documents(uid).findOne({ documentId });
        if (!document) {
          return env('PREVIEW_URL') || 'http://104.248.127.3';
        }

        // Pages
        if (uid === 'api::page.page') {
          const slug = document.slug === 'home' ? '/' : `/${document.slug}`;
          return `${env('PREVIEW_URL')}/api/preview?secret=${env('NEXT_PREVIEW_SECRET')}&slug=${slug}`;
        }

        // Child-pages (industries/[slug])
        if (uid === 'api::child-page.child-page') {
          const slug = `/industries/${document.slug}`;
          return `${env('PREVIEW_URL')}/api/preview?secret=${env('NEXT_PREVIEW_SECRET')}&slug=${slug}`;
        }

        // Default fallback
        return env('PREVIEW_URL') || 'http://104.248.127.3';
      },
    },
  },
});
