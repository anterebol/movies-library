/** @type {import('next').NextConfig} */
const host = process.env.NEXT_PUBLIC_API_URL;
const imgUrl = process.env.NEXT_PUBLIC_IMG_URL;
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
        destination: `${host}/discover/movie?include_adult=false&include_video=false&language=en-US&:params`,
      },
      {
        source: '/genres',
        destination: `${host}/genre/movie/list?language=en`
      },
      {
        source: '/poster_config',
        destination: `${host}/configuration`
      },
      {
        source: '/movie/:id',
        destination: `${host}/movie/:id?language=en-US`
      },
      {
        source: '/trailer/:id',
        destination: `${host}/movie/:id/videos?language=en-US`
      },
      {
        source: '/movie_img/:size/:params',
        destination: `${imgUrl}:size/:params`
      },
    ];
  }
};

export default nextConfig;
