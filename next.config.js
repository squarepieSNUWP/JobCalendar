/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: [
      "k.kakaocdn.net",
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
    ],
  },
};
