// import RegisterPage from "@/pages/RegisterPage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import WeatherPage from "@/pages/WeatherPage.tsx";
import MainPage from "./pages/MainPage";
// import ProtectLayout from "./layouts/ProtectedLayout";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<WeatherPage />} />
                    <Route path="/home" element={<MainPage />} />
                    {/* <Route path="/login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route element={<ProtectLayout />}>
                        <Route path="/weather" element={<WeatherPage />} />
                    </Route> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

// eslint-disable-next-line no-irregular-whitespace
export default App;
