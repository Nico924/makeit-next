const chalk = require('chalk');

const logMessage = (message, level = 'info') => {
  // eslint-disable-next-line
  const color = level === 'error' ? 'red' : level === 'warning' ? 'yellow' : 'white';
  console.log(`[${new Date().toISOString()}]`, chalk[color](message));
};

const compilerPromise = (name, compiler) =>
  new Promise((resolve, reject) => {
    compiler.hooks.compile.tap(name, () => {
      logMessage(`[${name}] Compiling `);
    });
    compiler.hooks.done.tap(name, stats => {
      if (!stats.hasErrors()) {
        return resolve();
      }
      // eslint-disable-next-line
      return reject(`Failed to compile ${name}`);
    });
  });

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  compilerPromise,
  logMessage,
  sleep,
};
