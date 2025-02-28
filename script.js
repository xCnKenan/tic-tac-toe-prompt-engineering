let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = 'circle'; // Startspieler

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
      // Hier wird das onclick-Attribut hinzugefügt
      tableHTML += `<td onclick="handleClick(${index}, this)">${symbol}</td>`;
    }
    tableHTML += "</tr>";
  }

  tableHTML += "</table>";
  contentDiv.innerHTML = tableHTML;
}

// Funktion, die bei einem Klick auf ein Feld ausgelöst wird
function handleClick(index, tdElement) {
  if (fields[index] === null) { // Nur wenn das Feld leer ist
    // Setze das Symbol in das Array
    fields[index] = currentPlayer;

    // Füge das passende SVG in das <td>-Element ein
    if (currentPlayer === 'circle') {
      tdElement.innerHTML = generateCircleSVG();
    } else {
      tdElement.innerHTML = generateCrossSVG();
    }

    // Entferne das onclick-Attribut, sodass das Feld nicht erneut angeklickt werden kann
    tdElement.removeAttribute("onclick");

    // Wechsel den Spieler
    currentPlayer = (currentPlayer === 'circle') ? 'cross' : 'circle';
  }
}

// // SVG-Generierung für ein Kreis
// function generateCircleSVG() {
//   return '<svg width="50" height="50"><circle cx="25" cy="25" r="20" stroke="black" stroke-width="3" fill="none" /></svg>';
// }

// // SVG-Generierung für ein Kreuz
// function generateCrossSVG() {
//   return '<svg width="50" height="50"><line x1="5" y1="5" x2="45" y2="45" stroke="black" stroke-width="3" /><line x1="45" y1="5" x2="5" y2="45" stroke="black" stroke-width="3" /></svg>';
// }



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


