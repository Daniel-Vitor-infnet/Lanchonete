import React from "react";
  import Routes from "./routes";
  import { AppProvider } from "./Context";
  import { ScreenSizeProvider } from "./ScreenSizeContext";
  import "./styles.scss";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

  const queryClient = new QueryClient();

  const App: React.FC = () => (
    <QueryClientProvider client={queryClient}>
      <ScreenSizeProvider>
        <AppProvider>
          <Routes />
        </AppProvider>
      </ScreenSizeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );

  export default App;