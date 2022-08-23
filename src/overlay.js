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
    "font-family: sans-serif",
    "background-color: white !important;",
  ];

  const closeStyles = [
    "position: absolute",
    "right: 0",
    "top: 0",
    "border: none",
    "width: 40px;",
    "height:40px",
    "font-size:40px",
    "line-height:40px",
    "font-weight:bold",
    "color:red;",
  ];

  const h1Styles = [
    "color: red",
    "font-size: 30px",
    "font-family:arial",
    "margin:0",
    "padding:0",
    "grid-column-end: 3",
    "grid-column-start: 1",
  ];

  const h2Styles = ["color: red", "font-family: arial", "font-size: 16px"];

  // container
  const overlay = document.createElement("div");
  overlay.id = "dm-overlay";
  overlay.style = overlayStyles.join(" !important;");

  // close
  const close = document.createElement("button");
  close.innerText = "X";
  close.style = closeStyles.join(" !important;");

  close.onclick = () => DeMarkierung.disableOverlay();
  overlay.appendChild(close);

  // modal
  const modal = document.createElement("div");
  modal.id = "dm-modal;";
  modal.style = modalStyles.join(" !important;");
  overlay.appendChild(modal);

  // headline
  const headline = document.createElement("h1");
  headline.style = h1Styles.join(" !important;");
  headline.innerText = "( d e ) m a r k i e r u n g";
  modal.appendChild(headline);

  // left column
  const left = document.createElement("div");
  left.style = "border-right: 1px solid red;";
  modal.appendChild(left);

  // left headline
  const leftHeadline = document.createElement("h2");
  leftHeadline.innerText = "Deine ersetzten Worte";
  leftHeadline.style = h2Styles.join(" !important;");
  left.appendChild(leftHeadline);

  const userReplacements = document.createElement("ul");
  userReplacements.innerHTML =
    "<li>test -> lorem</li><li>bla -> blub</li><li>babel -> biby</li>";
  userReplacements.style = "color: red;list-style: none;padding: 0";
  left.appendChild(userReplacements);

  // right column
  const right = document.createElement("div");
  modal.appendChild(right);

  const rightHeadline = document.createElement("h2");
  rightHeadline.innerText = "Was würdest du statt 'xyz' sagen?";
  rightHeadline.style = h2Styles.join(" !important;");
  right.appendChild(rightHeadline);

  const userInputWrapper = document.createElement("div");
  userInputWrapper.style = "display:flex;width:100%";
  right.appendChild(userInputWrapper);

  const textfield = document.createElement("input");
  textfield.type = "text";
  textfield.placeholder = "Neues Wort";
  textfield.style = "height:30px;border:1px solid red;flex-grow:1;";
  userInputWrapper.appendChild(textfield);

  const submit = document.createElement("button");
  submit.type = "submit";
  submit.innerText = "Ersetzen";
  submit.style =
    "color:white;background-color:red;padding:0 10px;border:none;height:30px";
  userInputWrapper.appendChild(submit);

  const suggestionHeadline = document.createElement("h3");
  suggestionHeadline.innerText = "Vorschläge";
  suggestionHeadline.style = "color:red;font-size:12px;";
  right.appendChild(suggestionHeadline);

  const suggestions = document.createElement("ul");
  suggestions.innerHTML = "<li>lorem</li><li>blub</li><li>babel</li>";
  suggestions.style = "color: red;list-style: none;padding: 0";
  right.appendChild(suggestions);

  return overlay;
};

gOverlay = createOverlay();
