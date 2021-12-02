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
