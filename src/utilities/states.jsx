const stateManager = {
    getStoredState() {
      return JSON.parse(localStorage.getItem('kanban-board-state')) || {};
    },
  
    saveState(state) {
      localStorage.setItem('kanban-board-state', JSON.stringify(state));
    },
  };
  
  export default stateManager;