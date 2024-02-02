/*import mongoose from 'mongoose';

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(error){
        console.log(`Error:${error.message}`);
        process.exit(1)
    }
};

export default connectDB;*/
import mongoose from 'mongoose';

class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    if (this.connection) {
      return this.connection;
    }

    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      this.connection = conn;
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return this.connection;
    } catch (error) {
      console.log(`Error: ${error.message}`);
      process.exit(1);
    }
  }
}

export const dbInstance = new Database();
