import { getESBuildOutDir } from '../getESBuildOutDir';

describe('utils', () => {
  describe('getESBuildOutDir', () => {
    it('should return `outdir`', () => {
      const outdir = 'outdir';

      const result = getESBuildOutDir({ outdir });

      expect(result).toBe(outdir);
    });

    it('should return `outfile` base dir', () => {
      const outfile = 'foo/bar/baz.ts';

      const result = getESBuildOutDir({ outfile });

      expect(result).toBe('foo/bar');
    });

    it('should return `process.cwd` if `outfile` has no base dir', () => {
      const spy = jest.spyOn(process, 'cwd');
      spy.mockReturnValue('process.cwd');

      const outfile = 'foo.ts';

      const result = getESBuildOutDir({ outfile });

      expect(result).toBe('process.cwd');
    });
  });
});
