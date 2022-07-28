interface Args {
  esbuildOutDir: string;
  pluginOutputPath?: string;
  tsconfigDeclarationDir?: string;
  tsconfigOutDir?: string;
}

export const getDeclarationDir = (args: Args): string => {
  const {
    pluginOutputPath, tsconfigDeclarationDir, tsconfigOutDir, esbuildOutDir,
  } = args;

  return pluginOutputPath ?? tsconfigDeclarationDir ?? tsconfigOutDir ?? esbuildOutDir;
};
