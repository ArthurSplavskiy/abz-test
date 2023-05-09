/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true
	},
	images: {
		formats: ['image/webp'],
		domains: ['frontend-test-assignment-api.abz.agency']
	}
};

module.exports = nextConfig;
