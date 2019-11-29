import { f1 } from './import-1';
import { C1 } from './import-2';

const import1 = (): number => f1();

const import2 = (): void => new C1().m1();

export { import1, import2 };
