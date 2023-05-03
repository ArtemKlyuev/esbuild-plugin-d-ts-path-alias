import { getDtsEntryPoints } from '../getDtsEntryPoints';

describe('utils', () => {
  describe('getDtsEntryPoints', () => {
    it('should throw error if no entrypoints provided', () => {
      expect(() => getDtsEntryPoints(undefined)).toThrowError();
    });

    it('should return array of string entrypoints if object provided', () => {
      const entryPoints = getDtsEntryPoints({ index: 'src/index.ts', utils: 'src/utils.ts' });

      expect(entryPoints).toStrictEqual(['src/index.ts', 'src/utils.ts']);
    });

    it('should return array of string entrypoints without changes', () => {
      const entryPoints = ['src/index.ts', 'src/utils.ts'];
      const dtsEntryPoints = getDtsEntryPoints(entryPoints);

      expect(dtsEntryPoints).toStrictEqual(entryPoints);
    });

    it('should return array of string entrypoints if array of { in: string; out: string } objects provided', () => {
      const entryPoints = [
        { out: 'out1', in: 'src/index.ts' },
        { out: 'out2', in: 'src/utils.ts' },
      ];
      const dtsEntryPoints = getDtsEntryPoints(entryPoints);

      expect(dtsEntryPoints).toStrictEqual(['src/index.ts', 'src/utils.ts']);
    });
  });
});
