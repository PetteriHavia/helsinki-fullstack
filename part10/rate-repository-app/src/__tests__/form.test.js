import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import SignIn from "../components/SignIn"
import useSignIn from '../components/hooks/useSignIn';
import { useNavigate } from 'react-router-native';
// ...
jest.mock("../components/hooks/useSignIn")
jest.mock("react-router-native", () => ({
  useNavigate: jest.fn()
}))

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {

      const mockSignIn = jest.fn()
      const mockNavigate = jest.fn()

      useSignIn.mockReturnValue([mockSignIn])
      useNavigate.mockReturnValue(mockNavigate)
      render(<SignIn />)

      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
      fireEvent.press(screen.getByText('Sign in'));

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledTimes(1);
        expect(mockSignIn).toHaveBeenCalledWith({ username: "kalle", password: "password" })
      });
    });
  });
});