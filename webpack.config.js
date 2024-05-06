// Import necessary modules using ES6 import syntax
import path from 'path';
import webpack from 'webpack';
import { fileURLToPath } from 'url';

// Get the directory name for the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Export the configuration as default
export default {
    // Define the entry point of your application
    entry: './src/employees.jsx', // Ensure this points to your main React entry file

    // Define where to output the compiled bundle
    output: {
        filename: 'bundle.js', // Output filename
        path: path.resolve(__dirname, 'public'), // Directory to output the bundle
    },

    // Define how different types of modules will be treated
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // Target both js and jsx files
                exclude: /node_modules/, // Exclude the node_modules directory
                use: {
                    loader: 'babel-loader', // Use babel-loader for transpiling
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'] // Use presets for both modern JS and React
                    }
                }
            }
        ]
    },

    // Resolve these extensions automatically
    resolve: {
        extensions: ['.js', '.jsx'], // Add '.js' and '.jsx' to the resolve list
    },

    // Set the mode to 'development' to enable dev-specific features like detailed source maps
    mode: 'development',

    // Configuration for Webpack Dev Server
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'), // Where to serve content from
        },
        compress: true, // Enable gzip compression
        port: 3000, // Port to run the server on
        open: true, // Open the browser after the server is started
        hot: true // Enable Hot Module Replacement without page refresh
    }
};
