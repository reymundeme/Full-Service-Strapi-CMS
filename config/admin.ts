export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },

  // 👇 Preview configuration
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env('CLIENT_URL')], // e.g. http://localhost:3000
      async handler(uid, { documentId }) {
        const document = await strapi.documents(uid).findOne({ documentId });

        // ✅ Handle Pages
        if (uid === 'api::page.page') {
          const slug = document.slug === 'home' ? '/' : `/${document.slug}`;
          return `${env('PREVIEW_URL')}/api/preview?secret=${env('NEXT_PREVIEW_SECRET')}&slug=${slug}`;
        }

        // ✅ Handle Child-pages (industries/[slug])
        if (uid === 'api::child-page.child-page') {
          const slug = `/industries/${document.slug}`;
          return `${env('PREVIEW_URL')}/api/preview?secret=${env('NEXT_PREVIEW_SECRET')}&slug=${slug}`;
        }

        // ✅ Handle Articles (optional)
        if (uid === 'api::article.article') {
          return `${env('PREVIEW_URL')}/api/preview?secret=${env('NEXT_PREVIEW_SECRET')}&slug=/articles/${document.slug}`;
        }

        // Default fallback
        return env('PREVIEW_URL');
      },
    },
  },
});
