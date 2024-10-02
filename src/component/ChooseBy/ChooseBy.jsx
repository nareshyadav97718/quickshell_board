import React, { useEffect, useState } from 'react';
import './Chooseby.css';
import axios from 'axios';

function ChooseBy({ onUpdateTickets }) {
  const [ticket, setTicket] = useState([]); // Tickets data
  const [user, setUser] = useState([]);     // Users data
  const [selectOrder, setSelectOrder] = useState('Priority'); // Default sorting criteria
  const [selectGroup, setSelectGroup] = useState('Status');   // Default grouping criteria

  const priorityMapping = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No Priority"
  };

  // Fetch data once when component mounts
  useEffect(() => {
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(res => {
        setTicket(res.data.tickets);  // Set tickets
        setUser(res.data.users);      // Set users
        console.log("ticket", res.data.tickets);
      })
      .catch(err => {
        console.log(err);
      });
  }, []); 

  // Handle sorting and grouping of tickets when state changes
  useEffect(() => {
    const groupByCategory = (category, data) => {
      if (category === 'User') {
        const userLookup = user.reduce((acc, currUser) => {
          acc[currUser.id] = currUser.name;
          return acc;
        }, {});
        
        return data.reduce((acc, ticket) => {
          const userName = userLookup[ticket.userId] || 'Unknown';
          if (!acc[userName]) {
            acc[userName] = [];
          }
          acc[userName].push(ticket);
          return acc;
        }, {});
      } else if (category === 'Priority') {
        return data.reduce((acc, ticket) => {
          const priorityLabel = priorityMapping[ticket.priority] || 'No Priority';
          if (!acc[priorityLabel]) {
            acc[priorityLabel] = [];
          }
          acc[priorityLabel].push(ticket);
          return acc;
        }, {});
      } else {
        return data.reduce((acc, ticket) => {
          const key = ticket[category.toLowerCase()] || 'Unknown';
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(ticket);
          return acc;
        }, {});
      }
    };

    const sortedTickets = [...ticket].sort((a, b) => {
      if (selectOrder === 'Priority') {
        return a.priority - b.priority;
      }
      return a.title.localeCompare(b.title);
    });

    const grouped = groupByCategory(selectGroup === 'User' ? 'User' : selectGroup.toLowerCase(), sortedTickets);

    onUpdateTickets(grouped);
  }, [ticket, selectGroup, selectOrder, user, onUpdateTickets]);  

  // Handle selection for grouping
  const handleGroupSelect = (e) => {
    setSelectGroup(e.target.value);
  };

  // Handle selection for ordering
  const handleOrderSelect = (e) => {
    setSelectOrder(e.target.value);
  };

  console.log("selected", selectGroup, selectOrder, user, ticket);

  return (
    <div className='containerChoose'>
      <div className='group'>
        <h5>Grouping</h5>
        <h5>Ordering</h5>
      </div>
      <div className='group'>
        <select value={selectGroup} onChange={handleGroupSelect}>
          <option value="Status">Status</option>
          <option value="User">User</option>
          <option value="Priority">Priority</option>
        </select>
        <select value={selectOrder} onChange={handleOrderSelect}>
          <option value="Priority">Priority</option>
          <option value="Title">Title</option>
        </select>
      </div>
    </div>
  );
}

export default ChooseBy;
