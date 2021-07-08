import { TemplateInterface } from './template.interface';
import { EmvDto } from './emv.dto';
export declare class EmvTemplate implements TemplateInterface {
    protected readonly ECOMMERCE_CHANNEL = "521";
    protected readonly ISO_CODE_ARS = "032";
    protected readonly ISO_CODE_ARG = "AR";
    protected readonly CLIENT_REQUEST = "***";
    supports: (o: any) => boolean;
    encode(o: any, dynamic?: boolean): any;
    parse(o: any): EmvDto;
}
