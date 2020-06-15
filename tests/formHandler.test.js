import { handleSubmit } from '../src/client/js/formHandler';
import { urlValidation } from '../src/client/js/urlValidation';

test('test func', () => {
    expect(handleSubmit).toBeDefined();
});

test('check url validation', () => {
    expect(urlValidation('https://www.google.com')).toBe(true);
    expect(urlValidation('notaurl')).toBe(false);
});