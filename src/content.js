const getAlternatives = (currentKeyword) => {
  let ret = [];
  arrKeywords.forEach((wordEntry) => {
    if (currentKeyword === wordEntry.key) {
      ret = wordEntry.alternatives;
    }
  });
  return ret;
};

const createMenu = (currentKeyword) => {
  const altWords = getAlternatives(currentKeyword);
  let altWordsHTML = "";

  if (altWords.length > 0) {
    for (let i = 0; i < altWords.length; i++) {
      altWordsHTML += `<li><a style='color: #ff0429; font-size: 15px' id="dem-alternative-${altWords[i].word}">${altWords[i].word}</a></li>`;
    }
  } else {
    altWordsHTML = "keine Vorschläge vorhanden";
  }

  let arrUserKeywordsHTML = "";

  for (let i = 0; i < arrUserKeywords.length; i++) {
    arrUserKeywordsHTML += `<li>${arrUserKeywords[i][0]} -> ${arrUserKeywords[i][1]}</li>`;
  }

  // const container = document.createElement("div");
  // container.className = "container";
  // container.style = "display: flex; font-family: arial;width: fit-content";

  // const usedWords = document.createElement("div");
  // usedWords.className = "usedWords";
  // usedWords.style = "min-width: 300px";

  // const headline = document.createElement("h2");
  // headline.style = "margin-bottom: 20px; font-size: 20px;";
  // headline.innerText = "Deine ersetzten Worte";

  // const div = document.createElement("div");
  // const ul = document.createElement("ul");

  let html = `
  <div class="container" style="display: flex; font-family: arial;width: fit-content">
    <div style="min-width: 300px">
      <h2 style='margin-bottom: 20px; font-size: 20px;'>Deine ersetzten Worte</h2>
      <div>
        <ul>
          ${arrUserKeywordsHTML}
        </ul>
      </div>
    </div>
    <div class="addWords" style="min-width: 300px">
      <h2 style='margin-bottom: 20px; font-size: 20px;'> \
        Was würdest du statt '${currentKeyword}' sagen? \
      </h2> \
      <div> \
        <input class="input" id="demWordInput" style='border: 1px solid black' type="input"/> \
        <input class="input" type="submit" value="Ersetzen"/> \
       </div>
      <div>
      <span style="font-size: 15px;">Vielleicht eines dieser Worte?</span>
        <ul style='margin-top: 10px'>
          ${altWordsHTML}
        </ul>
      </span>
    </div>
    <a href='mailto:demarkierung@gmail.de?subject=de-markierung&body=${arrUserKeywordsHTML}' id="dem-send" style='position: relative; display: block; margin-top: 20px; top: 0; left: 0;'>Sende uns deine Liste</a>
    `;
  const menu = document.createElement("div");
  menu.id = "de-markierung-menu";
  menu.style =
    "background-color: rgba(0, 0, 0, 0.8); position: fixed; top: 0px; left: 0px; width: 100vw; height: 100vh; color: #ff0429; z-index: 1000;";

  let menuForm = document.createElement("form");
  menuForm.id = "menuForm";
  menuForm.style =
    "color: #ff0429 !important;width: fit-content; height: auto;margin: auto;margin-top: 20%; padding: 20px;border: 6px solid #ff0429; background-color: white";

  menuForm.innerHTML = html;
  menuForm.addEventListener("submit", handleSubmit);

  menu.appendChild(menuForm);
  document.body.insertBefore(menu, document.body.firstChild);

  altWords.forEach((wordObj) => {
    document
      .getElementById("dem-alternative-" + wordObj.word)
      .addEventListener("click", handleAltClick);
  });
};

const handleAltClick = (e) => {
  console.log("alt click", e.target.innerHTML);
  document.getElementById("demWordInput").value = e.target.innerHTML;
};

const handleSubmit = (e) => {
  e.preventDefault();
  let currentFilter = [currentKeyword, e.target.demWordInput.value];
  DeMarkierung.disableOverlay();
  console.log("submit:", currentFilter);

  DeMarkierung.replacements.push(currentFilter);
  DeMarkierung.enableReplace();
  currentFilter = [];
  // replaceUserKeywords();
};

// just a list of replacements the user has made
let arrUserKeywords = [
  ["Rerum", "Bleung"],
  ["Koalition", "Blaiotion"],
];
let currentKeyword = "";

const DeMarkierung = {
  highlights: [],
  replacements: [],
  settings: {
    debug: true,
    disableHighlights: false,
    disableMarks: false,
    disableReplace: false,
    tags: ["p", "span", "h1", "h2", "h3", "h4", "h5", "em", "a"],
    target: document.getElementsByTagName("article")[0],
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
  },
  enableOverlay: () => {
    return undefined;
  },

  disableOverlay: () => {
    document.body.removeChild(document.getElementById("de-markierung-menu"));
  },
  enableMarks: () => {
    // console.log("updating known keywords");
    // DeMarkierung.settings.tags.forEach((tag) => {
    //   const targetElements = article.querySelectorAll(tag);
    //   targetElements.forEach((element) => {
    //     element.innerHTML = highlightWordsInText(
    //       element.innerHTML,
    //       arrKeywords
    //     );
    //   });
    // });
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
      currentKeyword = message.payload;
      createMenu(message.payload);
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

// init();
DeMarkierung.init();
