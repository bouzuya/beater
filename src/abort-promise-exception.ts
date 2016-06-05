process.on('unhandledRejection', (error: Error) => {
  throw error;
});
