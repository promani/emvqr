import { MpTemplate } from './mp.template';
import { EmvTemplate } from './emv.template';
import { TodopagoTemplate } from './todopago.template';
import { SprTemplate } from './spr.template';
import { FiservTemplate } from './fiserv.template';
import { GeopagosTemplate } from './geopagos.template';

export default {
  emv: new EmvTemplate(), //encode available
  mp: new MpTemplate(), //encode available
  todopago: new TodopagoTemplate(),
  spr: new SprTemplate(),
  fiserv: new FiservTemplate(),
  geopagos: new GeopagosTemplate(),
};
