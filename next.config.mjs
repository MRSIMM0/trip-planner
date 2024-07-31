/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
    reactStrictMode: true, 
    swcMinify: true,    
    compiler: {
      removeConsole: process.env.NODE_ENV !== "development",
    },
  };

  import withPWA from 'next-pwa';

  const withPWAConf = withPWA({
    dest: "public", 
    disable: process.env.NODE_ENV === "development", 
    register: true, 
    skipWaiting: true,
  });
  

  export default withPWAConf(nextConfig);
