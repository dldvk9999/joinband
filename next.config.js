/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";
import nextPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    reactStrictMode: false,
    swcMinify: true,
    // async rewrites() {
    //     return [
    //         {
    //             source: "/api/:path*",
    //             destination: `https://www.xxx.ga/api/:path*`,
    //         },
    //     ];
    // },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
        prependData: `@import "styles/_variables.scss"; @import "styles/_mixins.scss";`,
    },
    images: {
        imageSizes: [200],
    },
};

const nextConfig = nextPWA({
    dest: "public",
    // disable: !isProduction,
    runtimeCaching: [],
    runtimeCaching: runtimeCaching,
})(config);

export default nextConfig;
