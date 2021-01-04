const dev = __DEV__;
const staging = __STAGING__;
const browser = __BROWSER__;
const ssr = __SSR__;
const test = __TEST__;

export const seedViewConfig = {
  shadowSwitch: '1px 0px 8px 0 rgba(0,0,48,.18)',
  colors: {
    green: '#2ce1be',
    red: 'rgb(245, 72, 72)',
    orange: '#ebac2f',
    blue: '#0e5cad',
  },
  switchActive: '#2ce1be',
};

export const config = {
  // webpack variables
  // dev mode
  dev,
  // staging mode
  staging,
  // browser side
  browser,
  // server side
  server: !browser,
  // ssr mode
  ssr,
  // test mode
  test,
  // other configs
  timeoutDialog: 400,
  timeoutModal: 5000,
  timeoutLoader: dev ? 5000 : 20000,
  // default limit of apis
  defaultLimit: 100,
  defaultSort: 'createdAt desc',
  defaultIcon: 'fontawesome', // or project
  defaultLanguage: 'en',
  singleLanguage: false,
  availableLanguages: ['en', 'fr', 'nl'],
  prod: !dev,
  sessionCookie: 'session',
  sessionLogin: false,
  // Force treatment of content retrieved by an api
  forcedTreatmentContent: false,
  // sails used id now mango uses _id
  idKey: 'id',
  // Project whitelisted content variabled (allows to exclude admin parameters)
  whitelistedContentKeys: ['position', 'label', 'link', 'url', 'value', 'type', 'src'],
  storeOnlyCurrentLanguage: false,
  /**
  |--------------------------------------------------
  | Start Error handling
  |--------------------------------------------------
  */
  // default key to get the error message
  errorMessageLabel: 'message',
  // default key to get the error code
  errorCodeLabel: 'code',
  // default key to get the error code
  errorFirebaseCodeLabel: 'code',
  // default key to get the errors list
  errorListLabel: 'data',
  // keys of disconnected error codes (in addition to the standards)
  disconnectedErrors: [],
  // Firebase error label in the response
  firebaseErrorLabel: 'firebaseError',
  // errors path in the content
  errorsPath: 'server.errors',
  // success path in the content
  successPath: 'general.success',
  // Cropper save button path
  cropperSavePath: 'general.buttons.save',
  // Used to custom validation content
  pathToValidationInCMS: '',
  // alias of pathToValidationInCMS
  validationPath: '',
  // when getting data from server, try to return data[defaultResponsePath]
  defaultResponsePath: 'result',
  // Path of errors in 200 success response but with errors
  defaultErrorsPath: 'errors',
  // Allow to override the error and success default title
  successTitle: '',
  errorTitle: '',
  authenticationError: '',
  /**
  |--------------------------------------------------
  | End Error handling
  |--------------------------------------------------
  */
  // If we use firebase in our app for auth or something else
  firebase: false,
  // If we use apollo (graph-ql) in our app for auth or something else
  apollo: false,
  // key used in the CMS to add new element (ignored in content)
  keyNewContent: '_NEW',
  loader: 'threedots',
  buttonLoader: 'threedots',
  // Label of the parameter send to the search api called in the custom select
  selectSearchParameter: 'search',
  // send email at creation of account
  emailVerification: false,
  // firebase overlay loading
  // scripts to add in SSR
  indexScripts: [],
  headScripts: [],
  bodyNoScripts: [],
  headFunctions: [],
  /**
  |--------------------------------------------------
  | Storage
  |--------------------------------------------------
  */
  storage: {
    name: 'seed-storage',
    reducers: ['session'],
  },
  serverStorage: true,
  cookieStorage: true,
  /**
  |--------------------------------------------------
  | Search
  |--------------------------------------------------
  */
  // Search suffix after dynamic name for crud method
  searchUrlSuffix: '',
  /**
   * If true, list in cms are stored as Array instead of object (default)
   */
  cmsObjectArray: false,
  // if true => no treatment needed
  staticContent: false,
  /**
   * Apollo related configs
   */
  // cms
  cmsApollo: false,
  // send token or not to content
  cmsToken: false,
  cmsQueryName: 'pagesGetMany',
  // login
  loginApollo: false,
  loginQueryName: 'login',
  updatePasswordMutationName: 'updateMePassword',
  resetPasswordMutationName: 'resetPassword',
};

export default config;
