import app from "./server";
import * as dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/`);
});
