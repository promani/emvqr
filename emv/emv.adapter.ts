import templates from './templates';
import { EmvTemplate } from './templates/emv.template';
import tlv from "./tlv";
import computeCRC from "./crc";
import * as decoder from "./decoder";

const CRC_TL = '6304';

export function parse(qr: string) {
  qr =
      qr.substring(0, qr.length - 4) + qr.substring(qr.length - 4).toUpperCase(); //TODO: Remove this

  const decoded = decoder.decode(qr);
  const template = templates.find((t) => t.supports(decoded));

  return template.parse(decoded);
}

export function encode(data: unknown, template?: EmvTemplate) {
  if (!template) template = templates[0];
  const result = tlv(template.encode(data)) + CRC_TL;
  return result + computeCRC(result);
}

