const createOverlay = () => {
  const overlayStyles = [
    "position: absolute",
    "top: 0",
    "left: 0",
    "width: 100vw",
    "height: 100vh",
    "z-index: 100",
    "background-color: rgba(0, 0, 0, 0.8)",
    "display: none !important;",
  ];

  const modalStyles = [
    "display: grid",
    "grid-template-columns: repeat(2, 1fr)",
    "grid-template-rows: 30px auto",
    "grid-gap: 40px",
    "background-color: #999999",
    "width: 700px",
    "height: 300px",
    "border: 10px solid red",
    "box-sizing: content-box",
    "margin: auto",
    "padding: 10px",
    "background-color: white !important;",
  ];

  // container
  const overlay = document.createElement("div");
  overlay.id = "dm-overlay";
  overlay.style = overlayStyles.join(";");

  // close
  const close = document.createElement("button");
  close.innerText = "X";
  close.style =
    "position: absolute;right: 0;top: 0;border: none;width: 40px; height:40px;font-size:40px;line-height:40px;font-weight:bold;color:red;";
  close.onclick = () => DeMarkierung.disableOverlay();
  overlay.appendChild(close);

  // modal
  const modal = document.createElement("div");
  modal.id = "dm-modal;";
  modal.style = modalStyles.join(" !important;");
  overlay.appendChild(modal);

  // headline
  const headline = document.createElement("h1");
  headline.style =
    "color: red;font-size: 30px;font-family:arial;margin:0;padding:0;grid-column-end: 3;grid-column-start: 1;";
  headline.innerText = "( d e ) m a r k i e r u n g";
  modal.appendChild(headline);

  const left = document.createElement("div");
  left.style = "outline: 1px solid salmon;";
  modal.appendChild(left);

  const leftHeadline = document.createElement("h2");
  leftHeadline.innerText = "Deine ersetzten Worte";
  leftHeadline.style = "color: red;font-family: arial;font-size: 15px";
  left.appendChild(leftHeadline);

  const userReplacements = document.createElement("ul");
  userReplacements.innerHTML =
    "<li>test -> lorem</li><li>bla -> blub</li><li>babel -> biby</li>";
  userReplacements.style = "color: red;list-style: none;padding: 0";
  left.appendChild(userReplacements);

  const right = document.createElement("div");
  right.style = "outline: 1px solid salmon;";
  modal.appendChild(right);

  const rightHeadline = document.createElement("h2");
  rightHeadline.innerText = "Was würdest du statt 'xyz' sagen?";
  rightHeadline.style = "color: red;font-family: arial;font-size: 15px";
  right.appendChild(rightHeadline);

  return overlay;
};

gOverlay = createOverlay();
