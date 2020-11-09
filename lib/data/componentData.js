const Handlebars = require('handlebars');
const stringHelper = require('../utils/stringHelper');
const { readFileAsync } = require('../utils/fileHelpers');
const config = require('../config');

/**
 * Get either a functional or class component template
 *
 * @returns {Promise|Promise<string>}
 */
async function getComponentTemplate() {
  const templateName = config.hasFlag('functional')
    ? 'fnComponent.handlebars'
    : 'classComponent.handlebars';

  try {
    return await readFileAsync(`${config.getValue('templates')}/${templateName}`);
  } catch (error) {
    return readFileAsync(`${config.getValue('crcf')}/templates/${templateName}`);
  }
}

/**
 * Get the test template
 *
 * @returns {Promise|Promise<string>}
 */
async function getTestTemplate() {
  try {
    return await readFileAsync(`${config.getValue('templates')}/test.handlebars`);
  } catch (error) {
    return readFileAsync(`${config.getValue('crcf')}/templates/test.handlebars`);
  }
}

/**
 * Get the style template
 *
 * @returns {Promise|Promise<string>}
 */
async function getStyleTemplate() {
  try {
    return await readFileAsync(`${config.getValue('templates')}/cssComponent.handlebars`);
  } catch (error) {
    return readFileAsync(`${config.getValue('crcf')}/templates/cssComponent.handlebars`);
  }
}

/**
 * Get the storybook stories template
 *
 * @returns {Promise|Promise<string>}
 */
async function getStorybookTemplate() {
  try {
    return await readFileAsync(`${config.getValue('templates')}/stories.handlebars`);
  } catch (error) {
    return readFileAsync(`${config.getValue('crcf')}/templates/stories.handlebars`);
  }
}

/**
 * Creates a React component
 *
 * @param {String} componentName - Component name
 * @param {String} cssext - css file extension used for css modules (css, less, scss)
 * @returns {Promise|Promise<string>}
 */
async function createReactComponent(componentName, cssext = 'css') {
  const name = stringHelper.componentNameWithoutSpecialCharacter(componentName);
  const file = getComponentTemplate();
  const template = Handlebars.compile(await file);

  return template({
    name,
    cssmodules: config.hasFlag('cssmodules'),
    cssext,
    typescript: config.hasFlag('typescript'),
    native: config.hasFlag('reactnative'),
    proptypes: config.hasFlag('proptypes'),
    export: config.hasFlag('namedexports'),
  });
}

/**
 * Creates a test file for the generated component
 *
 * @param {String} componentName - Component name
 * @returns {String}
 */
async function createReactComponentTest(componentName) {
  const componentNameUpperCase = stringHelper.componentNameWithoutSpecialCharacter(componentName);
  const file = getTestTemplate();
  const template = Handlebars.compile(await file);

  return template({
    name: componentNameUpperCase,
    nameLowerCase: componentName,
    uppercase: config.hasFlag('uppercase'),
    typescript: config.hasFlag('typescript'),
    native: config.hasFlag('reactnative'),
    proptypes: config.hasFlag('proptypes'),
    export: config.hasFlag('namedexports'),
  });
}

/**
 * Creates Stories for the React component
 *
 * @param {String} componentName - Component name
 * @returns {String}
 */
async function createReactComponentStories(componentName) {
  const name = stringHelper.componentNameWithoutSpecialCharacter(componentName);
  const file = getStorybookTemplate();
  const template = Handlebars.compile(await file);

  return template({
    name,
    nameLowerCase: componentName,
    uppercase: config.hasFlag('uppercase'),
    typescript: config.hasFlag('typescript'),
    native: config.hasFlag('reactnative'),
    proptypes: config.hasFlag('proptypes'),
    export: config.hasFlag('namedexports'),
  });
}

/**
 * Creates a React style file
 *
 * @param {String} componentName - Component name
 * @returns {String}
 */
async function createReactComponentStyle(componentName) {
  const name = stringHelper.componentNameWithoutSpecialCharacter(componentName);
  const hyphenatedname = stringHelper.hypehnateName(name);
  const file = getStyleTemplate();
  const template = Handlebars.compile(await file);

  return template({
    name,
    scss: config.hasFlag('scss'),
    hyphenatedcss: config.hasFlag('hyphenatedcss'),
    hyphenatedname,
    scssinclude: config.getValue('scssinclude'),
  });
}

/**
 * Creates a default index file
 *
 * @param {String} componentName - Component name
 * @returns {String}
 */
function createIndex(componentName) {
  const name = config.hasFlag('uppercase')
    ? stringHelper.componentNameWithoutSpecialCharacter(componentName)
    : componentName;

  const exportedAs = config.hasFlag('namedexports') ? name : 'default';

  return `export { ${exportedAs} } from './${name}';\n`;
}

/**
 * Creates index file that includes all generated component folders
 *
 * @param {Array} folders - folders array
 * @returns {String}
 */
function createIndexForFolders(folders) {
  return `${folders
    .map((folderName) => `import ${folderName} from './${folderName}' \n`)
    .join('')}export {
    ${folders
    .map((folderName, index) => {
      if (index === folders.length - 1) return folderName;

      return `${folderName}, \n`;
    })
    .join('')}
}`;
}

module.exports = {
  createReactComponent,
  createReactComponentTest,
  createReactComponentStories,
  createReactComponentStyle,
  createIndex,
  createIndexForFolders,
};
