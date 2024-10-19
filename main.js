import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const player = document.getElementById("player");
  const saveStateBtn = document.getElementById("saveStateBtn");
  const loadStateBtn = document.getElementById("loadStateBtn");
  
  // Function to save the game state
  function saveGameState() {
    if (player.saveSavestate) {
      player.saveSavestate().then(state => {
        localStorage.setItem('ndsGameState', state);
        console.log("Game state saved");
      }).catch(error => {
        console.error("Error saving game state:", error);
      });
    } else {
      console.error("saveSavestate method not available");
    }
  }

  // Function to load the game state
  function loadGameState() {
    const savedState = localStorage.getItem('ndsGameState');
    if (savedState && player.loadSavestate) {
      player.loadSavestate(savedState).then(() => {
        console.log("Game state loaded");
      }).catch(error => {
        console.error("Error loading game state:", error);
      });
    } else {
      console.log("No saved state found or loadSavestate method not available");
    }
  }

  // Replace 'path-to-game.nds' with the actual path to your NDS game
  player.loadURL("path-to-game.nds", function() {
    console.log("Game loaded successfully");
    if (player.enableMicrophone) {
      player.enableMicrophone();
    }
    
    // Load the saved state if it exists
    loadGameState();
  });

  // Save state button event listener
  saveStateBtn.addEventListener('click', saveGameState);

  // Load state button event listener
  loadStateBtn.addEventListener('click', loadGameState);

  // Save the state before closing the page
  window.addEventListener('beforeunload', saveGameState);
});