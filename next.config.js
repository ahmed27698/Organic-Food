const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
    domains:['broccolisite.netlify.app','res.cloudinary.com']
}
};
 
module.exports = withNextIntl(nextConfig);