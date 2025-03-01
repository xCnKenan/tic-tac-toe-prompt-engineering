let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "circle";

function init() {
  render();
}

function render() {
  let contentDiv = document.getElementById("content");
  let tableHTML = "<table>";

  for (let i = 0; i < 3; i++) {
    tableHTML += "<tr>";
    for (let j = 0; j < 3; j++) {
      let index = i * 3 + j;
      let symbol = "";
      if (fields[index] === "circle") {
        symbol = generateCircleSVG();
      } else if (fields[index] === "cross") {
        symbol = generateCrossSVG();
      }

      tableHTML += `<td onclick="handleClick(${index}, this)">${symbol}</td>`;
    }
    tableHTML += "</tr>";
  }

  tableHTML += "</table>";
  contentDiv.innerHTML = tableHTML;
}

function handleClick(index, tdElement) {
  if (fields[index] === null) {
    fields[index] = currentPlayer;

    if (currentPlayer === "circle") {
      tdElement.innerHTML = generateCircleSVG();
    } else {
      tdElement.innerHTML = generateCrossSVG();
    }
    tdElement.removeAttribute("onclick");

    if (checkWinner()) {
      return;
    }

    currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      drawWinLine(pattern);
      return true;
    }
  }
  return false;
}

function drawWinLine(pattern) {
  const [a, b, c] = pattern;
  let contentDiv = document.getElementById("content");

  const positions = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
  ];

  const start = positions[a];
  const end = positions[c];

  let lineElement = document.createElement("div");
  lineElement.classList.add("win-line");

  if (start.y === end.y) {
    lineElement.style.width = "100%"; // Die Linie geht über die gesamte Breite der Zellen
    lineElement.style.height = "5px"; // Die Linie hat eine Höhe von 5px
    lineElement.style.left = `${start.x * 100}px`; // X-Position der Linie (Startzelle)
    lineElement.style.top = `${start.y * 100 + 45}px`; // Y-Position (Mitte der Zelle)
  }
  // Wenn die Linie vertikal ist
  else if (start.x === end.x) {
    lineElement.style.width = "5px"; // Die Linie hat eine Breite von 5px
    lineElement.style.height = "100%"; // Die Linie geht über die gesamte Höhe
    lineElement.style.left = `${start.x * 100 + 45}px`; // X-Position (Mitte der Zelle)
    lineElement.style.top = `${start.y * 100}px`; // Y-Position (Startzelle)
  }
  // Wenn die Linie diagonal (von oben links nach unten rechts) ist
  else if (start.x - start.y === end.x - end.y) {
    lineElement.style.width = "5px";
    lineElement.style.height = "100%";
    lineElement.style.transform = "rotate(-45deg)"; // Diagonale von oben links nach unten rechts
    lineElement.style.transformOrigin = "top left"; // Ursprungspunkt der Drehung auf "top left"
    lineElement.style.left = `${start.x * 100}px`;
    lineElement.style.top = `${start.y * 100}px`;
  }
  // Wenn die Linie diagonal (von oben rechts nach unten links) ist
  else if (start.x + start.y === end.x + end.y) {
    lineElement.style.width = "5px";
    lineElement.style.height = "100%";
    lineElement.style.transform = "rotate(45deg)"; // Diagonale von oben rechts nach unten links
    lineElement.style.transformOrigin = "top right"; // Ursprungspunkt der Drehung auf "top right"
    lineElement.style.left = `${start.x * 100 + 55}px`;
    lineElement.style.top = `${start.y * 100}px`;
  }

  contentDiv.appendChild(lineElement);
}

function generateCircleSVG() {
  return `
        <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="30" stroke="#00B0EF" stroke-width="8" fill="none"
                stroke-dasharray="188.4" stroke-dashoffset="188.4">
                <animate attributeName="stroke-dashoffset" from="188.4" to="0" dur="0.3s" fill="freeze" />
            </circle>
        </svg>
    `;
}

function generateCrossSVG() {
  return `
        <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="20" x2="80" y2="80" stroke="#FFC000" stroke-width="8" stroke-linecap="round">
                <animate attributeName="x2" from="20" to="80" dur="0.3s" fill="freeze" />
                <animate attributeName="y2" from="20" to="80" dur="0.3s" fill="freeze" />
            </line>
            <line x1="80" y1="20" x2="20" y2="80" stroke="#FFC000" stroke-width="8" stroke-linecap="round">
                <animate attributeName="x2" from="80" to="20" dur="0.3s" fill="freeze" />
                <animate attributeName="y2" from="20" to="80" dur="0.3s" fill="freeze" />
            </line>
        </svg>
    `;
}

function generateHorizontalWinSVG() {
  return `
    <svg width="100%" height="5" viewBox="0 0 100 5" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100%" height="5" fill="red"/>
    </svg>
  `;
}

function generateVerticalWinSVG() {
  return `
    <svg width="5" height="100%" viewBox="0 0 5 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="5" height="100%" fill="red"/>
    </svg>
  `;
}

function generateDiagonal1WinSVG() {
  return `
    <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="0" x2="100" y2="100" stroke="red" stroke-width="5"/>
    </svg>
  `;
}

function generateDiagonal2WinSVG() {
  return `
    <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <line x1="100" y1="0" x2="0" y2="100" stroke="red" stroke-width="5"/>
    </svg>
  `;
}

function resetGame() {
  fields = [null, null, null, null, null, null, null, null, null];
  currentPlayer = "circle";
  render();
}
