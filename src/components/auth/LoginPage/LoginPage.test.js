import { fireEvent, render } from '@testing-library/react';
import { LoginPage } from './LoginPage';

describe('LoginPage', () => {
  test('snapshot', () => {
    const { container } = render(<LoginPage onLogin={() => { }} />);
    expect(container).toMatchSnapshot();
  });

  test('should reset error', () => {
    const error = { message: 'Netwrok error' };
    const resetError = jest.fn();
    const onLogin = () => { };

    const { getByText } = render(
      <LoginPage onLogin={onLogin} error={error} resetError={resetError} />,
    );

    const errorField = getByText(error.message);
    fireEvent.click(errorField);
    expect(resetError).toHaveBeenCalled();
  });
});
