import Navbar from "./component/NavBar/Navbar";
import './app.css';
import { useState } from "react";
import add from '../src/icons/add.svg';
import dot3 from '../src/icons/3 dot menu.svg';

function App() {
  const [groupedTickets, setGroupedTickets] = useState([]); // State for grouped tickets
  const priorityMapping = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No Priority"
  };

  const handleUpdateTickets = (tickets) => {
    setGroupedTickets(tickets); // Update state with new tickets
  };

  console.log("finlan", groupedTickets);

  return (
    <div>
      <Navbar onUpdateTickets={handleUpdateTickets} />
      <div className="content">
        <div className="column">
          {Object.keys(groupedTickets).map((groupName) => {
            const priorityLabel = priorityMapping[groupName] || groupName; // Use priority mapping or groupName directly
            return (
              <div className="column-item" key={groupName}>
                <div className="column-content">
                  <div className="head">
                    <div className="users">
                      <span>
                       {priorityLabel}
                      </span>
                      <span> {groupedTickets[groupName].length}</span>
                    </div>
                    <div>
                      <img src={add} alt="" />
                      <img src={dot3} alt="" />
                    </div>
                  </div>
                  
                  {groupedTickets[groupName].map((ticket) => (
                    <div className="card" key={ticket.id}>
                      <div className="card-item">
                        <h6>{ticket.id}</h6> 
                        <p>{ticket.title}</p> 
                        <div className="feature">
                          <img src={dot3} alt=""/>
                          <p>{ticket.tag}</p>
                        </div>
                      </div>
                      <div className="user">
                        <img src="" alt="" />
                        <div className="dot"></div> 
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
