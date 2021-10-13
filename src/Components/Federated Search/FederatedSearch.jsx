import React from "react";
import { useSelector, useDispatch } from "react-redux";

// ALGOLIA IMPORT
import {
  Configure,
  Index,
  QueryRuleCustomData,
  connectQueryRules,
  connectStateResults,
} from "react-instantsearch-dom";

// COMPONENT IMPORT
import { CustomHits } from "../Searchpage/Hits";
import { StoreQueryToLocalStorage } from "../Searchpage/SearchBox";
import CustomSuggestions from "../Searchpage/Suggestions";
import { CarouselHome } from "../Homepage/Carousel";
import {
    federatedSearchVisible,
    searchVisible
} from '../../actions/visibility';
import { getQuery } from '../../actions/getQuery';

const FederatedSearch = () => {
  const { persona } = useSelector((state) => state.selectedPersona);
  return (
    <div className="federatedSearch">
      <div className="federatedSearch-wrapper">
        <div className="federatedSearch-recentSearches">
          <RecentSearches />
          <ContentInjected />
        </div>

        <div className="federatedSearch-products">
          <div className="product-federated-header">
            {/* <CustomSearchBox /> */}
            <ResultsTitle>
              <h3 className="federated-title">Products</h3>
            </ResultsTitle>
          </div>
          <Configure hitsPerPage={200} userToken={persona} />
          <Results>
            <CustomHits />
          </Results>
        </div>
        <div className="federatedSearch-suggestions">
          <ResultsTitle>
            <h3>Suggestions</h3>
          </ResultsTitle>
          <Index indexName={window.indexSugg} indexId="suggestions">
            <Configure hitsPerPage={6} userToken={persona} />
            <CustomSuggestions />
          </Index>
        </div>
      </div>
    </div>
  );
};

const RecentSearches = () => {
  const dispatch = useDispatch()
  const getSearches = localStorage.getItem("recentSearches");
  const cleanSearches = JSON.parse(getSearches);
  if (cleanSearches) {
    return (
      <>
        <h3 className="federated-title">Recent Searches</h3>
        <div className="federatedSearch-recentSearches_items">
          {cleanSearches.map((search, index) => {
            return <p   onClick={e => {
                dispatch(getQuery(search));
                dispatch(searchVisible(true));
                dispatch(federatedSearchVisible(false));
            }} key={index}>{search}</p>;
          })}
        </div>
      </>
    );
  } else {
    return "";
  }
};

const InjectedContent = ({ items }) => {
  return (
    <div className="injectedContent__wrapper">
      {items.map(({ button, img, target, titleContent }) => {
        if (titleContent) {
          return (
            <div className="injected-content">
              <img src={img} alt={titleContent} />
              <h3>{titleContent}</h3>
              <a href={target}>{button}</a>
            </div>
          );
        }
      })}
    </div>
  );
};

const ContentInjected = connectQueryRules(InjectedContent);

const Results = connectStateResults(
  ({ searchState, searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
      <div className="no-results-hits">
        <h3>NO RESULTS FOUND for {searchState.query}.</h3>
        <p>You can look at our product suggestion below </p>
        <CarouselHome />
      </div>
    )
);

const ResultsTitle = connectStateResults(({ searchResults, children }) =>
  searchResults && searchResults.nbHits !== 0 ? children : ""
);

export default FederatedSearch;
