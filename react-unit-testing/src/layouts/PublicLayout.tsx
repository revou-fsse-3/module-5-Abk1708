import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/navbar";

const PublicLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default PublicLayout;
