import SeedRoutes from 'config/seedRoute';

// Basic Route
// login: {
//   fr: 'connexion',
//   en: 'login',
//   nl: 'verbinding',
// }

// Route with Params
// user: {
//   fr: 'user',
//   nl: 'user',
//   id: {
//     params: ':id',
//   },
// },

// Sub Route
// user: {
//   fr:'user'
//   nl:'user'
//   edit:{
//     fr:'edit',
//     nl:'edit',
//   }
// }

export const Routes = {
  ...SeedRoutes,
};

export default Routes;
