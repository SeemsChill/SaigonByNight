module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://saigon-by-night-server.herokuapp.com/:path*",
      },
    ];
  },
};
