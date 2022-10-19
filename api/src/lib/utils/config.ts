function getConfigString(prop: string): string {
  const val = process.env[prop] || null;

  return val ? `${val}` : val!;
}

function getConfigNumber(prop: string): number {
  const val = process.env[prop] || null;

  return val ? parseFloat(`${val}`) : null || 1;
}

function getConfigBoolean(prop: string): boolean {
  const val = process.env[prop] || null;

  return val ? val === 'true' : false;
}

function getConfig(prop: string, type: 'string'): string;

function getConfig(prop: string, type: 'number'): number;

function getConfig(prop: string, type: 'boolean'): boolean;

function getConfig(prop: string, type: 'string' | 'number' | 'boolean'): string | number | boolean {
  switch (type) {
    case 'string':
      return getConfigString(prop);
    case 'number':
      return getConfigNumber(prop);
    case 'boolean':
      return getConfigBoolean(prop);
    default:
      return getConfigString(prop);
  }
}

export default class Config {
  public static NODE_ENV = getConfig('NODE_ENV', 'string');
  public static PORT = getConfig('PORT', 'number');
  public static DB_HOST = getConfig('DB_HOST', 'string');
  public static DB_PORT = getConfig('DB_PORT', 'number');
  public static DB_USER = getConfig('DB_USER', 'string');
  public static DB_PASSWORD = getConfig('DB_PASSWORD', 'string');
  public static DB_DATABASE = getConfig('DB_DATABASE', 'string');
}
