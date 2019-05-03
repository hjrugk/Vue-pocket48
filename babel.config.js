module.exports = {
  "presets": [
    "@vue/app",
    [
      "@babel/preset-env",
      {
        "targets": {
          "esmodules": true
        }
      }
    ]
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ],
  "ignore": [
    "server.js",
    "bin/**/*.js",
    "public/lib/*.js"
  ]
}