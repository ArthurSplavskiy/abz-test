/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true
	},
	images: {
		domains: ['frontend-test-assignment-api.abz.agency']
	}
};

module.exports = nextConfig;
