const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'www.weather.go.kr',
      'avatars.githubusercontent.com',
      'firebasestorage.googleapis.com',
      'oaidalleapiprodscus.blob.core.windows.net',
      'graph.facebook.com',
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
