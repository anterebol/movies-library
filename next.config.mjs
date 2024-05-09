/** @type {import('next').NextConfig} */
const host = process.env.NEXT_PUBLIC_API_URL;
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/movies',
        permanent: false
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/search_movies/:params',
        destination: `${host}/3/discover/movie?language=en-US:params`,
      },
      {
        source: '/genres',
        destination: `${host}/3/genre/movie/list?language=en`
      }
    ];
  }
};

export default nextConfig;
