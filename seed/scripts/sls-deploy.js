/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const execa = require('execa');
const Listr = require('listr');
const package = require('../../package.json');

// Arguments checks

const stage = process.argv[2] || 'dev';

/* eslint-disable */
if (!package.deploy) throw 'no deploy config in parent package.json';
if (!package.deploy.awsProfile) throw 'no deploy awsProfile in parent package.json';
if (!package.deploy[stage]) throw `no deploy config for this stage ${stage} in parent package.json`;
if (!package.deploy[stage].bucket || package.deploy[stage].bucket === '')
  throw `no BUCKET config for this stage ${stage} in parent package.json`;
/* eslint-enable */

const awsProfile = package.deploy.awsProfile;
const bucketUrl = package.deploy[stage].bucket;
const distributionId = package.deploy[stage].id;

const deployBase = function(basePath) {
  return new Listr(
    [
      {
        title: 'Build client-ssr',
        task: async () => {
          const { stdout } = await execa(
            'webpack',
            ['--stage', stage, '--config', 'config/webpack/ssr/slsClient.js'],
            {
              all: true,
            },
          );
          console.log(stdout);
        },
      },
      // {
      //   title: 'Copy manifest to server-ssr',
      //   task: () =>
      //     execa('cp', [
      //       'sls/client/loadable-stats.json',
      //       'src/server/loadable-stats.json',
      //     ]).then(result => {}),
      // },
      {
        title: 'Deploy client',
        task: async () => {
          const { stdout } = await execa(
            'aws',
            [
              's3',
              'sync',
              './sls/client',
              bucketUrl,
              '--profile',
              awsProfile,
              '--sse',
              '--delete',
              '--cache-control',
              'max-age=31536000,public',
            ],
            {
              all: true,
            },
          );
          console.log(stdout);
        },
      },
      {
        title: 'Deploy server',
        task: async () => {
          const { stdout } = await execa(
            'sls',
            [
              'deploy',
              '--config',
              './serverless.yaml',
              '--stage',
              stage,
              '--aws-profile',
              awsProfile,
            ],
            {
              all: true,
            },
          );
          console.log(stdout);
        },
      },
      // {
      //   title: 'Invalidate cache',
      //   task: async () => {
      //     const { stdout } = await execa(
      //       'aws',
      //       [
      //         'cloudfront',
      //         '--aws-profile',
      //         awsProfile,
      //         'create-invalidation',
      //         '--distribution-id',
      //         distributionId,
      //         '--path',
      //         '"/*"',
      //       ],
      //       {
      //         all: true,
      //       },
      //     );
      //     console.log(stdout);
      //   },
      // },
    ],
    { concurrent: false },
  );
};

deployBase('')
  .run()
  .catch(err => {
    console.error(err);
  });
