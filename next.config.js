const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
    domains:['broccolisite.netlify.app']
}
};
 
module.exports = withNextIntl(nextConfig);