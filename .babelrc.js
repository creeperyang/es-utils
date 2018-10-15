const presets = [
    [
        '@babel/preset-env',
        {
            useBuiltIns: false,
            targets: {
                node: '6',
                browsers: 'last 2 versions'
            },
            exclude: ['transform-typeof-symbol']
        }
    ]
];
const plugins = [];

module.exports = {
    presets,
    plugins
};
