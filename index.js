import "dotenv/config";
import app from "./src/app.js";
import { sequelize } from "./src/db.js";

async function main() {
  try {
    await sequelize.sync({ force: true });
    app.listen(app.get("port"), () => {
      console.log(`Server running on port ${app.get("port")}`);
    });
  } catch (error) {
    console.log("Unable to connect to the database", error);
  }
}

main();
