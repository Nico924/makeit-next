module.exports = {
  "extends": "./seed/.eslintrc.js",
  "rules":{
    "react/react-in-jsx-scope":"off"
  },
  "settings": {
    "import/resolver": {
      "typescript": {},// this loads <rootdir>/tsconfig.json to eslint
      "node": {
        "paths": ["src", "seed/node-modules", "seed/src"]
      },
    }
  }
}
