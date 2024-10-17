import streamSaver from "streamsaver";

export interface DownloadResult {
  filename: string;
  type: string,
  size: number;
}

export const download = (blob: Blob, filename: string): Promise<DownloadResult> => {
  const stream = streamSaver.createWriteStream(filename, {
    size: blob.size,
  });

  const body = new Response(blob).body;
  if (!body) {
    return Promise.reject(new Error('Failed to download. body is null'));
  }

  return body.pipeTo(stream).then(() => {
    return {filename, size: blob.size, type: blob.type};
  });
}