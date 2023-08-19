module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '959ac33c1c8ddab570bf616ee2f0e8e4'),
    },
  },
  NODE_OPTIONS: "--openssl-legacy-provider"
});
