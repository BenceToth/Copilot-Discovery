import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Register from "./Register";

test("renders Register component without crashing", () => {
  render(<Register />);
});

test("username validation works correctly", () => {
  const { getByLabelText, queryByText } = render(<Register />);
  const usernameInput = getByLabelText("Username");

  fireEvent.change(usernameInput, { target: { value: "test" } });
  expect(queryByText("Invalid username")).toBeInTheDocument();

  fireEvent.change(usernameInput, { target: { value: "Test@1234" } });
  expect(queryByText(/Invalid username/i)).not.toBeInTheDocument();
});

test("mobile validation works correctly", () => {
  const { getByLabelText, queryByText } = render(<Register />);
  const mobileInput = getByLabelText(/UK Mobile Number/i);

  fireEvent.change(mobileInput, { target: { value: "1234567890" } });
  expect(queryByText(/Invalid mobile number/i)).toBeInTheDocument();

  fireEvent.change(mobileInput, { target: { value: "07123456789" } });
  expect(queryByText(/Invalid mobile number/i)).not.toBeInTheDocument();
});
