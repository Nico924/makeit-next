export const animationClassList = (name, styles): {} => ({
  appear: styles(`${name}-appear`),
  appearActive: styles(`${name}-appear-active`),
  enter: styles(`${name}-enter`),
  enterActive: styles(`${name}-enter-active`),
  enterDone: styles(`${name}-enter-done`),
  exit: styles(`${name}-exit`),
  exitActive: styles(`${name}-exit-active`),
  exitDone: styles(`${name}-exit-done`),
});

export const getQueryVariable = (query, variable): string => {
  if (!query) return '';
  query = query.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return '';
};

/**
 * Download a file from an api
 */
export function downloadFile(data, filename, mime): void {
  const blob = new Blob([data], { type: mime || 'application/octet-stream' });
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE workaround for "HTML7007: One or more blob URLs were
    // revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing
    // the URL has been freed."
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const blobURL = window.URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', filename);

    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
  }
}
