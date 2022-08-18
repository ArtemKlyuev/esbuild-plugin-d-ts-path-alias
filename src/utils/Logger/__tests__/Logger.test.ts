import { Logger } from '../Logger';

jest.mock('chalk', () => ({
  blue: jest.fn((input) => input),
  green: jest.fn((input) => input),
  red: jest.fn((input) => input),
}));

describe('utils', () => {
  describe('Logger', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should not output messages if `disable` set to true', () => {
      const log = jest.spyOn(console, 'log');
      const error = jest.spyOn(console, 'error');

      const logger = new Logger('logger', true);

      logger.info('info');
      expect(log).not.toBeCalled();

      logger.success('success');
      expect(log).not.toBeCalled();

      logger.info('error');
      expect(error).not.toBeCalled();
    });

    it('should print info message', () => {
      const log = jest.spyOn(console, 'log').mockImplementation(() => {});

      const logger = new Logger('logger', false);

      logger.info('info');

      expect(log).toBeCalled();
      expect(log).toHaveBeenCalledTimes(1);
      expect(log).toBeCalledWith('[logger]: info');
    });

    it('should print success message', () => {
      const log = jest.spyOn(console, 'log').mockImplementation(() => {});

      const logger = new Logger('logger', false);

      logger.success('success');

      expect(log).toBeCalled();
      expect(log).toHaveBeenCalledTimes(1);
      expect(log).toBeCalledWith('[logger]: success');
    });

    it('should print error message', () => {
      const error = jest.spyOn(console, 'error').mockImplementation(() => {});

      const logger = new Logger('logger', false);

      logger.error('error');

      expect(error).toBeCalled();
      expect(error).toHaveBeenCalledTimes(1);
      expect(error).toBeCalledWith('[logger]: error');
    });

    it('should pass additional params to error message', () => {
      const error = jest.spyOn(console, 'error').mockImplementation(() => {});

      const logger = new Logger('logger', false);

      logger.error('error', 5);

      expect(error).toBeCalled();
      expect(error).toHaveBeenCalledTimes(1);
      expect(error).toBeCalledWith('[logger]: error', 5);
    });
  });
});
