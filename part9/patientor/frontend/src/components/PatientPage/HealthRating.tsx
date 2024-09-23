import FavoriteIcon from "@mui/icons-material/Favorite";

interface Props {
  rating: number;
}

const HealthRating = ({ rating }: Props) => {
  switch (rating) {
    case 0:
      return (
        <p>
          Healty: <FavoriteIcon sx={{ color: "green" }} />
        </p>
      );
    case 1:
      return (
        <p>
          Low risk: <FavoriteIcon sx={{ color: "yellow" }} />
        </p>
      );
    case 2:
      return (
        <p>
          High risk: <FavoriteIcon sx={{ color: "orange" }} />
        </p>
      );
    case 3:
      return (
        <p>
          Critical risk: <FavoriteIcon sx={{ color: "red" }} />
        </p>
      );
  }
};
export default HealthRating;
