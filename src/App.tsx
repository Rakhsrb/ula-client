import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import Collections from "./pages/Collections";
import CollectionDetail from "./pages/CollectionDetail";
import BookDetail from "./pages/BookDetail";
import Units from "./pages/Units";
import UnitDetail from "./pages/UnitDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Collections />,
        },
        {
          path: ":collectionName",
          element: <CollectionDetail />,
        },
        {
          path: ":collectionName/:bookName",
          element: <BookDetail />,
        },
        {
          path: ":collectionName/:bookName/:level",
          element: <Units />,
        },
        {
          path: ":collectionName/:bookName/:level/:unitId",
          element: <UnitDetail />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
