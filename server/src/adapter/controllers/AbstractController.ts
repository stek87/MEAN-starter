import { ReadController } from './interfaces/ReadController';
import { WriteController } from './interfaces/WriteController';
import { AbstractApplicationService } from '../../application/AbstractApplicationService';

export interface AbstractController<T extends AbstractApplicationService<Object>> extends
  ReadController,
  WriteController {}
