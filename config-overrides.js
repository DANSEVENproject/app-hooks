const { alias } = require('react-app-rewire-alias');

module.exports = function override(config, env) {
    alias({
        '@components': 'src/components',
        '@pages': 'src/pages',
        '@context': 'src/context',
    })(config);

    return config;
}