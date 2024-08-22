interface Header {
  courseName: string;
}

const Header = ({ courseName }: Header) => {
  return (
    <div>
      <h2>{courseName}</h2>
    </div>
  );
};

export default Header;
