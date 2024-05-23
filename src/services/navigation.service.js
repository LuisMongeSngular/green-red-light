/**
 *
 * @param {*} elementRef : Element that is emiting the navigate event
 * @param {*} uri : Internal path where you want to navigate
 *
 * Navigates to a provided path
 */
export const navigate = (elementRef, uri) => {
  elementRef.dispatchEvent(
    new CustomEvent('router-navigate', {
      detail: uri,
      bubbles: true,
      composed: true,
    })
  );
};
