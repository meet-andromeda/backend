import { expect } from 'chai';
import { SinonStub, stub } from 'sinon';
import logger from '.';

describe('Logger instance tests', () => {
  let infoStub: SinonStub;
  let debugStub: SinonStub;
  let errorStub: SinonStub;
  let warnStub: SinonStub;
  let fatalStub: SinonStub;
  let childStub: SinonStub;

  beforeEach(() => {
    infoStub = stub(logger.logger, 'info');
    debugStub = stub(logger.logger, 'debug');
    errorStub = stub(logger.logger, 'error');
    warnStub = stub(logger.logger, 'warn');
    fatalStub = stub(logger.logger, 'fatal');
    childStub = stub(logger.logger, 'child');
  });

  afterEach(() => {
    infoStub.restore();
    debugStub.restore();
    errorStub.restore();
    warnStub.restore();
    fatalStub.restore();
    childStub.restore();
  });

  it('should be an object', () => {
    expect(typeof logger).to.equal('object');
  });

  it('[SUCCESS] Should call Pino.info in info method with required params', () => {
    logger.info({
      name: 'name',
      info: {},
    });

    expect(infoStub).to.have.been.calledOnceWith(
      { info: {} },
      'name',
    );
    expect(debugStub).to.not.have.been.called;
    expect(errorStub).to.not.have.been.called;
    expect(warnStub).to.not.have.been.called;
    expect(fatalStub).to.not.have.been.called;
    expect(childStub).to.not.have.been.called;
  });

  it('[SUCCESS] Should call Pino.debug in debug method with required params', () => {
    logger.debug({
      name: 'name',
      info: {},
    });

    expect(debugStub).to.have.been.calledOnceWith(
      { info: {} },
      'name',
    );
    expect(infoStub).to.not.have.been.called;
    expect(errorStub).to.not.have.been.called;
    expect(warnStub).to.not.have.been.called;
    expect(fatalStub).to.not.have.been.called;
    expect(childStub).to.not.have.been.called;
  });

  it('[SUCCESS] Should call Pino.warn in warning method with required params', () => {
    logger.warning({
      name: 'name',
      info: {},
    });

    expect(warnStub).to.have.been.calledOnceWith(
      { info: {} },
      'name',
    );
    expect(infoStub).to.not.have.been.called;
    expect(errorStub).to.not.have.been.called;
    expect(debugStub).to.not.have.been.called;
    expect(fatalStub).to.not.have.been.called;
    expect(childStub).to.not.have.been.called;
  });

  it('[SUCCESS] Should call Pino.error in error method with required params', () => {
    logger.error({
      name: 'name',
      info: {},
      error: {},
    });

    expect(errorStub).to.have.been.calledOnceWith(
      { info: {}, error: {} },
      'name',
    );
    expect(infoStub).to.not.have.been.called;
    expect(warnStub).to.not.have.been.called;
    expect(debugStub).to.not.have.been.called;
    expect(fatalStub).to.not.have.been.called;
  });

  it('[SUCCESS] Should call Pino.fatal in fatal method with required params', () => {
    logger.fatal({
      name: 'name',
      info: {},
      error: {},
    });

    expect(fatalStub).to.have.been.calledOnceWith(
      { info: {}, error: {} },
      'name',
    );
    expect(infoStub).to.not.have.been.called;
    expect(warnStub).to.not.have.been.called;
    expect(debugStub).to.not.have.been.called;
    expect(errorStub).to.not.have.been.called;
    expect(childStub).to.not.have.been.called;
  });

  it('[SUCCESS] Should call Pino.child in attachRequestId method with requestId', () => {
    const requestId = 'requestId';
    logger.attachRequestId({ requestId });

    expect(childStub).to.have.been.calledOnceWith(
      { requestId },
    );
    expect(infoStub).to.not.have.been.called;
    expect(warnStub).to.not.have.been.called;
    expect(debugStub).to.not.have.been.called;
    expect(errorStub).to.not.have.been.called;
    expect(fatalStub).to.not.have.been.called;
  });
});
