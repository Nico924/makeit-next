module.exports = function(config) {
  return function(plop) {
    plop.setPrompt('directory', require('inquirer-directory'));

    const genComponent = ({ targetPath, storyfile, componentfile, stylefile, testfile }) => {
      const actions = [];

      testfile = testfile || 'component/componentTest.hbs';
      stylefile = stylefile || 'component/componentStyle.hbs';
      storyfile = storyfile || 'component/story.hbs';

      actions.push({
        type: 'add',
        path: `${targetPath}/{{pascalCase name}}/index.tsx`,
        templateFile: config.getTemplatePath(componentfile),
      });
      actions.push({
        type: 'add',
        path: `${targetPath}/{{pascalCase name}}/{{camelCase name}}.scss`,
        templateFile: config.getTemplatePath(stylefile),
      });
      actions.push({
        type: 'add',
        path: `${targetPath}/{{pascalCase name}}/{{pascalCase name}}.test.tsx`,
        templateFile: config.getTemplatePath(testfile),
      });
      actions.push({
        type: 'add',
        path: `${targetPath}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx`,
        templateFile: config.getTemplatePath(storyfile),
      });

      return actions;
    };

    const componentPrompts = () => {
      const prompts = [];

      prompts.push({
        type: 'input',
        name: 'name',
        message: 'Component name please',
      });

      prompts.push({
        type: 'directory',
        name: 'path',
        message: 'Where should the component go?',
        basePath: config.componentPath,
      });

      prompts.push({
        type: 'checkbox',
        name: 'options',
        choices: [
          { name: 'redux', checked: true },
          { name: 'formItem', checked: false },
        ],
        message: 'Select configuration options',
      });

      return prompts;
    };

    const genNormalComponent = data => {
      const componentfile = data.options.includes('redux')
        ? 'component/componentHookRedux.hbs'
        : 'component/componentHook.hbs';

      const storyfile = data.options.includes('formItem')
        ? 'component/story-form.hbs'
        : 'component/story.hbs';

      const targetPath = config.path.join(config.componentPath, data.path);

      return genComponent({
        targetPath,
        storyfile,
        componentfile,
      });
    };

    const componentFormPrompts = () => {
      const prompts = [];

      prompts.push({
        type: 'input',
        name: 'name',
        message: 'Component name please',
      });

      return prompts;
    };

    const genFormComponent = data => {
      const componentfile = 'component/componentForm.hbs';
      const targetPath = config.path.join(config.componentPath, '/forms');

      data.name += 'Form';

      const actions = genComponent({ targetPath, componentfile });

      return actions;
    };

    /**
     * Resource
     */
    const resourcePrompts = () => {
      const prompts = [];

      prompts.push({
        type: 'input',
        name: 'name',
        message: 'Resource name please',
      });

      prompts.push({
        type: 'checkbox',
        name: 'options',
        choices: [{ name: 'apollo', checked: true }],
        message: 'Select configuration options',
      });

      return prompts;
    };

    const genResource = data => {
      const apollo = data.options.includes('apollo');

      const constantsFile = 'ressource/constants.hbs';
      const actionsFile = 'ressource/actions.hbs';
      const reducerFile = 'ressource/reducer.hbs';

      const sagasFile = 'ressource/sagas.hbs';
      const apisFile = 'ressource/apis.hbs';

      const sagasApolloFile = 'ressource/sagasApollo.hbs';
      const modelsFile = 'ressource/models.hbs';

      const selectorsFile = 'ressource/selectors.hbs';

      const indexFile = 'ressource/index.hbs';
      const indexApolloFile = 'ressource/indexApollo.hbs';

      const actions = [];
      // data name
      actions.push({
        type: 'add',
        path: `${config.storePath}/{{camelCase name}}/constants.ts`,
        templateFile: config.getTemplatePath(constantsFile),
      });
      actions.push({
        type: 'add',
        path: `${config.storePath}/{{camelCase name}}/actions.ts`,
        templateFile: config.getTemplatePath(actionsFile),
      });
      actions.push({
        type: 'add',
        path: `${config.storePath}/{{camelCase name}}/reducer.ts`,
        templateFile: config.getTemplatePath(reducerFile),
      });

      if (apollo) {
        actions.push({
          type: 'add',
          path: `${config.storePath}/{{camelCase name}}/models.ts`,
          templateFile: config.getTemplatePath(modelsFile),
        });
        actions.push({
          type: 'add',
          path: `${config.storePath}/{{camelCase name}}/sagas.ts`,
          templateFile: config.getTemplatePath(sagasApolloFile),
        });
        actions.push({
          type: 'add',
          path: `${config.storePath}/{{camelCase name}}/index.ts`,
          templateFile: config.getTemplatePath(indexApolloFile),
        });
      } else {
        actions.push({
          type: 'add',
          path: `${config.storePath}/{{camelCase name}}/sagas.ts`,
          templateFile: config.getTemplatePath(sagasFile),
        });
        actions.push({
          type: 'add',
          path: `${config.storePath}/{{camelCase name}}/apis.ts`,
          templateFile: config.getTemplatePath(apisFile),
        });
        actions.push({
          type: 'add',
          path: `${config.storePath}/{{camelCase name}}/index.ts`,
          templateFile: config.getTemplatePath(indexFile),
        });
      }
      actions.push({
        type: 'add',
        path: `${config.storePath}/{{camelCase name}}/selectors.ts`,
        templateFile: config.getTemplatePath(selectorsFile),
      });

      return actions;
    };

    /*
    Custom hook
    */

    const hookPromps = () => {
      const prompts = [];

      prompts.push({
        type: 'input',
        name: 'name',
        message: 'custom Hook name please',
      });

      return prompts;
    };

    const genHook = data => {
      const hookFile = 'component/customHook.hbs';

      const hookPath = config.path.join(config.componentPath, '/hooks');

      const actions = [];
      actions.push({
        type: 'add',
        path: `${hookPath}/{{camelCase name}}.ts`,
        templateFile: config.getTemplatePath(hookFile),
      });
      return actions;
    };

    plop.setGenerator('Component', {
      description: 'Make a component',
      prompts: componentPrompts(),
      actions: genNormalComponent,
    });

    plop.setGenerator('Component Form', {
      description: 'Make a form component',
      prompts: componentFormPrompts(),
      actions: genFormComponent,
    });

    plop.setGenerator('Resource', {
      description: 'Make a resource in the store (action, reducer & saga)',
      prompts: resourcePrompts(),
      actions: genResource,
    });

    plop.setGenerator('Hook', {
      description: 'Make a custom reusable hookc',
      prompts: hookPromps(),
      actions: genHook,
    });
  };
};
