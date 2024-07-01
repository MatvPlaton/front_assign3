import typescript from '@rollup/plugin-typescript';

export default {
    plugins: [typescript()],
    input: 'src/script.ts',
    output: {file: 'dist/script.js'},
};
