import { process } from '../../globals/process';

process.on('unhandledRejection', (error: Error) => {
  throw error;
});
