import path from 'node:path';

interface Args {
  outfile?: string;
  outdir?: string;
}

export const getESBuildOutDir = ({ outdir, outfile }: Args = {}): string => {
  if (!outdir && !outfile) {
    return process.cwd();
  }

  if (outdir) {
    return outdir;
  }

  if (!outfile) {
    return process.cwd();
  }

  const splittedPath = outfile.split(path.sep);
  splittedPath.pop();

  if (!splittedPath.length) {
    return process.cwd();
  }

  return splittedPath.join(path.sep);
};
