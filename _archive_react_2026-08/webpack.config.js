module.exports = {
  resolve: {
    fallback: {
      // Add a polyfill for 'buffer'
      buffer: require.resolve('buffer/'),
    },
  },
};
