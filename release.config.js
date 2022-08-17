module.exports = {
  branches: ['master', { name: 'beta', prerelease: true }],
  ci: true,
  debug: true,
  plugins: [
    '@semantic-release/commit-analyzer',
    ['@semantic-release/release-notes-generator', { changelogFile: 'CHANGELOG.md' }],
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        message: 'chore: release ${nextRelease.version}',
        assets: ['package.json', 'CHANGELOG.md'],
      },
    ],
    '@semantic-release/github',
  ],
};
