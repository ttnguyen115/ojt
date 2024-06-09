import { useSelector } from "react-redux";

// helpers
import { mapDuckEggsToPage } from "@/helpers";

// ducks
import exampleDuckCreator from "@/ducks/exampleDuckCreator";

// hooks
import useCustomNavigation from "@/hooks/useCustomNavigation";

const SearchCarResults = ({ title }) => {

    const { chickens = [], birds = [] } = useSelector(exampleDuckCreator.selectors.getAnimalsWithTwoFeet);

    const navigateToPage = useCustomNavigation();

    const handleClick = () => {
        navigateToPage({ query: "123" });
    };

    return (
        <>
            <h1>{title}</h1>
            <div>Chickens</div>
            <ul>
                {chickens.map((chicken) => (
                    <li key={chicken.id}>{chicken.label}</li>
                ))}
            </ul>
            <div>Birds</div>
            <ul>
                {birds.map((bird) => (
                    <li key={bird.id}>{bird.label}</li>
                ))}
            </ul>
            <button onClick={handleClick}>Click</button>
        </>
    );
};

SearchCarResults.getInitialProps = async (context) => {
    return { title: "SearchCarResults" };
};

const { WrappedPage } = mapDuckEggsToPage(SearchCarResults, {
    // Only add reducers which are only used in this PageComponent
    // exampleDuckCreator had called API and wrapped as a global reducer
    reducers: [],
});

export default WrappedPage;
