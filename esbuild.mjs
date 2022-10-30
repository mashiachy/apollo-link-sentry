import esbuild from 'esbuild';
import pkg from "./package.json" assert { type: 'json' };

esbuild
  .build({
    entryPoints: ['src/index.ts'],
    outdir: 'lib',
    bundle: true,
    minify: true,
    format: 'cjs',
    target: 'esnext',
    external: Object.keys(pkg.peerDependencies),
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  });
