import { RouterProvider } from "react-router-dom";
import route from "./Router/Route";
function App() {
  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  );
}

export default App;
