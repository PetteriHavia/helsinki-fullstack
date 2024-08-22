import Part from "./Part";
import { CoursePart } from "../types";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((item) => (
        <Part item={item} key={item.name} />
      ))}
    </div>
  );
};

export default Content;
