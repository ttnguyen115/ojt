/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ["@redux-eggs"],
    redirects: () => [
        {
            source: "/:slug(\\d+)",
            destination: "/car/:slug",
            permanent: true,
        },
    ],
    rewrites: () => [],
    headers: () => [
        {
            source: "/",
            headers: [
                {
                    key: "Cache-Control",
                    value: "no-store",
                },
            ],
        },
    ],
};

export default nextConfig;
