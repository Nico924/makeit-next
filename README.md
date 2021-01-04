#Author

Nicolas Bernier

# Git modules

Add this git as a submodule

git@gitlab.com:makeit-group/apps/seed-react.git

(you must have the right access)

Add it under the folder name /seed (very important)

Be careful with naming to avoid having the same path

# Installation

npm i
cd seed
npm i

or

npm i && cd seed && npm i

# Structure Project

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

- /actions
- /apis
- /reducers
- /sagas
- /utils

/styles : general scss

/types : flow types

# Seed

The seed containes all the shared logic accross projects

# Storybook

cd ./seed
yarn storybook

it will also look at the parent stories

# Test

cd ./seed
yarn test

it will also look at the parent stories

# Start build

cd ./seed
yarn start

yarn build

# Icons

We use this librairie (check in dependencies)

https://react-icons.netlify.com/#/

https://fontawesome.com/icons?d=gallery&s=brands,regular,solid&m=free

# Update

## Staging

Run from project

```sh
rm -f -r ssr && cd seed && npm run staging-ssr && cd .. && cp -r ./seed/ssr ./ssr && cp ./update-staging.sh ./ssr/update-staging.sh && cd ssr && bash ./update-staging.sh && cd ..
```

or (no build)

```sh
cd ssr && bash ./update-staging.sh && cd ..
```

## Prod

Run from root

```sh
rm -f -r ssr && cd seed && npm run build-ssr && cd .. && cp -r ./seed/ssr ./ssr && cp ./update-prod.sh ./ssr/update-prod.sh && cd ssr && bash ./update-prod.sh && cd ..
```

or (no build)

```sh
cd ssr && bash ./update-prod.sh && cd ..
```

# Zeus

zeus https://pcaxk30i17.execute-api.eu-central-1.amazonaws.com/production/ ./src/config --ts
