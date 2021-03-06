import React from "react";
import { useSelector, useDispatch } from "react-redux";

// COMPONENT IMPORT

import { CustomSearchBox } from "../Searchpage/SearchBox";
import logo from "../../Assets/Images/logo.png";
import headerList from "../../Assets/Images/headerList.png";
import { VoiceSearch } from "react-instantsearch-dom";

// import headerUp from '../../Assets/Images/headerUp.png';
import SelectPersona from "./Persona";
import {
  searchVisible,
  federatedSearchVisible,
  catOne,
  catTwo,
} from "../../actions/visibility";
import { getQuery } from "../../actions/getQuery";

import { motion } from "framer-motion";

import { showRecommendations } from "../../actions/productDetail";

const Header = () => {
  const federatedSearchVisibleSelector = useSelector(
    (state) => state.visibility.federatedSearchVisible
  );

  const dispatch = useDispatch();
  const homepageSelector = useSelector((state) => state.visibility.homepage);
  // const catKidsSelector  = useSelector(state => state.visibility.catKids)
  // const catMensSelector  = useSelector(state => state.visibility.catMens)
  const catTwoSelector = useSelector((state) => state.visibility.catTwo);
  const catOneSelector = useSelector((state) => state.visibility.catOne);
  const searchVisibleSelector = useSelector(
    (state) => state.visibility.searchVisible
  );

  if (federatedSearchVisibleSelector) {
    document.body.classList.add("stop-scrolling");
  } else {
    document.body.classList.remove("stop-scrolling");
  }
  return (
    <header className="header">
      <div className="header-wrapper">
        <div
          className="search-wrapper"
          onClick={(e) => {
            if (
              // catMensSelector ||
              // catKidsSelector ||
              homepageSelector ||
              catOneSelector ||
              catTwoSelector
            ) {
              dispatch(federatedSearchVisible(true));
            }
            if (searchVisibleSelector) {
              dispatch(federatedSearchVisible(false));
            }
          }}
        >
          <CustomSearchBox />
        </div>
        <div className="header__logo">
          <img
            src={logo}
            alt="logo"
            className="logo"
            onClick={() => {
              dispatch(catOne(false));
              dispatch(searchVisible(false));
              dispatch(catTwo(false));
              // dispatch(catMens(false))
              // dispatch(catKids(false))
              dispatch(federatedSearchVisible(false));
              dispatch(showRecommendations([]));
            }}
          />
          <h3>
            27 years of <span>loving curves</span>
          </h3>
        </div>
        <div
          className="list-img-wrapper"
          onClick={() => {
            dispatch(federatedSearchVisible(false));
            dispatch(getQuery(""));
          }}
        >
         <a
            className="nav-links"
            onClick={(e) => {
            e.preventDefault();
            dispatch(catOne(true));
            dispatch(searchVisible(false));
            dispatch(catTwo(false));
            dispatch(federatedSearchVisible(false));
            }}
          >
            ACCESSORIES
          </a>
          <img className="headerList" src={headerList} alt="headerList" />
          <SelectPersona />

          {/* <ul>
            <li
              onClick={() => {
                dispatch(catOne(true));
                dispatch(searchVisible(false));
                dispatch(catTwo(false));
                // dispatch(catMens(false))
                // dispatch(catKids(false))
                dispatch(federatedSearchVisible(false));
                dispatch(getQuery(""));
              }}
            >
              CAT ONE
            </li>
            <li
              onClick={() => {
                dispatch(catOne(false));
                dispatch(searchVisible(false));
                dispatch(catTwo(true));
                // dispatch(catMens(false))
                // dispatch(catKids(false))
                dispatch(federatedSearchVisible(false));
                dispatch(getQuery(""));
              }}
            >
              CAT TWO
            </li>
            <li
              className="design"
              onClick={() => {
                dispatch(catOne(false));
                dispatch(searchVisible(false));
                dispatch(catTwo(false));
                // dispatch(catMens(true))
                // dispatch(catKids(false))
                dispatch(federatedSearchVisible(false));
                dispatch(getQuery(""));
              }}
            >
              CAT 3
            </li>
            <li
              onClick={() => {
                dispatch(catOne(false));
                dispatch(searchVisible(false));
                dispatch(catTwo(false));
                // dispatch(catMens(false))
                // dispatch(catKids(true))
                dispatch(federatedSearchVisible(false));
                dispatch(getQuery(""));
              }}
            >
              CAT 4
            </li>
            <li>CAT 5</li>
            <li>CAT 6</li>
            <li className="promo">CAT 7</li>
            <li>
              <SelectPersona />
            </li>
          </ul> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
