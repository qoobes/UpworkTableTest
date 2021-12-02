import { useRef, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import Dataset from "../../Data/data.json";
import { getStatusIcon } from "./services";
import "./styles.css";

// note that for the dropdown, I'd usually spend a lot more time on it or use a library like chakra-ui

const DropdownTable: React.FC = () => {
  const [filter, setFilter] = useState({
    complete: true,
    incomplete: true,
    errored: true,
    sort: "NONE",
  });
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const updateChecked = (item: string) => {
    if (item === "complete")
      setFilter(prev => ({ ...prev, complete: !prev.complete }));
    if (item === "incomplete")
      setFilter(prev => ({ ...prev, incomplete: !prev.incomplete }));
    if (item === "errored")
      setFilter(prev => ({ ...prev, errored: !prev.errored }));
  };

  const filterComplete = (args: any) => {
    if (filter.complete) return true;

    if (args.status.toLowerCase() === "complete") return false;
    return true;
  };

  const filterIncomplete = (args: any) => {
    if (filter.incomplete) return true;

    if (args.status.toLowerCase() === "incomplete") return false;
    return true;
  };

  const filterErrored = (args: any) => {
    if (filter.errored) return true;

    if (args.status.toLowerCase() === "errored") return false;
    return true;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Carrier</th>
          <th>
            Status{" "}
            <button
              className="icon-button"
              // @ts-ignore I'm using this to save a little bit of time right now
              onClick={() => setIsOpen(prev => !prev)}
            >
              <AiFillCaretDown />
            </button>
            <div
              className={`dropdown ${isOpen ? "visible" : "false"}`}
              tabIndex={0}
              ref={dropdownRef}
            >
              <span className="dd-checkbox">
                <input
                  readOnly
                  type="checkbox"
                  checked={filter.complete}
                  onClick={() => updateChecked("complete")}
                />{" "}
                Complete
              </span>
              <span className="dd-checkbox">
                <input
                  readOnly
                  type="checkbox"
                  checked={filter.incomplete}
                  onClick={() => updateChecked("incomplete")}
                />{" "}
                Incomplete
              </span>
              <span className="dd-checkbox">
                <input
                  readOnly
                  type="checkbox"
                  checked={filter.errored}
                  onClick={() => updateChecked("errored")}
                />{" "}
                Error
              </span>
              <span className="dd-checkbox">
                <select
                  style={{
                    border: "none",
                    outline: "none",
                  }}
                  name="sort"
                  id="sort"
                  onChange={e =>
                    setFilter(prev => ({ ...prev, sort: e.target.value }))
                  }
                >
                  <option value="NONE">None</option>
                  <option value="ASCENDING">Completed</option>
                  <option value="DESCENDING">Not Completed</option>
                </select>
              </span>
            </div>
          </th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {Dataset.filter(filterComplete)
          .filter(filterIncomplete)
          .filter(filterErrored)
          .sort((v1, v2) => {
            if (filter.sort === "NONE") return 1;

            if (filter.sort === "ASCENDING")
              return v1.status > v2.status ? 1 : -1;
            if (filter.sort === "DESCENDING")
              return v1.status < v2.status ? 1 : -1;

            return 1;
          })
          .map((data, key) => (
            <tr key={key}>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>{data.carrier}</td>
              {getStatusIcon(data.status)}
              <td>{new Date(data.eventDate).toDateString()}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default DropdownTable;
