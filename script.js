const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");
const textNodes1 = [
  {
    id: 1,
    text: "you wake up in a lightly darked room and see a gem",
    options: [
      {
        text: "Take the gem",
        requiredState: null,
        setState: { blueGoo: true },
        nextText: 2
        
      },
      {
        text: "Leave the gem",
        requiredState: null,
        nextText: 9
      }
    ]
  },
  {
    id: 2,
    text: "you see a glint of light at the end of the tunnle",
    options: [
      {
        text: "walk to the light without gem",
        requiredState: currentState => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: "start spinning around and eventually get there",
        requiredState: currentState => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: "walk to the light",
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text:
      "you come up to the light but the tunle forks off you can go left or right",
    options: [
      {
        text: "left",
        nextText: 4
      },
      {
        text: "stay",
        nextText: 5
      },
      {
        text: "right",
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text:
      "you walk down the tunnle but hit a boobie trap and a arrow gose into your head",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: "Without going any where you lose",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: "you go down the tunnle and behind you the tunnle clapsis behind you",
    options: [
      {
        text: "keep going forward",
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: "While you keep walking down the tunnle you encounter a big spider",
    options: [
      {
        text: "Try to run",
        nextText: 8
      },
      {
        text: "Attack it with your gem",
        requiredState: currentState => currentState.sword,
        nextText: 9
      },
      {
        text: "exsept you fate and stand there",
        requiredState: currentState => currentState.shield,
        nextText: 10
      },
      {
        text: "Throw gem at it",
        requiredState: currentState => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text:
      "because you where spinning your attempts to run are in vain and the monster easily catches.",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text:
      "You foolishly left your gem at the start and dont have it so you lose.",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: "the spider charges you as you stand you stand there",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: "you win as you therw the gem it explodes killing the monster",
    options: [
      {
        text: "Congratulations. Play Again.",
        nextText: -1
      }
    ]
  }
];

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode2 = textNodes1.find(textNode => textNode.id === textNodeIndex);
  textElement.innerText = textNode2.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode2.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState === null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}



startGame();

