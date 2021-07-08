import { MpTemplate } from './templates/mp.template';
import { parse, encode } from '../index';
import { EmvTemplate } from './templates/emv.template';

describe('Parse Qr', () => {
  it('Todopago Qr', () => {
    const qr =
      '00020101021144110007com.agr48270012com.todopago0107244083950150011203300443075204970053030325802AR5918Santiago Hernandez6015ALMIRANTE BROWN6304E6D0';
    const parsed = parse(qr);
    expect(parsed).toEqual(
      expect.objectContaining({
        reverse_domain: 'COM.TODOPAGO',
        merchant_tax_id: '20330044307',
        merchant_city: 'ALMIRANTE BROWN',
        merchant_name: 'Santiago Hernandez',
        mcc: '9700',
      }),
    );
  });

  it('Spr Qr', () => {
    const qr =
      '00020101021144110007com.spr50250004CUIT011320-12345678-1520453115925Nombre de comercio de 25c625003083061234507081200055050220007POSInfo01071041235630433F7';
    const parsed = parse(qr);
    expect(parsed).toEqual(
      expect.objectContaining({
        reverse_domain: 'COM.SPR',
        merchant_tax_id: '20123456781',
        merchant_name: 'Nombre de comercio de 25c',
        mcc: '5311',
      }),
    );
  });

  describe('MercadoLibre Qrs', () => {
    it('Example 1', async () => {
      const qr =
        '00020101021243650016COM.MERCADOLIBRE020130636fa7070cc-266c-44aa-aa0c-5d9900a99b1350150011201624758605204970053030325802AR5921CLAUDIO ARIEL ARONSON6015Ciudad Autonoma62070503***6304FCAA';
      const parsed = parse(qr);
      expect(parsed).toEqual(
        expect.objectContaining({
          reverse_domain: 'COM.MERCADOLIBRE',
          merchant_city: 'Ciudad Autonoma',
          merchant_name: 'CLAUDIO ARIEL ARONSON',
          mcc: '9700',
          merchant_tax_id: '20162475860',
          reference_label: '***',
        }),
      );
    });

    it('Example 2', () => {
      const qr =
        '00020101021243380016com.mercadolibre02011030967458217352049700530303254041.005802AR5920BIGBRANDSGROUPBIGBRA6013C1405BFO CABA62630308355663010524ING-ARG-163452435FFC7A840708182607470807Pago QR6304647E';
      const parsed = parse(qr);
      expect(parsed).toEqual(
        expect.objectContaining({
          reverse_domain: 'COM.MERCADOLIBRE',
          merchant_city: 'C1405BFO CABA',
          merchant_name: 'BIGBRANDSGROUPBIGBRA',
          mcc: '9700',
          amount: 1,
        }),
      );
    });

    it('Example 3', () => {
      const qr =
        '00020101021143640016com.mercadolibre0140https://pagos.caldenoil.com/1132?Pos=10150150011305161866705204970053030325802AR5925DEHEZA SOCIEDAD ANONIMA I6004CABA6304ACA8';
      const parsed = parse(qr);
      expect(parsed).toEqual(
        expect.objectContaining({
          reverse_domain: 'COM.MERCADOLIBRE',
          merchant_tax_id: '30516186670',
          merchant_city: 'CABA',
          merchant_name: 'DEHEZA SOCIEDAD ANONIMA I',
          mcc: '9700',
        }),
      );
    });
  });

  it(' Fiserv Qr', () => {
    const qr =
      '0002010102125017001330-62017749-7512600220000068000000002222956520458125303032540410.05802AR5914PRUEBA QR DIMO6012VILLA GESELL610507165627001130000-000000000708396675605003APS51031.0520105312210112160106540210802139667560161046726626984021281807EuAu4cruerlUilEVOAtnrHoJD8eiSgLEb8gV1dwmOVOvuVyLz3YbVM4H/47xacol6QSj9fCc+VKb+0T8280o3Q/QZqwpayHN4b2wSolPTOOa/F+MmYQ//oFFBktruEWCLz2QsRYH3a60QQF9fcOhYXG068lCH2yUnl/83123xM+sVtCFYs=6304CC42';
    const parsed = parse(qr);
    expect(parsed).toEqual(
      expect.objectContaining({
        amount: 10,
        merchant_tax_id: '30620177497',
        cvu: '0000068000000002222956',
        merchant_city: 'VILLA GESELL',
        merchant_name: 'PRUEBA QR DIMO',
        mcc: '5812',
        postal_code: '07165',
      }),
    );
  });

  it('Geopagos Qr static', () => {
    const qr =
      '00020101021130150011coop.sipago5015001130002002001520448165303032540105802AR5912PRUEBAS MODO6006Abasto61041428621705135ffe0b4d44eaf63046D49';
    const parsed = parse(qr);
    expect(parsed).toEqual(
      expect.objectContaining({
        reverse_domain: 'COOP.SIPAGO',
        amount: 0,
        merchant_tax_id: '30002002001',
        merchant_city: 'Abasto',
        merchant_name: 'PRUEBAS MODO',
        mcc: '4816',
      }),
    );
  });
});

describe('Encode Qr', () => {
  // TBD: Remove this test
  it('Mp Qr', () => {
    const qr = encode(
      {
        account_id: 'fa7070cc-266c-44aa-aa0c-5d9900a99b13',
        merchant_tax_id: '20162475860',
        mcc: '9700',
        merchant_name: 'CLAUDIO ARIEL ARONSON',
        merchant_city: 'Ciudad Autonoma',
        reference_label: '***',
      },
      new MpTemplate(),
    );

    expect(qr).toEqual(
      '00020101021243650016COM.MERCADOLIBRE020130636fa7070cc-266c-44aa-aa0c-5d9900a99b1350150011201624758605204970053030325802AR5921CLAUDIO ARIEL ARONSON6015Ciudad Autonoma62070503***6304FCAA',
    );
  });

  it('Encode Generic Emv Qr', () => {
    const qr = encode(
      {
        merchant_tax_id: '123456789',
        mcc: '9700',
        merchant_name: 'MERCHANT NAME',
        merchant_city: 'Provincia de Buenos Aires',
      }
    );

    expect(qr).toEqual(
      '0002010102125204970053030325802AR5913MERCHANT NAME6025Provincia de Buenos Aires6213100912345678963049218',
    );
  });
});
