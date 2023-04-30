module.exports = {
  types: [
    { value: 'feat', name: 'feat:     A new feature' },
    { value: 'fix', name: 'fix:      A bug fix' },
    { value: 'deps', name: 'deps:     A dependency changes' },
    { value: 'docs', name: 'docs:     Documentation only changes' },
    {
      value: 'refactor',
      name: 'refactor: A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'perf',
      name: 'perf:     A code change that improves performance',
    },
    { value: 'test', name: 'test:     Adding missing tests' },
    { value: 'ci', name: 'ci:       Changes to CI configuration files and scripts' },
    {
      value: 'chore',
      name: "chore:    Other changes that don't modify src or test files",
    },
  ],
  allowTicketNumber: false,
  allowCustomScopes: false,
  skipEmptyScopes: true,
  isTicketNumberRequired: false,
  allowBreakingChanges: ['feat', 'fix', 'refactor', 'perf'],
  skipQuestions: ['footer'],
  subjectLimit: 100,
};
