import React, { useState, useEffect, useMemo } from 'react';
import  priorityLevels  from '../utilities/priority';
import GroupingOptions from './grouping';
import SortingOptions from './sorting';
import axios from 'axios';
import Note from "./Note";

const KanbanBoard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [groupingOption, setGroupingOption] = useState('By Status');
    const [sortingOption, setSortingOption] = useState('Priority');
  
    // useEffect(() => {
    //     fetch("/tickets",{
    //       mode : 'no-cors',
    //     }).then(
    //       response => response.json()
    //     ).then(
    //       tickets => {
    //         console.log(tickets);
    //         setTickets(tickets);
    //       }
    //     )
    // }, []);
    const groupTickets = (tickets, groupingOption) => {
        // implement grouping logic here
        if(groupingOption == 'By Status'){
            const groupedTickets = tickets.reduce((acc, ticket) => {
                if (!acc[ticket.status]) {
                  acc[ticket.status] = [];
                }
                acc[ticket.status].push(ticket);
                return acc;
              }, {});
              return groupedTickets;
        }
        else if(groupingOption == 'By User'){
            const groupedTickets = users.reduce((acc, user) => {
                if (!acc[user.name]) {
                  acc[user.name] = [];
                }
                acc[user.name].push(user);
                return acc;
              }, {});
              return groupedTickets;
        }else if(groupingOption == 'By Priority'){
            const groupedTickets = tickets.reduce((acc, ticket) => {
                if (!acc[ticket.priority]) {
                  acc[ticket.priority] = [];
                }
                acc[ticket.priority].push(ticket);
                return acc;
              }, {});
              return groupedTickets;
        }
      };
      
      const sortTickets = (groupedTickets, sortingOption) => {
        const sortedGroupedTickets = Object.keys(groupedTickets).reduce((acc, group) => {
          acc[group] = groupedTickets[group].sort((a, b) => {
            if (sortingOption === 'Priority') {
                const priorityA = a.priority ? String(a.priority) : '';
                const priorityB = b.priority ? String(b.priority) : '';
              return priorityA.localeCompare(priorityB);
            } else if (sortingOption === 'Name') {
              return a.title.localeCompare(b.title); // Sort by title if needed
            }
            return 0; // Default no sorting
          });
          return acc;
        }, {});
        return sortedGroupedTickets;
      };
  
    const handleGroupingChange = (option) => {
      setGroupingOption(option);
    };
  
    const handleSortingChange = (option) => {
      setSortingOption(option);
    };

    useEffect(() => {
        // Fetch data using axios
        const fetchData = async () => {
          try {
            const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
            setData(response.data); // Set the data
            setTickets(response.data.tickets);
            setUsers(response.data.users);
            setLoading(false); // Stop loading
          } catch (error) {
            setError(error);
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
    // console.log(users);

    const groupedTickets = useMemo(() => groupTickets(tickets, groupingOption), [tickets, groupingOption]);
    const sortedTickets = useMemo(() => sortTickets(groupedTickets, sortingOption), [groupedTickets, sortingOption]);
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      console.log(sortedTickets);
  
    return (
      <div>
        <GroupingOptions
          onChange={handleGroupingChange}
          value={groupingOption}
        />
        <SortingOptions
          onChange={handleSortingChange}
          value={sortingOption}
        />
        <div className="kanban-board">
        {sortedTickets.Backlog?.map((ticket) => {
        return (
          <Note
            key={ticket.id}
            id={ticket.id}
            title={ticket.title}
          />
        );
      })}
      {sortedTickets.Todo?.map((ticket) => {
        return (
          <Note
            key={ticket.id}
            id={ticket.id}
            title={ticket.title}
          />
        );
      })}
      {sortedTickets.Inprogress?.map((ticket) => {
        return (
          <Note
            key={ticket.id}
            id={ticket.id}
            title={ticket.title}
          />
        );
      })}
      {sortedTickets.Done?.map((ticket) => {
        return (
          <Note
            key={ticket.id}
            id={ticket.id}
            title={ticket.title}
          />
        );
      })}
      {sortedTickets.Cancelled?.map((ticket) => {
        return (
          <Note
            key={ticket.id}
            id={ticket.id}
            title={ticket.title}
          />
        );
      })}
        </div>
      </div>
    );
  };

export default KanbanBoard;