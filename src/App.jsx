import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/kandanBoard';
import stateManager from './utilities/states';

const App = () => {
  const [groupingOption, setGroupingOption] = useState('By Status');
  const [sortingOption, setSortingOption] = useState('Priority');

  useEffect(() => {
    const storedState = stateManager.getStoredState();
    if (storedState.groupingOption) {
      setGroupingOption(storedState.groupingOption);
    }
    if (storedState.sortingOption) {
      setSortingOption(storedState.sortingOption);
    }
  }, []);

  useEffect(() => {
    stateManager.saveState({ groupingOption, sortingOption });
  }, [groupingOption, sortingOption]);

  return (
    <div>
      <KanbanBoard
        groupingOption={groupingOption}
        sortingOption={sortingOption}
        onGroupingChange={(option) => setGroupingOption(option)}
        onSortingChange={(option) => setSortingOption(option)}
      />
    </div>
  );
};

export default App;