const DeMarkierung = {
  highlights: ["amet", "odit"],
  replacements: [],
  settings: {
    colors: { black: "#111111", primary: "#993333" },
    debug: true,
    disableHighlights: false,
    disableMarks: false,
    disableReplace: false,
    tags: ["p", "span", "h1", "h2", "h3", "h4", "h5", "em", "a"],
    target: document.getElementsByTagName("article")[0],
    overlay: undefined,
    newReplacement: "",
  },

  init: () => {
    if (!DeMarkierung.settings.target) {
      console.error("no article found");
    }
    debug("init");
    chrome.runtime.onMessage.addListener((message) => {
      DeMarkierung.dispatchMessage(message);
    });

    // replacing should be first
    if (!DeMarkierung.settings.disableReplace) {
      DeMarkierung.enableReplace();
    }
    if (!DeMarkierung.settings.disableMarks) {
      DeMarkierung.enableMarks();
    }
    if (!DeMarkierung.settings.disableHighlights) {
      DeMarkierung.enableHighlights();
    }

    DeMarkierung.injectOverlay();
    if (debug) {
      // DeMarkierung.enableOverlay();
    }
  },
  injectOverlay: () => {
    document.body.appendChild(gOverlay);
    DeMarkierung.overlay = document.getElementById("dm-overlay");
  },
  enableOverlay: () => {
    DeMarkierung.overlay.style.display = "block";
  },

  disableOverlay: () => {
    DeMarkierung.overlay.style.display = "none";
  },
  enableMarks: () => {
    // console.log("updating known keywords");
    // DeMarkierung.settings.tags.forEach((tag) => {
    //   const targetElements = DeMarkierung.target.querySelectorAll(tag);
    //   targetElements.forEach((element) => {
    //     element.innerHTML = highlightWordsInText(
    //       element.innerHTML,
    //       gKeywords
    //     );
    //   });
    // });

    debug("enable marks");

    const children = DeMarkierung.settings.target.getElementsByTagName("*");
    if (!children) {
      debug("body has no children");
      return;
    }

    for (let i = 0; i < children.length; i++) {
      for (let j = 0; j < DeMarkierung.highlights.length; j++) {
        if (nodeInnerTextContains(children[i], DeMarkierung.highlights[j])) {
          debug(DeMarkierung.highlights[j]);
          // if (children[i].childElementCount === 0) {
          //   highlightNodeText(
          //     children[i],
          //     DeMarkierung.highlights[j],
          //     "#990000"
          //   );
          // } else {
          //   debugger;
          //   console.warn("not settng innerHTML when item has children");
          // }
        }
      }
    }
  },
  // disableMarks: () => {},
  enableHighlights: () => {},
  // disableHighlight: () => {},
  enableReplace: () => {
    const children = DeMarkierung.settings.target.getElementsByTagName("*");
    if (!children) {
      debug("body has no children");
      return;
    }

    for (let i = 0; i < children.length; i++) {
      for (let j = 0; j < DeMarkierung.replacements.length; j++) {
        if (
          nodeInnerTextContains(children[i], DeMarkierung.replacements[j][0])
        ) {
          replaceNodeInnerText(
            children[i],
            DeMarkierung.replacements[j][0],
            DeMarkierung.replacements[j][1]
          );
        }
      }
    }
  },
  disableReplace: () => {},
  saveLists: () => {},
  loadLists: () => {},
  syncLists: () => {},
  dispatchMessage: (message) => {
    if (message.type === "USER_ADD_WORD") {
      // currentKeyword = message.payload;
      // createMenu(message.payload);
      DeMarkierung.newReplacement = message.payload;
      DeMarkierung.enableOverlay();
    }
  },
};

// helpers

const debug = (message) => {
  DeMarkierung.settings.debug && console.log(message);
};

const nodeInnerTextContains = (node, find) => {
  if (!node || typeof node !== "object") {
    debug("invalid tag element");
    return false;
  }

  var re = new RegExp(find, "g");
  if (node.innerText.match(re)) {
    return true;
  }
  return false;
};

const replaceNodeInnerText = (node, search, replace) => {
  if (!node || !search || !replace) {
    debug("invalid args for replace");
    return false;
  }

  node.innerText = node.innerText.replace(search, replace);
  return true;
};

const highlightNodeText = (node, search, color) => {
  const style = `border-bottom: 2px dotted ${color}`;
  node.innerHTML = node.innerHTML.replace(
    search,
    `<em style=${style}>${search}</em>`
  );
};

// const highlightWordsInText = (inputText, replacementWords) => {
//   console.log("highlighting words in text");
//   replacementWords.forEach((keyword) => {
//     if (arrBlacklistedHighLightElements.indexOf(keyword.key) === -1) {
//       inputText = inputText.replace(
//         " " + keyword.key + " ",
//         '<em style="border-bottom: 2px dotted red">' +
//           " " +
//           keyword.key +
//           " " +
//           "</em>"
//       );
//       inputText = inputText.replace(
//         " " + keyword.key.charAt(0).toUpperCase() + keyword.key.slice(1) + " ",
//         '<em style="border-bottom: 2px dotted red">' +
//           " " +
//           keyword.key +
//           " " +
//           "</em>"
//       );
//     }
//   });
//   return inputText;
// };

DeMarkierung.init();
