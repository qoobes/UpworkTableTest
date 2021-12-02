import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineFieldTime,
} from "react-icons/ai";

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "COMPLETE":
      return (
        <td className="icon check-complete">
          <AiFillCheckCircle />
        </td>
      );

    case "INCOMPLETE":
      return (
        <td className="icon check-incomplete">
          <AiOutlineFieldTime />
        </td>
      );

    case "ERROR":
      return (
        <td className="icon check-error">
          <AiFillCloseCircle />
        </td>
      );

    default:
      return (
        <td className="icon check-complete">
          <AiFillCheckCircle />
        </td>
      );
  }
};

// I set the array input as any so as not to waste time defining the type right now
export const filterByStatusUp = (type: string) => {
  if (type === "DSC")
    return (v1: any, v2: any) => (v1.status < v2.status ? 1 : -1);
  return (v1: any, v2: any) => (v1.status > v2.status ? 1 : -1);
};
