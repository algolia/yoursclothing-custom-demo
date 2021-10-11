import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// ALGOLIA'S IMPORT
import {
    connectSearchBox,
    VoiceSearch,
    connectCurrentRefinements
} from 'react-instantsearch-dom';
import { getQuery, getInput } from '../../actions/getQuery';
import {
    searchVisible,
    federatedSearchVisible
} from '../../actions/visibility';



const SearchBox = ({ refine }) => {
    const dispatch = useDispatch();
    const { query, input } = useSelector(state => state.getQuery);
    const inputRef = useRef();
    return (
      
            <div className="searchBox-wrapper">
                <form
                    action=""
                    role="search"
                    onSubmit={e => {
                        e.preventDefault();
                        dispatch(federatedSearchVisible(false));
                        dispatch(searchVisible(true));
                        dispatch(getQuery(query));
                    }}
                    autocomplete="off"
                >
                    <input
                        id="input-search2"
                        ref={inputRef}
                        type="search"
                        value={query}
                        onChange={event => {
                            console.log(event.currentTarget.value);
                            dispatch(getQuery(event.currentTarget.value));
                            refine(event.currentTarget.value);
                        }}
                        // onInput={event => {
                        //     dispatch(getQuery(event.currentTarget.value))
                        //     query ? refine(query) : refine(event.currentTarget.value)
                        // }}
                        placeholder="Search..."
                        autoFocus="true"
                    />
                    <svg
                        viewBox="0 0 897 897"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M357.982 142.492C236.887 142.492 138.404 241.174 138.404 362.265C138.404 483.356 236.887 581.843 357.982 581.843C479.077 581.843 577.755 483.356 577.755 362.265C577.755 241.174 479.077 142.492 357.982 142.492ZM357.982 182.008C457.701 182.008 538.239 262.551 538.239 362.265C538.239 461.977 457.701 542.327 357.982 542.327C258.264 542.327 177.921 461.977 177.921 362.265C177.921 262.551 258.264 182.008 357.982 182.008Z"
                            fill="#030A2B"
                        />
                        <path
                            d="M501.254 479.455C497.515 479.851 493.966 481.307 491.024 483.649C488.082 485.99 485.868 489.122 484.643 492.676C483.417 496.231 483.23 500.06 484.103 503.717C484.976 507.375 486.874 510.708 489.574 513.326L671.582 695.334C673.386 697.323 675.575 698.924 678.017 700.039C680.459 701.155 683.103 701.764 685.787 701.825C688.471 701.886 691.139 701.399 693.63 700.395C696.12 699.392 698.38 697.893 700.271 695.988C702.163 694.083 703.647 691.812 704.634 689.315C705.62 686.818 706.087 684.145 706.007 681.461C705.928 678.778 705.302 676.14 704.17 673.705C703.037 671.271 701.421 669.092 699.419 667.303L517.411 485.294C515.33 483.169 512.797 481.539 509.999 480.528C507.202 479.517 504.213 479.151 501.254 479.455Z"
                            fill="#030A2B"
                        />
                    </svg>
                </form>
                {/* <VoiceSearch searchAsYouSpeak={false} language={'en-US'} /> */}
            </div>
          
        
    );
};



const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
