import { getDeclarationDir } from '../getDeclarationDir';

describe('utils', () => {
  describe('getDeclarationDir', () => {
    it('should return `pluginOutputPath` dir if no other options are specified are specified', () => {
      const pluginOutputPath = 'pluginOutputPath';
      const esbuildOutDir = 'esbuildOutDir';

      const result = getDeclarationDir({ pluginOutputPath, esbuildOutDir });
      expect(result).toBe(pluginOutputPath);
    });

    it('should return `esbuildOutDir` dir if no other options are specified', () => {
      const esbuildOutDir = 'esbuildOutDir';

      const result = getDeclarationDir({ esbuildOutDir });
      expect(result).toBe(esbuildOutDir);
    });

    it('should return `tsconfigDeclarationDir` dir if no other options are specified', () => {
      const esbuildOutDir = 'esbuildOutDir';
      const tsconfigDeclarationDir = 'tsconfigDeclarationDir';

      const result = getDeclarationDir({ esbuildOutDir, tsconfigDeclarationDir });
      expect(result).toBe(tsconfigDeclarationDir);
    });

    it('should return `tsconfigOutDir` dir if no other options are specified', () => {
      const esbuildOutDir = 'esbuildOutDir';
      const tsconfigOutDir = 'tsconfigOutDir';

      const result = getDeclarationDir({ esbuildOutDir, tsconfigOutDir });
      expect(result).toBe(tsconfigOutDir);
    });

    it('should return `pluginOutputPath` dir if several options are specified', () => {
      const esbuildOutDir = 'esbuildOutDir';
      const pluginOutputPath = 'pluginOutputPath';
      const tsconfigDeclarationDir = 'tsconfigDeclarationDir';
      const tsconfigOutDir = 'tsconfigOutDir';

      const result = getDeclarationDir({
        esbuildOutDir,
        pluginOutputPath,
        tsconfigDeclarationDir,
        tsconfigOutDir,
      });
      expect(result).toBe(pluginOutputPath);
    });

    it('should return `tsconfigDeclarationDir` dir if several options are specified', () => {
      const esbuildOutDir = 'esbuildOutDir';
      const tsconfigDeclarationDir = 'tsconfigDeclarationDir';
      const tsconfigOutDir = 'tsconfigOutDir';

      const result = getDeclarationDir({
        esbuildOutDir,
        tsconfigDeclarationDir,
        tsconfigOutDir,
      });
      expect(result).toBe(tsconfigDeclarationDir);
    });
  });
});
