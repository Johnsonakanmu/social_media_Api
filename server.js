const express = require("express");
const app = express();
const PORT = process.env.PORT || 3200;
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute");
const postRouter = require("./routes/postRoute");
const cors = require("cors");

require("dotenv").config();

//Swagger
const SwaggerUI = require("swagger-ui-express");
const YMAL = require("yamljs");
const swaggerDocument = YMAL.load("./swagger.yaml");

//Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));

app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));

//Navigation/ Router
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/post", postRouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDb!"));

app.listen(PORT, () => console.log(`server is listining on port: ${PORT}`));
