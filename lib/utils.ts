export function getAssetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/test' : '';
  return `${basePath}${path}`;
}
