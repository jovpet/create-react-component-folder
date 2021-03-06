const config = require('./config');

const getOptions = () => [
  {
    name: 'typescript',
    flags: '--typescript',
    description: 'Creates Typescript component and files',
    defaultValue: config.hasFlag('typescript'),
  },
  {
    name: 'nocss',
    flags: '--nocss',
    description: 'No css file',
    defaultValue: config.hasFlag('nocss'),
  },
  {
    name: 'stylesext',
    flags: '--stylesext',
    description: 'Adds Component.style.(js|ts) file',
    defaultValue: config.hasFlag('stylesext'),
  },
  {
    name: 'graphql',
    flags: '--graphql',
    description: 'Adds Graphql pattern including index, apollo, controller and view files to the component folder',
    defaultValue: config.hasFlag('graphql'),
  },
  {
    name: 'notest',
    flags: '--nocss',
    description: 'No css file',
    defaultValue: config.hasFlag('notest'),
  },
  {
    name: 'cssmodules',
    flags: '--cssmodules',
    description: 'Creates css/less/scss file with .module extensions. Example component.module.css',
    defaultValue: config.hasFlag('cssmodules'),
  },
  {
    name: 'reactnative',
    flags: '--reactnative',
    description: 'Creates React Native components',
    defaultValue: config.hasFlag('reactnative'),
  },
  {
    name: 'createindex',
    flags: '--createindex',
    description: 'Creates index.js file for multple component imports',
    defaultValue: config.hasFlag('createindex'),
  },
  {
    name: 'namedexports',
    flags: '-x, --namedexports',
    description: 'Creates files using named exports',
    defaultValue: config.hasFlag('namedexports'),
  },
  {
    name: 'functional',
    flags: '-f, --functional',
    description: 'Creates React stateless functional component',
    defaultValue: config.hasFlag('functional'),
  },
  {
    name: 'jsx',
    flags: '-j, --jsx',
    description: 'Creates the component file with .jsx extension',
    defaultValue: config.hasFlag('jsx'),
  },
  {
    name: 'less',
    flags: '-l, --less',
    description: 'Adds .less file to component',
    defaultValue: config.hasFlag('less'),
  },
  {
    name: 'scss',
    flags: '-s, --scss',
    description: 'Adds .scss file to component',
    defaultValue: config.hasFlag('scss'),
  },
  {
    name: 'proptypes',
    flags: '-p, --proptypes',
    description: 'Adds prop-types to component',
    defaultValue: config.hasFlag('proptypes'),
  },
  {
    name: 'uppercase',
    flags: '-u, --uppercase',
    description: 'Component files start on uppercase letter',
    defaultValue: config.hasFlag('uppercase'),
  },
  {
    name: 'default',
    flags: '-d, --default',
    description: 'Uses a default configuration if available',
    defaultValue: config.hasFlag('default'),
  },
  {
    name: 'stories',
    flags: '-sb, --stories',
    description: 'Add Story file to component',
    defaultValue: config.hasFlag('stories'),
  },
  {
    name: 'storiescontext',
    flags: '-sc, --storiescontext <directory>',
    description: 'Add context path to story title',
    defaultValue: config.getValue('storiescontext', ''),
  },
  {
    name: 'nosemi',
    flags: '-ns, --nosemi',
    description: 'No semicolons',
    defaultValue: config.hasFlag('nosemi'),
  },
  {
    name: 'output',
    flags: '-o, --output <directory>',
    description: 'The root directory to create components in',
    defaultValue: config.getValue('output', ''),
  },
  {
    name: 'graphqldefs',
    flags: '--graphqldefs <directory>',
    description: 'Path to graphql types definition (must be set when using typescript)',
    defaultValue: config.getValue('graphqldefs', './src/models/graphql'),
  },
  {
    name: 'apollolink',
    flags: '--apollolink <object>',
    description: 'Object definition for apollo mocks ( { path: \'./apollo/LoadingApolloLink.js\', name: \'LoadingApolloLink\' })',
    defaultValue: config.getValue('apollolink', ''),
  },
  {
    name: 'scssinclude',
    flags: '-si, --scssinclude <directory>',
    description: 'Paths to scss files to be included in scss generated components. (Only works with scss enabled)',
    defaultValue: config.getValue('scssinclude', []),
  },
  {
    name: 'hyphenatedcss',
    flags: '-hc, --hyphenatedcss',
    description: 'create hyphenated css class names. e.g .my-class',
    defaultValue: config.hasFlag('hyphenatedcss'),
  },
  {
    name: 'controller',
    flags: '--controller',
    description: 'create stateful pattern, including controller, view and index file. (Only works with named exports enabled! | --namedexports)',
    defaultValue: config.hasFlag('controller'),
  },
];

module.exports = getOptions;
