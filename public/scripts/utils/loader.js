const randHashString = (len) => {
  return "x".repeat(len).replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

function getLoaderElement(loaderId, dim, maxSize = Infinity) {
  const loader = document.createElement("div");
  loader.style = `
        width: ${dim.width}px;
        height: ${dim.height}px;
        top: ${dim.top}px;
        bottom: ${dim.bottom}px;
        left: ${dim.left}px;
        right: ${dim.right}px;
        position: fixed;
        z-index: 9999999999;
        display: grid;
        place-items: center;
    `;

  let size = Math.min(dim.width, dim.height, maxSize);
  const bSize = Math.max(2, size / 8);
  size = size - bSize * 2;

  const spin = document.createElement("div");
  spin.style = `
        border: ${bSize}px solid #d498e6;
        border-top: ${bSize}px solid #730e9a;
        border-radius: 50%;
        width: ${size}px;
        height: ${size}px;
        animation: loader_spin 1s linear infinite;
    `;

  loader.appendChild(spin);
  loader.id = loaderId;

  return loader;
}

function startLoading(elem, maxSize) {
  if (typeof elem === "string") elem = document.querySelector(elem);
  if (!elem) return;

  const id = elem.getAttribute("loader-id");
  if (id) return;

  const dim = elem.getBoundingClientRect();
  const loaderId = randHashString(8);

  document.body.appendChild(getLoaderElement(loaderId, dim, maxSize));
  elem.setAttribute("loader-id", loaderId);
  elem.style.visibility = "hidden";

  return loaderId;
}

function stopLoading(elem, isLoaderId = false) {
  let id;
  if (isLoaderId) {
    id = elem;
    elem = document.querySelector(`[loader-id="${elem}"]`);
  } else if (typeof elem === "string") elem = document.querySelector(elem);

  id = id || elem?.getAttribute("loader-id");
  if (!id) return;

  document.getElementById(id)?.remove();
  if (elem) {
    elem.removeAttribute("loader-id");
    elem.style.visibility = "visible";
  }
}

window.start_loading = startLoading;
window.stop_loading = stopLoading;
