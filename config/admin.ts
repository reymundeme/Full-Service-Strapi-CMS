// config/admin.ts
export default ({ env }) => ({
  auth: { secret: env('ADMIN_JWT_SECRET') },
  apiToken: { salt: env('API_TOKEN_SALT') },
  transfer: { token: { salt: env('TRANSFER_TOKEN_SALT') } },
  secrets: { encryptionKey: env('ENCRYPTION_KEY') },
  flags: { nps: env.bool('FLAG_NPS', true), promoteEE: env.bool('FLAG_PROMOTE_EE', true) },

  preview: {
    enabled: true,
    config: {
      // Allow Strapi Admin to open your frontend
      allowedOrigins: [env('CLIENT_URL') || 'http://104.248.127.3'],

      async handler(uid, { documentId }) {
        const base = env('PREVIEW_URL') || 'http://104.248.127.3';
        const secret = env('NEXT_PREVIEW_SECRET');

        let document;
        if (documentId) {
          try {
            document = await strapi.documents(uid).findOne({ documentId });
          } catch (err) {
            strapi.log.error("Preview handler error:", err);
          }
        }

        // Handle Page collection
        if (uid === 'api::page.page' && document) {
          const slug = document.slug === 'home' ? '/' : `/${document.slug}`;
          return `${base}/api/preview?secret=${secret}&slug=${slug}`;
        }

        // Handle Child Page collection
        if (uid === 'api::child-page.child-page' && document) {
          const slug = `/industries/${document.slug}`;
          return `${base}/api/preview?secret=${secret}&slug=${slug}`;
        }

        // Fallback → always send to frontend homepage preview
        return `${base}/api/preview?secret=${secret}&slug=/`;
      },
    },
  },
});
