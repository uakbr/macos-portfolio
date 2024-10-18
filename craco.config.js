module.exports = {
  style: {
    postcss: {
      plugins: [
        require("tailwindcss"),
        require("autoprefixer")
      ]
    }
  },
  babel: {
    presets: ['@babel/preset-env', '@babel/preset-react'],
  },
  webpack: {
    configure: (webpackConfig) => {
      // Add any custom webpack configuration here
      return webpackConfig;
    },
  },
}
