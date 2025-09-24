export default ({ env }) => ({
  auth: { secret: env('ADMIN_JWT_SECRET') },
  apiToken: { salt: env('API_TOKEN_SALT') },
  transfer: { token: { salt: env('TRANSFER_TOKEN_SALT') } },
  secrets: { encryptionKey: env('ENCRYPTION_KEY') },
  flags: { nps: env.bool('FLAG_NPS', true), promoteEE: env.bool('FLAG_PROMOTE_EE', true) },

  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env('CLIENT_URL') || '104.248.127.3'],
      async handler(uid, { documentId }) {
        // Always return a URL string
        const fallbackUrl = env('PREVIEW_URL') || '104.248.127.3';

        if (!documentId) return fallbackUrl;

        let document;
        try {
          document = await strapi.documents(uid).findOne({ documentId });
        } catch (err) {
          console.error('Preview handler error:', err);
          return fallbackUrl;
        }

        if (!document) return fallbackUrl;

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
});
