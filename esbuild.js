import esbuild from 'esbuild';
import pkg from "./package.json"  assert { type: 'json' };

esbuild
  .build({
    entryPoints: ['src/index.ts'],
    outdir: 'lib',
    bundle: true,
    minify: true,
    splitting: true,
    format: 'esm',
    target: ['esnext'],
    external: Object.keys(pkg.peerDependencies),
  })
  .catch(() => process.exit(1));
