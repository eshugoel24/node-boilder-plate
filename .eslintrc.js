module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "airbnb-base",
    "rules": {
        "comma-dangle": [2, "never"],
        "linebreak-style": 0,
        "indent": 0,
        "consistent-return": [0],
         "no-use-before-define": ["error", { "functions": false}],
        "arrow-body-style": [1, "as-needed"],
        "no-underscore-dangle": ["error", { "allow": ["_id"] }],
        "import/no-unresolved": [0],
        "strict": [0, "global"],
        "no-param-reassign": 0,
        "max-len": ["error", { "ignoreTrailingComments": true }, {code: 150}],
    }
};
