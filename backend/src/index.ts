import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import hotelRoutes from "./routes/hotels";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import myHotelRoutes from "./routes/my-hotels";
import bookingRoutes from "./routes/my-bookings";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string);
  // .then(() =>
  //   console.log(
  //     "connected to database: ",
  //     process.env.MONGODB_CONNECTION_STRING
  //   )
  // );

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Update CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-bookings", bookingRoutes);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(7000, () => {
  console.log("server running on localhost:7000");
});
function then(arg0: () => void) {
  throw new Error("Function not implemented.");
}

