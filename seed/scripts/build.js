const webpack = require('webpack');
const rimraf = require('rimraf');
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');

const clientConfigBuilder = require('../config/webpack/ssr/client.js');
const serverConfigBuilder = require('../config/webpack/ssr/server.js');

const paths = require('../config/paths');
const { logMessage, compilerPromise, sleep } = require('./utils');

const args = process.argv.slice(2);

// const generateStaticHTML = async () => {
//   const nodemon = require('nodemon');
//   const fs = require('fs');
//   const puppeteer = require('puppeteer');
//   const port = await choosePort('localhost', 8505);

//   process.env.PORT = port;

//   const script = nodemon({
//     script: `${paths.serverBuild}/server.js`,
//     ignore: ['*'],
//   });

//   script.on('start', async () => {
//     try {
//       await sleep(2000);
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();
//       await page.goto(`http://localhost:${port}`);
//       const pageContent = await page.content();
//       fs.writeFileSync(`${paths.clientBuild}/index.html`, pageContent);
//       await browser.close();
//       script.emit('quit');
//     } catch (err) {
//       script.emit('quit');
//       console.log(err);
//     }
//   });

//   script.on('exit', code => {
//     process.exit(code);
//   });

//   script.on('crash', () => {
//     process.exit(1);
//   });
// };

const build = async () => {
  rimraf.sync(paths.clientBuild);
  rimraf.sync(paths.serverBuild);

  let generateStatic = false;
  let staging = false;
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === 'static' || arg === '-static') generateStatic = true;

    if (arg === 'staging' || arg === '-staging') staging = true;
  }

  const clientConfig = clientConfigBuilder({
    prod: true,
    staging,
  });
  const serverConfig = serverConfigBuilder({
    prod: true,
    staging,
  });

  // Combine (as for dev)
  const multiCompiler = webpack([clientConfig, serverConfig]);

  const clientCompiler = multiCompiler.compilers.find(compiler => compiler.name === 'client');
  const serverCompiler = multiCompiler.compilers.find(compiler => compiler.name === 'server');

  const clientPromise = compilerPromise('client', clientCompiler);
  const serverPromise = compilerPromise('server', serverCompiler);

  serverCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats));
    }
  });

  clientCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(clientConfig.stats));
    }
  });

  // wait until client and server is compiled
  try {
    await serverPromise;
    await clientPromise;
    // not very necessary

    if (generateStatic) {
      // await generateStaticHTML();
    }
    logMessage('Done!', 'info');
    process.exit();
  } catch (error) {
    logMessage(error, 'error');
  }
};

build();
