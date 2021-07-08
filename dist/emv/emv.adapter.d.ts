import { EmvTemplate } from './templates/emv.template';
export declare function parse(qr: string): import("./templates/emv.dto").EmvDto;
export declare function encode(data: unknown, template?: EmvTemplate): string;
