export const applyFormatedText = (
  text: string,
  source: string,
  base: string,
  marker: string,
  callback: (value: string) => void
) => {
  if (text.length > 0) {
    let sourceCopy = String(source);

    if (sourceCopy.length === 0) {
      sourceCopy = base;
    }

    text.split('').forEach((char) => {
      const code = char.charCodeAt(0);

      if (code >= 48 && code <= 57) {
        sourceCopy = sourceCopy.replace(marker, char);
      }
    });

    callback(sourceCopy);
  }
};
