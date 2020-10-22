import Home from "./components/Home";
import frontRoutes from "../helpers/front-routes";
import AboutUsPage from "./components/AboutUsPage";
import ContactUsPage from "./components/ContactUsPage";

frontRoutes("/", Home);
frontRoutes("/about-us", AboutUsPage);
frontRoutes("/contact-us", ContactUsPage);