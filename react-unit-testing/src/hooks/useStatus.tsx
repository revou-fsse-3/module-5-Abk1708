import { useEffect, useState } from "react";

type Props = {
    status: string;
};

const useStatus = ({ status }: Props) => {
    const [statusTag, setStatusTag] = useState<string>("");
    const changeStatus = () => {
        if (status === "active") {
            setStatusTag("Accepted");
        } else {
            setStatusTag("Denied");
        }
    };

    useEffect(() => {
        changeStatus();
    }, [status]);

    return { statusTag };
};

export default useStatus;
