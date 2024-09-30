require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running in PORT: ${PORT}`);
});