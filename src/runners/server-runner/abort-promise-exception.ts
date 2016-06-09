import { process } from '../../process';

process.on('unhandledRejection', (error: Error) => {
  throw error;
});
