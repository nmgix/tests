import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from "src/shared/ui/fallback/fallback";
import { store } from "../store";
import { Provider } from "react-redux";
import { DebugProvider } from "src/entities/debug";

interface IProviders {
  /** Content that will be wrapped by providers. */
  readonly children: JSX.Element;
}

export const Providers: React.FC<IProviders> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <Provider store={store}>
        <DebugProvider>{children}</DebugProvider>
      </Provider>
    </ErrorBoundary>
  );
};
