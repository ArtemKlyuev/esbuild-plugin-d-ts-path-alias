interface Kek {
  esbuildOutDir: string;
  pluginOutputPath?: string;
  tsconfigDeclarationDir?: string;
  tsconfigOutDir?: string;
}

export const getDeclarationDir = (args: Kek): string => {
  const { pluginOutputPath, tsconfigDeclarationDir, tsconfigOutDir, esbuildOutDir } = args;

  return pluginOutputPath ?? tsconfigDeclarationDir ?? tsconfigOutDir ?? esbuildOutDir;
};
