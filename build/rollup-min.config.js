import typescript from 'rollup-plugin-typescript';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
    input: 'src/index.ts',
    name: 'ImgBlurIn',
    // sourcemap: true,
    output: {
        format: 'umd',
        file: 'dist/img-blur-in.min.js'
    },
    plugins: [
        babel(),
        typescript(),
        uglify({
            // mangle: false,
            ie8: true
        })
    ]
}
