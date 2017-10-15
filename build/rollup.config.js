import typescript from 'rollup-plugin-typescript';

export default {
    input: 'src/index.ts',
    name: 'ImgBlurIn',
    // sourcemap: true,
    output: {
        format: 'umd',
        file: 'dist/img-blur-in.js'
    },
    plugins: [
        typescript()
    ]
}
