/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const templateDir = 'plop-templates';

const getTemplatePath = filename => path.join(templateDir, filename);
const componentPath = 'src/components';
const storePath = 'src/store';

const plopBase = require('./plopbase');

module.exports = plopBase({
  getTemplatePath,
  path,
  storePath,
  componentPath,
});
