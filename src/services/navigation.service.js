export const navigate = (elementRef, uri) => {
  elementRef.dispatchEvent(
    new CustomEvent('router-navigate', {
      detail: uri,
      bubbles: true,
      composed: true,
    })
  );
};
