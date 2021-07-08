import { EmvTemplate } from './emv.template';
import { EmvDto } from './emv.dto';
export declare class MpTemplate extends EmvTemplate {
    private readonly REVERSE_DOMAIN;
    supports: (o: any) => boolean;
    encode: (o: any) => any;
    parse: (o: any) => EmvDto;
}
