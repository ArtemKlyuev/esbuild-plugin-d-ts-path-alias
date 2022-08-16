import { Logger } from '../Logger';

jest.mock('chalk', () => ({ green: jest.fn((input) => input), red: jest.fn((input) => input) }));

describe('utils', () => {
  describe('Logger', () => {
    it('should not output messages if `disable` set to true', () => {
      const log = jest.spyOn(console, 'log');
      const error = jest.spyOn(console, 'error');

      const logger = new Logger('logger', true);

      logger.info('lorem ipsum');
      expect(log).not.toBeCalled();

      logger.info('error');
      expect(error).not.toBeCalled();
    });

    it('should print info message', () => {
      const log = jest.spyOn(console, 'log').mockImplementation(() => {});

      const logger = new Logger('logger', false);

      logger.info('lorem ipsum');

      expect(log).toBeCalled();
      expect(log).toBeCalledWith('[logger]: lorem ipsum');
    });

    it('should print error message', () => {
      const error = jest.spyOn(console, 'error').mockImplementation(() => {});

      const logger = new Logger('logger', false);

      logger.error('error');

      expect(error).toBeCalled();
      expect(error).toBeCalledWith('[logger]: error');
    });
  });
});
