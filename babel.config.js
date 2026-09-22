module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo','@babel/preset-typescript',],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        '@': './',
                    },
                },
            ],
            'react-native-reanimated/plugin', // ⚠️ must stay last
        ],
    }
}