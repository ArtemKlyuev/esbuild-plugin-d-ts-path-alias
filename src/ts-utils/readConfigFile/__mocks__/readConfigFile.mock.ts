import { readConfigFile } from '../readConfigFile';

jest.mock('../readConfigFile');

export const readConfigFileMock = jest.mocked(readConfigFile);
