import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function useCustomNavigation() {
    const dispatch = useDispatch();
    const router = useRouter();

    const navigateToPage = ({ url, query }) => {
        let customUrl = url;

        if (!customUrl) customUrl = getPath("/route", { ...query }, {});

        router.push(customUrl);
    };

    return navigateToPage;
}

const getPath = (pageName, query = {}, options = {}) => {
    return pageName + "/";
};
