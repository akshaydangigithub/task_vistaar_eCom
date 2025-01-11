import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import logger from "morgan";
import session from "express-session";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import ConnectDb from "./models/database.js";
import passport from "./utils/passport.js";

const app = express();

// logger
app.use(logger("dev"));

// CORS Configuration

const coreOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ["http://localhost:5173", "https://task-vistaar-e-com-s19c.vercel.app"];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(coreOptions));


// passport
app.use(passport.initialize());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session and cookie
app.use(cookieParser());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);

// express file upload
app.use(fileUpload());

// connect to database
ConnectDb(process.env.MONGODB_URL);

// routes
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
