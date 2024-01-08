describe('Regular Expressions', () => {
  describe('EMAIL_REGEXP', () => {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    it('Подтверждение правильных адресов почты', () => {
      expect(EMAIL_REGEXP.test('test@example.com')).toBeTruthy();
      expect(EMAIL_REGEXP.test('user.name@domain.co')).toBeTruthy();
      expect(EMAIL_REGEXP.test('test@test.ru')).toBeTruthy();
      expect(EMAIL_REGEXP.test('t@t.ru')).toBeTruthy();
      expect(EMAIL_REGEXP.test('!@!.ruru')).toBeTruthy();
    });

    it('Подтверждение некоректных адресов почты', () => {
      expect(EMAIL_REGEXP.test('test@example')).toBeFalsy();
      expect(EMAIL_REGEXP.test('test@.com')).toBeFalsy();
      expect(EMAIL_REGEXP.test('@.com')).toBeFalsy();
      expect(EMAIL_REGEXP.test('test@.')).toBeFalsy();
      expect(EMAIL_REGEXP.test('test.com')).toBeFalsy();
    });
  });

  describe('PASSWORD_REGEXP', () => {
    const PASSWORD_REGEXP = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?()]).*/;

    it('Подтверждение валидных значений пароля', () => {
      expect(PASSWORD_REGEXP.test('Password1!')).toBeTruthy();
      expect(PASSWORD_REGEXP.test('Another$Password123')).toBeTruthy();
      expect(PASSWORD_REGEXP.test('123456qwe!Q')).toBeTruthy();
      expect(PASSWORD_REGEXP.test('123456aA!')).toBeTruthy();
    });

    it('Подтверждение невалидных значений пароля', () => {
      expect(PASSWORD_REGEXP.test('short')).toBeFalsy();
      expect(PASSWORD_REGEXP.test('nouppercase123!')).toBeFalsy();
      expect(PASSWORD_REGEXP.test('withoutSymbolAndNumber!')).toBeFalsy();
      expect(PASSWORD_REGEXP.test('ONLYAPPERCASE!1')).toBeFalsy();
      expect(PASSWORD_REGEXP.test('!!!!!!!!!!')).toBeFalsy();
      expect(PASSWORD_REGEXP.test('12345678')).toBeFalsy();
      expect(PASSWORD_REGEXP.test('123456aA')).toBeFalsy();
      expect(PASSWORD_REGEXP.test('123456a!')).toBeFalsy();
    });
  });
});

export {};
