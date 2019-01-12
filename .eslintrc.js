module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true
  },
  "parserOptions": {
     "ecmaVersion": 6,
     "sourceType": "module",
     "ecmaFeatures": {
       "jsx": true
     }
  },
  "globals": {
    "window": true,
    "document": true
  },
  "rules": {
    "semi": [0],
    "no-trailing-spaces": 1, // 一行结束后面不要有空格
    "linebreak-style": [0 ,"error", "windows"]
  },
  "plugins": [
    "compat",
    "import",
    "promise"
  ]
}