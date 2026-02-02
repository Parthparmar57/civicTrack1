
require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db.js");
const errorHandler = require("./middleware/error.middleware.js");

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(errorHandler);
