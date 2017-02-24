import { Read } from './common/Read';
import { Write } from './common/Write';

export interface AbstractApplicationService<T> extends Read<T>, Write<T> {}