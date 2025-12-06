import saveAs from "file-saver";
import JSZip from "jszip";

export function totalSizeOf(files: File[]): number {
  return files.reduce((result, image) => {
    result += image.size;
    return result;
  }, 0);
}

export async function downloadAsZip(files: File[], name: string) {
  const zip = new JSZip();

  for (const file of files) {
    const buffer = await file.arrayBuffer();
    zip.file(file.name, buffer);
  }

  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, name);
}
