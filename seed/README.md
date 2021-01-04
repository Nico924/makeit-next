# Make it Seed

## Author

Nicolas Bernier

## Infos

This project needs to be the submodule of a project.
He is not supposed to be launched on its own.

## Firebase

If you are using firebase, do not fodrget to add the following in the index.html file of the project

<!-- Firebase App is always required and must be first -->
<script src="https://www.gstatic.com/firebasejs/_VERSION_/firebase-app.js"></script>
<!-- Add additional services that you want to use -->
<script src="https://www.gstatic.com/firebasejs/_VERSION_/firebase-auth.js"></script>

## Structure

/components : react part

- /enhancers : high order components
- /formItems : components used by redux-form
- /forms : redux-from forms
- /global : global components of the app (Navigation, Header, ...)
- /items : components used in multiple other components
- /layouts : layout components of the app
- /listItems : components used in list
- /pageItems : specific sub-part of pages (if used several times, shoudl be moved to items)
- /routes : page components (endpoint of the react-router)
- /structure : structural components taking children

/store : redux part

- /app // app resource
- /auth // auth resource
- /content // content ressource
- /setup // setup of the store
- /utils
- rootReducer.ts // root reducers
- rootSage.ts // root sagas

/styles : general scss

## Icons

We use this librairie (check in dependencies)

https://fontawesome.com/icons?d=gallery&s=brands,light,regular,solid&m=free

## Eslint

Could be removed as it should be present in the parent for the IDE

Eslint package related modules to add in the parent :

```json
{
  "babel-eslint": "^10.0.2",
  "eslint": "^5.16.0",
  "eslint-config-airbnb": "^17.1.1",
  "eslint-config-airbnb-base": "^13.2.0",
  "eslint-config-airbnb-typescript": "^4.0.1",
  "eslint-config-prettier": "^6.0.0",
  "eslint-import-resolver-webpack": "^0.10.1",
  "eslint-plugin-babel": "^5.1.0",
  "eslint-plugin-import": "^2.18.2",
  "eslint-plugin-jest": "^22.14.1",
  "eslint-plugin-jsx-a11y": "^6.2.3",
  "eslint-plugin-prettier": "^3.1.0",
  "eslint-plugin-react": "^7.14.3",
  "prettier": "^1.18.2",
  "prettier-stylelint": "^0.4.2",
  "typescript": "^3.4.4"
}
```

## Reorder package.json

```bash
npm remove -S example && npm remove -D example;
```

## Styles

Add a file in the parent

stylelint.config.js

```javascript
module.exports = {
  extends: './seed/stylelint.config.js',
};
```

## Code formating (prettier && eslint)

Prettier handle code formating (tabs, space, ...)
Eslint handle code error

You need the plugins _eslint_ and _prettier - code formatter_ from VS Code

### Config

You only need the plugin eslint

1. In you eslint config, include the prettier config as below:

```javascript
'prettier/prettier': 'error',
```

2. Then edit your VSCode as below

```json
{
  "javascript.validate.enable": false,
  "typescript.validate.enable": false,
  // Editor
  "editor.formatOnSave": true,
  // Eslint
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```

3. Add a .prettierrc.js (or equivalent) in your root folder

```javascript
module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
};
```

## Other VSCode extansions

Make sure to have the following extensions :

SCSS intelliSence
stylelint

## Typescript

Add tsconfig.json in the parent

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react",
    "baseUrl": ".",
    "paths": {
      "*": ["src/*", "admin/src/*", "seed/src/*"]
    }
  }
}
```

## Store

### Structure

a resource is a folder made of

resourceName/

- actions
- api
- constants
- index : gather everything (module based)
- reducer
- sagas
- selectors

In the parent :

create appSaga.ts in the store folder of this form

```typescript
import { fork } from 'redux-saga/effects';

import YOUR_RESROURCE from 'store/YOUR_RESROURCE';

import bootupSaga from './bootup';

export default function* appSaga(): void {
  yield fork(bootupSaga);
  yield fork(YOUR_RESROURCE.saga);
  ...
}

```

create appReducers.ts in the store folder of this form

```typescript
import YOUR_RESROURCE from 'store/YOUR_RESROURCE';
...

const reducers = {
  resource1: YOUR_RESROURCE.reducer,
  ...
};

export type AppStoreState = {
  resource1: ReturnType<typeof YOUR_RESROURCE.reducer>;
};

export default reducers;

```
