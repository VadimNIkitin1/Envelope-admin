import reducer, {
  toggleTabs,
  toggleTheme,
  triggerRender,
  toggleRecipient,
  toggleLanguage,
} from './activeSlice';

const initialState = {
  active: '',
  theme: false,
  render: false,
  recipient: '',
  language: '',
};

describe('Тест синхронных редьюсеров в activeSilce', () => {
  it('Смена активного таба', () => {
    const newState = reducer(initialState, toggleTabs('products'));

    expect(newState.active).toBe('products');
  });

  it('Проверка на коректную обработку при попадании null', () => {
    const newState = reducer(initialState, toggleTabs(null));

    expect(newState.active).toBe(null);
  });

  it('Смена активного таба на некорректное значение', () => {
    const newState = reducer(initialState, toggleTabs('unknownTab'));

    expect(newState.active).toBe('unknownTab');
  });

  it('Смена активного таба на некорректное значение', () => {
    const newState = reducer(initialState, toggleTabs('products'));

    expect(newState.active).not.toBe('unknownTab');
  });

  it('Передача несуществующего экшена', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const newState = reducer(initialState, unknownAction);

    expect(newState).toEqual(initialState);
  });

  it('Смена темы', () => {
    const newState = reducer(initialState, toggleTheme());

    expect(newState.theme).toBe(true);
  });

  it('Ререндер', () => {
    const newState = reducer(initialState, triggerRender());

    expect(newState.render).toBe(true);
  });

  it('Выбор получателей сообщения', () => {
    const newState = reducer(initialState, toggleRecipient('recipient'));

    expect(newState.recipient).toBe('recipient');
  });

  it('Смена языка', () => {
    const newState = reducer(initialState, toggleLanguage('rus'));

    expect(newState.language).toBe('rus');
  });
});

describe('Проверка на коректную обработку некорректных данных в toggleTabs', () => {
  const invalidData = [undefined, null, 1, [], {}];

  invalidData.forEach((data) => {
    it(`Проверка на коректную обработку при попадании ${typeof data}`, () => {
      const newState = reducer(initialState, toggleTabs(data));
      expect(newState.active).not.toBe('products');
    });
  });
});

export {};
