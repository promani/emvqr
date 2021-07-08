import templates from './templates';
import { EmvTemplate } from './templates/emv.template';
import tlv from "./tlv";
import computeCRC from "./crc";
import * as decoder from "./decoder";

const CRC_TL = '6304';

export function parse(qr: string) {
  const decoded = decoder.decode(qr);
  const template = Object.values(templates).find((t) => t.supports(decoded));

  return template.parse(decoded);
}

export function encode(data: unknown, template?: string | EmvTemplate) {
  if (typeof template === 'string') template = templates[template];
  if (!(template instanceof EmvTemplate)) {
    template = templates['emv'];
  }
  const result = tlv(template.encode(data)) + CRC_TL;
  return result + computeCRC(result);
}

