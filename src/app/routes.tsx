import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/HomePage";
import { CataloguePage } from "./pages/CataloguePage";
import { EpochDetailPage } from "./pages/EpochDetailPage";
import { QuizPage } from "./pages/QuizPage";
import { CartPage } from "./pages/CartPage";
import { ProfilePage } from "./pages/ProfilePage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "catalogue", Component: CataloguePage },
      { path: "epoch/:id", Component: EpochDetailPage },
      { path: "quiz", Component: QuizPage },
      { path: "cart", Component: CartPage },
      { path: "profile", Component: ProfilePage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);