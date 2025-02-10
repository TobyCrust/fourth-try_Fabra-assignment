/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
      },
    });
    return config;
  },
  async redirects() {
    return [
      // {
      //   source: '/loginPage',
      //   destination: '/3Dpage',
      //   permanent: true
      // },
      {
        source: '/viewer',
        destination: '/design',
        permanent: true
      }
    ];
  }
}

module.exports = nextConfig



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   async rewrites() {
//     return [
//       {
//         source: '/viewer',
//         destination: '/login/page'
//       },
//       {
//         source: '/dashboard',
//         destination: '/Dashboard/Dashboard'
//       }
//     ]
//   },
//   server: {
//     port: 3000
//   },
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.(glb|gltf)$/,
//       type: 'asset/resource'
//     });
//     return config;
//   }
// }

// module.exports = nextConfig