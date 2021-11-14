module.exports = {
  reactStrictMode: true,
  async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://saigon-by-night-server.herokuapp.com/:path*',
          },
        ]
      }
};
