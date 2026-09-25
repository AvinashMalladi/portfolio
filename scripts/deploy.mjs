import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { publish } from 'gh-pages'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

process.env.GH_PAGES = '1'

const build = spawnSync('vite', ['build'], { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' })
if (build.status !== 0) process.exit(build.status ?? 1)

publish(
  path.join(root, 'dist'),
  { branch: 'gh-pages', message: 'Deploy to GitHub Pages [skip ci]' },
  (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log('Published to GitHub Pages')
  },
)