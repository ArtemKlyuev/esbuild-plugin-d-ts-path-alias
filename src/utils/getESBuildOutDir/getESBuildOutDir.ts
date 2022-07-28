import path from 'path';

interface Args {
  outfile?: string;
  outdir?: string;
}

export const getESBuildOutDir = ({ outdir, outfile }: Args): string => {
  if (outdir) {
    return outdir;
  }

  const splittedPath = outfile!.split(path.sep);
  splittedPath.pop();

  if (!splittedPath.length) {
    return process.cwd();
  }

  return splittedPath.join(path.sep);
};
