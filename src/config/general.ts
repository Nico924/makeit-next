import defaultConfig from 'config/seedGeneral';

import * as zeus from './graphql-zeus';

const dev = __DEV__;

const staging = __STAGING__;

// const baseUrlStaging = 'https://staging.api.makeit-studio.com/';
const baseUrlStaging = 'https://api.makeit-studio.com/';

export { zeus };

export const config = {
  ...defaultConfig,
  timeoutDialog: 0,
  defaultLanguage: 'en',
  singleLanguage: true,
  availableLanguages: ['en'],
  project: 'Starter React',
  storage: {
    name: 'makeit-storage',
    reducers: ['session', 'invest'],
  },
  cmsApollo: true,
  api: {
    baseUrl: staging || dev ? baseUrlStaging : 'https://api.makeit-studio.com/',
    baseUrlApollo:
      staging || dev
        ? 'https://gtm7160mbg.execute-api.eu-central-1.amazonaws.com/staging/'
        : 'https://pcaxk30i17.execute-api.eu-central-1.amazonaws.com/production/',
  },
  bodyNoScripts: [
    "<iframe src='https://www.googletagmanager.com/ns.html?id=GTM-KFHSQ3C' height='0' width='0' style='display:none;visibility:hidden'></iframe>",
  ],
  bodyScripts: [
    "(function(w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f); })(window, document, 'script', 'dataLayer', 'GTM-KFHSQ3C');",
    "(function(e,t,o,n,p,r,i){e.visitorGlobalObjectAlias=n;e[e.visitorGlobalObjectAlias]=e[e.visitorGlobalObjectAlias]||function(){(e[e.visitorGlobalObjectAlias].q=e[e.visitorGlobalObjectAlias].q||[]).push(arguments)};e[e.visitorGlobalObjectAlias].l=(new Date).getTime();r=t.createElement('script');r.src=o;r.async=true;i=t.getElementsByTagName('script')[0];i.parentNode.insertBefore(r,i)})(window,document,'https://diffuser-cdn.app-us1.com/diffuser/diffuser.js','vgo');vgo('setAccount', '650026655');vgo('setTrackByDefault', true);vgo('process');",
  ],
};

export const dom = {
  categories: {
    leanStartup: '#64c1be',
    lifeStartup: '#f1a4ab',
    hardwareIot: '#fad843',
  },
  jobCategories: {
    businessFounder: '#f1a4ab',
    technicalFounder: '#4a90e2',
    CEO: '#64c1be',
    CTO: '#fad843',
    internships: '#d9d9d9',
    growthHacker: '#d9d9d9',
    businessDeveloper: '#d9d9d9',
  },
};

export default config;
