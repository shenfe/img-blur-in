import typescript from 'rollup-plugin-typescript';
import babel from 'rollup-plugin-babel';

export default {
    input: 'src/index.ts',
    name: 'ImgBlurIn',
    // sourcemap: true,
    output: {
        format: 'umd',
        file: 'dist/img-blur-in.js'
    },
    plugins: [
        babel(),
        typescript()
    ]
}
