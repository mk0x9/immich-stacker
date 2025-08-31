export function getBasename(filename: string): string {
  return filename.split('.')[0]!;
}

export function getNameExtension(filename: string): string {
  const filenameSplit = filename.split('.');
  filenameSplit.shift();

  return filenameSplit.join('.');
}
