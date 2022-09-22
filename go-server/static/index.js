var ua = window.navigator.userAgent;
var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
var webkit = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

const typeContent = () => {
  new TypeIt("#textarea-input", {
    speed: 1,
    waitUntilVisible: false,
  })
    .type("\nfrom gradyserver.com import *\n")
    .exec(async () => {
      window.triggerHighlight();
    })
    .type("# Welcome! Come look around\n")
    .exec(async () => window.triggerHighlight())
    .type("def GetToKnowBen(you):\n")
    .exec(async () => window.triggerHighlight())
    .type('    if you.jobTitle == "recruiter":\n')
    .exec(async () => window.triggerHighlight())
    .type('        checkOutSection("Employment History")\n')
    .exec(async () => window.triggerHighlight())
    .type('    elif you.jobTitle == "💻 Developer":\n')
    .exec(async () => window.triggerHighlight())
    .type('        if you.lookingFor == "Hot Takes":\n')
    .exec(async () => window.triggerHighlight())
    .type('            checkOutSection("Software Principles")\n')
    .exec(async () => window.triggerHighlight())
    .type("        else :\n")
    .exec(async () => window.triggerHighlight())
    .type('            goTo("https://github.com/benjgrad")\n')
    .exec(async () => window.triggerHighlight())
    .type('    elif you.lookingFor == "👯‍♀️ a friend" :\n')
    .exec(async () => window.triggerHighlight())
    .type('        checkOutSection("Contact Me")\n')
    .exec(async () => window.triggerHighlight())
    .type('    elif you.status == "Browsing": \n')
    .exec(async () => window.triggerHighlight())
    .type("        scrollDown()\n")
    .exec(async () => window.triggerHighlight())
    .type("    else :\n")
    .exec(async () => window.triggerHighlight())
    .type("        # I always have some project on the go!\n")
    .exec(async () => window.triggerHighlight())
    .type('        checkOutSection("🚧 Projects")\n')
    .exec(async () => window.triggerHighlight())
    .go();
  new TypeIt("#highlight-area", {
    speed: 1,
    waitUntilVisible: false,
  })
    .type("\nfrom gradyserver.com import *\n")
    .exec(async () => window.triggerHighlight())
    .type("# Welcome! Come look around\n")
    .exec(async () => window.triggerHighlight())
    .type("def GetToKnowBen(you):\n")
    .exec(async () => window.triggerHighlight())
    .type('    if you.jobTitle == "recruiter":\n')
    .exec(async () => window.triggerHighlight())
    .type('        checkOutSection("Employment History")\n')
    .exec(async () => window.triggerHighlight())
    .type('    elif you.jobTitle == "💻 Developer":\n')
    .exec(async () => window.triggerHighlight())
    .type('        if you.lookingFor == "Hot Takes":\n')
    .exec(async () => window.triggerHighlight())
    .type('            checkOutSection("Software Principles")\n')
    .exec(async () => window.triggerHighlight())
    .type("        else :\n")
    .exec(async () => window.triggerHighlight())
    .type('            goTo("https://github.com/benjgrad")\n')
    .exec(async () => window.triggerHighlight())
    .type('    elif you.lookingFor == "👯‍♀️ a friend" :\n')
    .exec(async () => window.triggerHighlight())
    .type('        checkOutSection("Contact Me")\n')
    .exec(async () => window.triggerHighlight())
    .type('    elif you.status == "Browsing": \n')
    .exec(async () => window.triggerHighlight())
    .type("        scrollDown()\n")
    .exec(async () => window.triggerHighlight())
    .type("    else :\n")
    .exec(async () => window.triggerHighlight())
    .type("        # I always have some project on the go!\n")
    .exec(async () => window.triggerHighlight())
    .type('        checkOutSection("🚧 Projects")\n')
    .exec(async () => window.triggerHighlight())
    .go();
};

let firstPage = document.getElementById("first_page");
if (iOS || webkit || iOSSafari) {
  firstPage.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml"
        id="myDiv" class="minimize editorwindowmac">
        <div id="top-bar" style="transform:rotate(0deg);width:100%">
            <span class="top-bar-btn"></span>
            <span class="top-bar-btn"></span>
            <span class="top-bar-btn"></span>
        </div>
        <div id="content-box" style="transform:rotate(0deg);height:100%;width:100%">>
            <textarea wrap="soft" id="textarea-input" style="color:blue;margin:0px;margin-top:-16px;height:100%;width:100%" spellcheck="false" 
                data-typeit-id="7782467"></textarea>
            <pre id="highlight-area"  style="height:100%;width:100%" data-typeit-id="3394302">
    </div>`;

  setTimeout(function () {
    let editorWindow = document.querySelector("#myDiv");
    editorWindow.className += " maximize ";
    typeContent();
  }, 10);
} else {
  firstPage.innerHTML = `<div id="ilooo6" title="main">
  <div id="isafas">
    <svg id="monitor-svg" viewBox="0 0 485 568" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" stroke-miterlimit="10" version="1.1"
      xml:space="preserve" clip-rule="evenodd" data-gjs-type="svg">
      <g width="100%" height="100%" data-gjs-tagName="g" data-gjs-type="svg-in"
        data-gjs-tagname="g">
        <defs data-gjs-tagName="defs" data-gjs-type="svg-in" data-gjs-tagname="defs">
          <path
            d="m465.973,547.128l-259.552,33.118l-55.857,-62.332l232.059,-17.938l83.35,47.152z"
            id="Fill" data-gjs-tagName="path" data-gjs-type="svg-in"
            data-gjs-tagname="path">
          </path>
          <path
            d="m590.837,88.114l-540.5955,-53.8926l-1.7652,406.0456l534.1997,-38.006l8.161,-314.147z"
            id="Fill_2" data-gjs-tagName="path" data-gjs-type="svg-in"
            data-gjs-tagname="path">
          </path>
          <linearGradient id="LinearGradient" x1="1.00008" x2="0.00006" y1="0.5" y2="0.5"
            data-gjs-tagName="linearGradient" data-gjs-type="svg-in"
            data-gjs-tagname="linearGradient">
            <stop offset="0" stop-color="#565353" data-gjs-tagName="stop"
              data-gjs-type="svg-in" data-gjs-tagname="stop">
            </stop>
            <stop offset="1" stop-color="#000000" data-gjs-tagName="stop"
              data-gjs-type="svg-in" data-gjs-tagname="stop">
            </stop>
          </linearGradient>
          <radialGradient cx="779.102" cy="155.597"
            gradientTransform="matrix(-1.1125999689102173,0,0,0.9825630187988281,1216.3299560546875,-158.7779998779297)"
            gradientUnits="userSpaceOnUse" id="RadialGradient" r="341.705"
            data-gjs-tagName="radialGradient" data-gjs-type="svg-in"
            data-gjs-tagname="radialGradient">
            <stop offset="0" stop-color="#747474" data-gjs-tagName="stop"
              data-gjs-type="svg-in" data-gjs-tagname="stop">
            </stop>
            <stop offset="1" stop-color="#161616" data-gjs-tagName="stop"
              data-gjs-type="svg-in" data-gjs-tagname="stop">
            </stop>
          </radialGradient>
        </defs>
        <g id="svg_20" data-gjs-tagName="g" data-gjs-type="svg-in" data-gjs-tagname="g">
          <g id="svg_18" data-gjs-tagName="g" data-gjs-type="svg-in" data-gjs-tagname="g">

            <g id="Layer-1" data-gjs-tagName="g" data-gjs-type="svg-in"
              data-gjs-tagname="g">
              <g id="svg_1" data-gjs-tagName="g" data-gjs-type="svg-in"
                data-gjs-tagname="g">
                <g id="svg_2" data-gjs-tagName="g" data-gjs-type="svg-in"
                  data-gjs-tagname="g">
                  <use x="-13" y="-12" fill="#2a2a2a" fill-rule="nonzero"
                    xlink:href="#Fill" id="svg_3" data-gjs-tagName="use"
                    data-gjs-type="svg-in" data-gjs-tagname="use">
                  </use>
                  <mask height="80.2705" id="StrokeMask" maskUnits="userSpaceOnUse"
                    width="315.409" x="150.564" y="499.976" data-gjs-tagName="mask"
                    data-gjs-type="svg-in" data-gjs-tagname="mask">
                    <rect fill="#000000" height="80.2705" width="315.409"
                      x="150.564" y="499.976" id="svg_4" data-gjs-tagName="rect"
                      data-gjs-type="svg-in" data-gjs-tagname="rect">
                    </rect>
                    <use fill="#ffffff" fill-rule="evenodd" xlink:href="#Fill"
                      id="svg_5" data-gjs-tagName="use" data-gjs-type="svg-in"
                      data-gjs-tagname="use">
                    </use>
                  </mask>
                  <use x="-13" y="-12" fill="none" mask="url(#StrokeMask)"
                    stroke="#000000" stroke-linecap="square" stroke-linejoin="round"
                    stroke-width="2" xlink:href="#Fill" id="svg_6"
                    data-gjs-tagName="use" data-gjs-type="svg-in"
                    data-gjs-tagname="use">
                  </use>
                </g>
                <path
                  d="m263.555,378.163l-17.589,139.94c0,0 17.312,5.547 36.26,3.842c18.947,-1.706 39.53,-10.664 39.53,-10.664l0.098,-137.237"
                  fill="url(#LinearGradient)" fill-rule="nonzero" id="svg_7"
                  data-gjs-tagName="path" data-gjs-type="svg-in"
                  data-gjs-tagname="path">
                </path>
                <path
                  d="m23.6282,6.6852l-15.9042,2.419c-1.2646,0.1799 -1.1585,0.6197 -1.1254,1.747l-1.9039,427.7548c-0.0058,0.741 -0.0558,2.41 1.2681,2.666l14.22,2.111c0.809,0.005 1.4696,-0.591 1.4754,-1.331l3.4243,-434.0169c0.0058,-0.7405 -0.6453,-1.3449 -1.4543,-1.3499z"
                  fill="#303030" fill-rule="nonzero" id="svg_8"
                  data-gjs-tagName="path" data-gjs-type="svg-in"
                  data-gjs-tagname="path">
                </path>
                <path
                  d="m588.971,67.5409l-565.497,-60.4653l-2.6473,436.0434l561.3223,-40.824l6.822,-334.7541z"
                  fill="#000000" fill-rule="nonzero" id="svg_9"
                  data-gjs-tagName="path" data-gjs-type="svg-in"
                  data-gjs-tagname="path">
                </path>
                <g id="svg_10" data-gjs-tagName="g" data-gjs-type="svg-in"
                  data-gjs-tagname="g">
                  <use x="-13" y="-12" fill="url(#RadialGradient)" fill-rule="nonzero"
                    xlink:href="#Fill_2" id="svg_11" data-gjs-tagName="use"
                    data-gjs-type="svg-in" data-gjs-tagname="use">
                  </use>
                  <mask height="406.046" id="StrokeMask_2" maskUnits="userSpaceOnUse"
                    width="542.361" x="48.4763" y="34.2214" data-gjs-tagName="mask"
                    data-gjs-type="svg-in" data-gjs-tagname="mask">
                    <rect fill="#000000" height="406.046" width="542.361"
                      x="48.4763" y="34.2214" id="svg_12" data-gjs-tagName="rect"
                      data-gjs-type="svg-in" data-gjs-tagname="rect">
                    </rect>
                    <use fill="#ffffff" fill-rule="evenodd" xlink:href="#Fill_2"
                      id="svg_13" data-gjs-tagName="use" data-gjs-type="svg-in"
                      data-gjs-tagname="use">
                    </use>
                  </mask>
                  <use x="-13" y="-12" fill="none" mask="url(#StrokeMask_2)"
                    stroke="#000000" stroke-linecap="square" stroke-linejoin="round"
                    stroke-width="2" xlink:href="#Fill_2" id="svg_14"
                    data-gjs-tagName="use" data-gjs-type="svg-in"
                    data-gjs-tagname="use">
                  </use>
                </g>
              </g>
            </g>
          </g>
          <g id="svg_19" data-gjs-tagName="g" data-gjs-type="svg-in" data-gjs-tagname="g">

            <g id="svg_15" mask="url(#myMask)" data-gjs-tagName="g" data-gjs-type="svg-in"
              data-gjs-tagname="g">
              <defs data-gjs-tagName="defs" data-gjs-type="svg-in"
                data-gjs-tagname="defs">
                <filter id="displacement-filter" width="579" height="441" x="0" y="0"
                  filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"
                  data-gjs-tagName="filter" data-gjs-type="svg-in"
                  data-gjs-tagname="filter">
                  <feImage width="579" height="441" href="out.png"
                    data-gjs-tagName="feImage" data-gjs-type="svg-in"
                    data-gjs-tagname="feImage">
                  </feImage>
                  <feDisplacementMap id="fedisplacementmap" in="SourceGraphic"
                    xChannelSelector="A" yChannelSelector="B" scale="115"
                    data-gjs-tagName="feDisplacementMap" data-gjs-type="svg-in"
                    data-gjs-tagname="feDisplacementMap">
                  </feDisplacementMap>
                </filter>
              </defs>
              <mask height="440" width="579" id="myMask" data-gjs-tagName="mask"
                data-gjs-type="svg-in" data-gjs-tagname="mask">
                <path id="svg_16" fill="white"
                  d="m54.55382,42.2214l-1.03835,386.0456l529.70024,-58.006l4.80058,-304.147"
                  class="path" data-gjs-tagName="path" data-gjs-type="svg-in"
                  data-gjs-tagname="path">
                </path>
              </mask>
              <foreignObject id="svg_17"
                requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
                y="-15" x="53" height="440" width="609" data-gjs-tagName="foreignObject"
                data-gjs-type="svg-in" data-gjs-tagname="foreignObject">
                <div xmlns="http://www.w3.org/1999/xhtml" id="myDiv"
                  class="filter--mona minimize" data-gjs-tagName="div"
                  data-gjs-type="svg-in" data-gjs-tagname="div"><br
                    data-gjs-tagName="br" data-gjs-type="svg-in" data-gjs-void
                    data-gjs-tagname="br" /><br data-gjs-tagName="br"
                    data-gjs-type="svg-in" data-gjs-void data-gjs-tagname="br" /><br
                    data-gjs-tagName="br" data-gjs-type="svg-in" data-gjs-void
                    data-gjs-tagname="br" />
                  <div id="top-bar" data-gjs-tagName="div" data-gjs-type="svg-in"
                    data-gjs-tagname="div"><span class="top-bar-btn"
                      data-gjs-tagName="span" data-gjs-type="svg-in"
                      data-gjs-tagname="span"></span><span class="top-bar-btn"
                      data-gjs-tagName="span" data-gjs-type="svg-in"
                      data-gjs-tagname="span"></span><span class="top-bar-btn"
                      data-gjs-tagName="span" data-gjs-type="svg-in"
                      data-gjs-tagname="span"></span></div>
                  <div id="content-box" data-gjs-tagName="div" data-gjs-type="svg-in"
                    data-gjs-tagname="div"><textarea wrap="soft" spellcheck="false"
                      id="textarea-input" data-typeit-id="7782467"
                      data-gjs-type="textarea"></textarea>
                    <pre id="highlight-area" data-typeit-id="3394302"
                      data-gjs-tagName="pre" data-gjs-type="svg-in"
                      data-gjs-tagname="pre">
        </pre>
                  </div>
                </div>
              </foreignObject>
            </g>
          </g>
        </g>
      </g>
    </svg>

  </div>
</div>
`;

  const feImage = document.querySelector("feImage");
  let editorWindow = document.querySelector("#myDiv");

  fetch("out.png")
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      const objURL = URL.createObjectURL(blob);

      feImage.setAttribute("href", objURL);
      editorWindow.className += " maximize ";

      typeContent();
    });
}

Array.prototype.includes = function (value) {
  return this.indexOf(value) !== -1;
};
String.prototype.characterize = function (callback) {
  var characters = this.split("");
  var options = {};

  for (var i = 0; i < this.length; i++) {
    options = callback(characters[i]);
  }
};

var textarea;
var highlight;

var keywords = [
  "False",
  "None",
  "True",
  "and",
  "as",
  "assert",
  "break",
  "class",
  "continue",
  "def",
  "del",
  "elif",
  "else",
  "except",
  "finally",
  "for",
  "from",
  "global",
  "if",
  "import",
  "in",
  "is",
  "lambda",
  "nonlocal",
  "not",
  "or",
  "pass",
  "raise",
  "return",
  "try",
  "while",
  "with",
  "yield",
];
var functions = [
  "abs",
  "dict",
  "help",
  "min",
  "setattr",
  "all",
  "dir",
  "hex",
  "next",
  "slice",
  "any",
  "divmod",
  "id",
  "object",
  "sorted",
  "ascii",
  "enumerate",
  "input",
  "oct",
  "staticmethod",
  "bin",
  "eval",
  "int",
  "open",
  "str",
  "bool",
  "exec",
  "isinstance",
  "ord",
  "sum",
  "bytearray",
  "filter",
  "issubclass",
  "pow",
  "super",
  "bytes",
  "float",
  "iter",
  "print",
  "tuple",
  "callable",
  "format",
  "len",
  "property",
  "type",
  "chr",
  "frozenset",
  "list",
  "range",
  "vars",
  "classmethod",
  "getattr",
  "locals",
  "repr",
  "zip",
  "compile",
  "globals",
  "map",
  "reversed",
  "_import_",
  "complex",
  "hasattr",
  "max",
  "round",
  "delattr",
  "hash",
  "memoryview",
  "set",
];

textarea = document.getElementById("textarea-input");
highlight = document.getElementById("highlight-area");

var code = "";

var triggerHighlight = function () {
  textarea = document.getElementById("textarea-input");
  highlight = document.getElementById("highlight-area");
  var tokens = tokenize(textarea.value);
  highlight.innerHTML = "";
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    var span = document.createElement("span");
    span.className = "highlight-" + token.type;
    span.innerText = token.value;
    highlight.appendChild(span);
  }
  var lines = textarea.value.split("\n");
  if (lines[lines.length - 1] === "") {
    var br = document.createElement("br");
    highlight.appendChild(br);
  }
  highlight.scrollTop = textarea.scrollTop;
};

textarea.addEventListener("input", triggerHighlight);
textarea.addEventListener("scroll", function (event) {
  highlight.scrollTop = this.scrollTop;
});

var tabCode = 9;
var leftParenthesisCode = 40;
textarea.addEventListener("keydown", function (event) {
  switch (event.keyCode) {
    case tabCode:
      event.preventDefault();
      this.value += "    ";
      break;
  }
});

textarea.textContent = code;
highlight.textContent = code;
window.triggerHighlight = triggerHighlight;
triggerHighlight();

function tokenize(inputString) {
  var tokens = [];
  var lexedValue = "";
  var currentToken = null;

  function newSpaceToken() {
    currentToken = { type: "space", value: " " };
    lexedValue = "";
  }

  function parseLexedValueToToken() {
    if (lexedValue) {
      if (keywords.includes(lexedValue)) {
        tokens.push({ type: "keyword", value: lexedValue });
      } else if (functions.includes(lexedValue)) {
        tokens.push({ type: "function", value: lexedValue });
      } else if (lexedValue !== "") {
        if (isNaN(lexedValue)) {
          tokens.push({ type: "default", value: lexedValue });
        } else {
          tokens.push({ type: "number", value: lexedValue });
        }
      }
      lexedValue = "";
    }
  }

  function lex(char) {
    if (char !== " " && currentToken && currentToken.type === "space") {
      tokens.push(currentToken);
      lexedValue = "";
      currentToken = null;
    }

    switch (char) {
      case " ":
        if (keywords.includes(lexedValue)) {
          tokens.push({ type: "keyword", value: lexedValue });
          newSpaceToken();
        } else if (functions.includes(lexedValue)) {
          tokens.push({ type: "function", value: lexedValue });
          newSpaceToken();
        } else if (lexedValue !== "") {
          if (isNaN(lexedValue)) {
            tokens.push({ type: "default", value: lexedValue });
          } else {
            tokens.push({ type: "number", value: lexedValue });
          }
          newSpaceToken();
        } else if (currentToken) {
          currentToken.value += " ";
        } else {
          newSpaceToken();
        }
        break;

      case '"':
      case "'":
        if (currentToken) {
          if (currentToken.type === "string") {
            if (currentToken.value[0] === char) {
              currentToken.value += char;
              tokens.push(currentToken);
              currentToken = null;
            } else {
              currentToken.value += char;
            }
          } else if (currentToken.type === "comment") {
            currentToken.value += char;
          }
        } else {
          if (lexedValue) {
            tokens.push({ type: "default", value: lexedValue });
            lexedValue = "";
          }
          currentToken = { type: "string", value: char };
        }
        break;

      case "=":
      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
      case "&":
      case "|":
      case ">":
      case "<":
      case "!":
        if (currentToken) {
          currentToken.value += char;
        } else {
          parseLexedValueToToken();
          tokens.push({ type: "operator", value: char });
        }
        break;

      case "#":
        if (currentToken) {
          currentToken.value += char;
        } else {
          parseLexedValueToToken();
          currentToken = { type: "comment", value: char };
        }
        break;

      case ":":
        if (currentToken) {
          currentToken.value += char;
        } else {
          parseLexedValueToToken();
          tokens.push({ type: "colon", value: char });
        }
        break;

      case "(":
        if (currentToken) {
          currentToken.value += char;
        } else {
          parseLexedValueToToken();
          tokens.push({ type: "left-parentheses", value: char });
        }
        break;

      case ")":
        if (currentToken) {
          currentToken.value += char;
        } else {
          parseLexedValueToToken();
          tokens.push({ type: "right-parentheses", value: char });
        }
        break;

      case "[":
        if (currentToken) {
          currentToken.value += char;
        } else {
          parseLexedValueToToken();
          tokens.push({ type: "left-bracket", value: char });
        }
        break;

      case "]":
        if (currentToken) {
          currentToken.value += char;
        } else {
          parseLexedValueToToken();
          tokens.push({ type: "right-bracket", value: char });
        }
        break;

      case ",":
        if (currentToken) {
          currentToken.value += char;
        } else {
          parseLexedValueToToken();
          tokens.push({ type: "comma", value: char });
        }
        break;

      case "\n":
        if (currentToken) {
          switch (currentToken.type) {
            case "string":
            case "comment":
              tokens.push(currentToken);
              currentToken = null;
              break;
            default:
          }
        } else {
          parseLexedValueToToken();
          lexedValue = "";
        }
        tokens.push({ type: "newline", value: "\n" });
        break;

      case ";":
        if (currentToken) {
          currentToken.value += char;
        } else {
          parseLexedValueToToken();
          tokens.push({ type: "semicolon", value: char });
        }
        break;

      default:
        if (currentToken) {
          currentToken.value += char;
        } else {
          lexedValue += char;
        }

        break;
    }
  }

  /* Lexing the input codes */
  inputString.characterize(lex);

  /* Rest of the lexed value or token which is unfinished */
  parseLexedValueToToken();

  if (currentToken) tokens.push(currentToken);

  /* Secondary Parse to Match Some Patterns */
  var isFunctionArgumentScope = false;
  var tokenCount = tokens.length;
  for (var i = 0; i < tokenCount; i++) {
    var token = tokens[i];
    if (token.type === "keyword" && (token.value === "def" || token.value === "class")) {
      var peekToken = tokens[i + 2];
      if (peekToken && peekToken.type === "default") peekToken.type = "function-name";
    } else if (token.type === "default" && isFunctionArgumentScope) {
      token.type = "argument";
    } else if (token.type === "left-parentheses") {
      var peekToken = tokens[i - 1];
      if (peekToken && peekToken.type === "function-name") isFunctionArgumentScope = true;
    } else if (token.type === "right-parentheses") {
      isFunctionArgumentScope = false;
    }
  }

  return tokens;
}
