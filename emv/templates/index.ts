import { MpTemplate } from './mp.template';
import { EmvTemplate } from './emv.template';
import { TodopagoTemplate } from './todopago.template';
import { SprTemplate } from './spr.template';
import { FiservTemplate } from './fiserv.template';
import { GeopagosTemplate } from './geopagos.template';

export default [
  new EmvTemplate(), //encode available
  new MpTemplate(), //encode available
  new TodopagoTemplate(),
  new SprTemplate(),
  new FiservTemplate(),
  new GeopagosTemplate(),
];
