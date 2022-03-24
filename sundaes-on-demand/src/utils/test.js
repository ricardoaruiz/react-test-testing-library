// https://testing-library.com/docs/react-testing-library/setup#:~:text=The%20example%20below%20sets%20up%20data%20providers%20using%20the%20wrapper%20option%20to%20render.
import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../context/OrderDetailsContext";

const renderWithContext = (ui, options) => {
  render(ui, { wrapper: OrderDetailsProvider, ...options });
};

export * from "@testing-library/react";

export { renderWithContext };
