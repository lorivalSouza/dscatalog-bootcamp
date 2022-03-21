import { formatPrice } from '../formaters';
 
describe(' formatPrice for positive number', () => {

    test('formatPrice should format number pt-BR when given 10.1', () => {
        const result = formatPrice(10.1);
       
        expect(result).toEqual('10,10');
      });

      test('formatPrice should format number pt-BR when given 0.1', () => {
        const result = formatPrice(0.1);
       
        expect(result).toEqual('0,10');
      });

});


describe(' formatPrice for non-positive number', () => {

    test('formatPrice should format number pt-BR when given -10.1', () => {
        const result = formatPrice(-10.1);
       
        expect(result).toEqual('-10,10');
      });

      test('formatPrice should format number pt-BR when given 0.0', () => {
        const result = formatPrice(0.0);
       
        expect(result).toEqual('0,00');
      });

});

