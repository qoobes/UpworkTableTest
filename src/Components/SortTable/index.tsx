import { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Dataset from "../../Data/data.json";
import { filterByStatusUp, getStatusIcon } from "./services";
import "./styles.css";

// note that for the dropdown, I'd usually spend a lot more time on it or use a library like chakra-ui

const ExampleTable: React.FC = () => {
  const [filter, setFilter] = useState("DSC");

  return (
    <table>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Carrier</th>
        <th>
          Status{" "}
          <button
            className="icon-button"
            onClick={() => setFilter(prev => (prev === "DSC" ? "ASC" : "DSC"))}
          >
            {filter === "DSC" ? <AiFillCaretDown /> : <AiFillCaretUp />}
          </button>
        </th>
        <th>Date</th>
      </tr>
      {Dataset.sort(filterByStatusUp(filter)).map((data, key) => (
        <tr key={key}>
          <td>{data.firstName}</td>
          <td>{data.lastName}</td>
          <td>{data.carrier}</td>
          {getStatusIcon(data.status)}
          <td>{new Date(data.eventDate).toDateString()}</td>
        </tr>
      ))}
    </table>
  );
};

export default ExampleTable;
