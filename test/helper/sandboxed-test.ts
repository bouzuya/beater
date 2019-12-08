import sinon from 'sinon';
import { Test } from '../../src';

const sandboxedTest = (
  test: (context: { sandbox: sinon.SinonSandbox }) => void
): Test => {
  return async () => {
    const sandbox = sinon.createSandbox();
    try {
      return await test({ sandbox });
    } finally {
      sandbox.restore();
    }
  };
};

export { sandboxedTest };
