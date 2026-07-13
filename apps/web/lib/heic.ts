const HEIC_TYPES = ["image/heic", "image/heif"];
const HEIC_EXT = /\.(heic|heif)$/i;

export function isHeicFile(file: File): boolean {
  return HEIC_TYPES.includes(file.type.toLowerCase()) || HEIC_EXT.test(file.name);
}

export async function toDisplayableImage(file: File): Promise<File> {
  if (!isHeicFile(file)) return file;

  const heic2any = (await import("heic2any")).default;
  const result = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 });
  const blob = Array.isArray(result) ? result[0] : result;
  const name = file.name.replace(HEIC_EXT, "") + ".jpg";
  return new File([blob], name, { type: "image/jpeg" });
}
