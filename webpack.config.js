const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: __dirname + "/src/app/index.js", 
  output: {
    path: __dirname + '/dist', 
    filename: 'bundle.js',  
    publicPath: '/' 
  },
  module: {  
      rules: [ 
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },

        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        }
      ]
  },
  plugins: [ 
      new HtmlWebpackPlugin({
          template: __dirname + "/src/public/index.html",
          inject: 'body'
      })
  ],
  devServer: {  
      contentBase: './src/public',  
      port: 7700, 
  } 
};