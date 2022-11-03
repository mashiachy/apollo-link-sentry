import esbuild from 'esbuild';
import pkg from "./package.json" assert { type: 'json' };

esbuild.buildSync({
  entryPoints: ['src/index.ts'],
  outdir: 'lib',
  bundle: true,
  minify: true,
  treeShaking: true,
  format: 'cjs',
  target: ['node18'],
  external: Object.keys(pkg.peerDependencies),
  outExtension: {
    ".js": ".cjs"
  }
});

esbuild.buildSync({
  entryPoints: ['src/index.ts'],
  outdir: 'lib',
  bundle: true,
  minify: true,
  splitting: true,
  treeShaking: true,
  format: 'esm',
  target: ['esnext'],
  external: Object.keys(pkg.peerDependencies),
});
