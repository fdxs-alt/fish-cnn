const getEnvVar = (key: string) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Variable with key ${key} not found`);
  }

  return value;
};

export { getEnvVar };
