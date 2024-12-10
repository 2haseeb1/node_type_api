import app from './app';
import mongoose from 'mongoose';
import config from './config';

const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.database_url as string);
    // eslint-disable-next-line no-console
    console.log('Database connected successfully ✅');

    // Start the server
    const PORT = config.port || 5000;
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port http://localhost:${PORT} 🚀`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start the server ❌:', error);
    process.exit(1); 
  }
};

startServer();
