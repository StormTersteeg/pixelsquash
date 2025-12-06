export function totalSizeOf(files: File[]): number {
  return files.reduce((result, image) => {
    result += image.size;
    return result;
  }, 0);
}
