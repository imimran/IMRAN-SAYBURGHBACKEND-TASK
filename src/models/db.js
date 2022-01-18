import mongoose from "mongoose";
import logger from "../logger";

export async function createConnectionAndInitialize(dbUrl) {
  try {
    await mongoose.connect(dbUrl);

    logger.info("DB connected");
  } catch (error) {
    logger.error("DB not connected", error);
  }
}

// import mongoose from "mongoose";
// import logger from "../logger";
// import {MONGO_URL} from "../config"

// // const options  = {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //     useFindAndModify: false

// // }

// const connectDB = () => {
//    mongoose.connect(MONGO_URL)

//   console.log('Connected to the mongodb');
//   const conection = mongoose.connection
//   conection.on('error', () => console.log('Cound not connected on the db'))
//   conection.on('connected', () => console.log('Connected to the mongodb'))

//   // const db = mongoose.createConnection(MONGO_URL, { maxPoolSize: 10 });
//   // db.on(`error`, console.error.bind(console, `connection error:`));
//   // db.once(`open`, function () {
//   //   // we`re connected!
//   //   console.log(`MongoDB connected on "  ${MONGO_URL}`);
//   // });
// };
// export default connectDB;

// import mongoose from "mongoose";
// import logger from "../logger";
// import {MONGO_URL} from "../config"

// function connect() {
  
//     return mongoose
//       .connect(MONGO_URL)
//       .then(() => {
//         logger.info("Database connected");
//       })
//       .catch((error) => {
//         logger.error("db error", error);
//         process.exit(1);
//       });
//   }
  
//   export default connect;