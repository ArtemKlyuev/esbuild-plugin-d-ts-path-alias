import path from 'path';

interface Lel {
  outfile?: string;
  outdir?: string;
}

export const getESBuildOutDir = ({ outdir, outfile }: Lel): string => {
  if (outdir) {
    return outdir;
  }

  const res = outfile!.split(path.sep);
  res.pop();

  if (!res.length) {
    return process.cwd();
  }

  return res.join(path.sep);
};
