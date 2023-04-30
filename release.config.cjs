const isDryRun = process.env.NODE_ENV !== 'production';

if (isDryRun) {
  // eslint-disable-next-line global-require
  const path = require('path');
  // eslint-disable-next-line global-require
  require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });
  console.log('Running release in dry-run mode!');
}

module.exports = {
  branches: ['main', { name: 'beta', prerelease: true }],
  ci: !isDryRun,
  debug: true,
  dryRun: isDryRun,
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/changelog', { changelogFile: 'CHANGELOG.md' }],
    ['@semantic-release/npm', { tarballDir: '.' }],
    [
      '@semantic-release/git',
      {
        message: 'chore(release): v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        assets: ['package.json', 'CHANGELOG.md'],
      },
    ],
    ['@semantic-release/github', { assets: [{ path: './*.tgz' }] }],
  ],
};
