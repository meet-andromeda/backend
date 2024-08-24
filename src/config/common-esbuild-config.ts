import stage from './stage';

const commonEsbuildConfig = {
  watch: {
    pattern: ['src/**/*.ts'],
  },
  sourcemap: true, // ✅ enabled esbuild sourcemaps generation,
  minify: true,
  exclude: ['aws-sdk'],
};

if (stage === 'local') {
  commonEsbuildConfig.minify = false;
  commonEsbuildConfig.exclude = [];
}

export default commonEsbuildConfig;
