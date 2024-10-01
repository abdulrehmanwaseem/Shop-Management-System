import "dotenv/config";
import { app } from "./app.js";
import { connectToDB } from "./src/config/dbConnection.js";

const PORT = process.env.PORT || 3000;

// Server Listener
app.listen(PORT, () => {
  connectToDB();
  console.log(
    `Server is running at port *${PORT} in *${process.env.NODE_ENV}Mode`
  );
});
