const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server.js', // Entry point of your application
  target: 'node', // Target environment is Node.js
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output file name
  },
};