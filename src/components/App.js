import '../css/App.css'
import Header from './Header';
import SearchBar from './SearchBar';
import axios from 'axios'
import { useEffect, useState } from 'react';
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ResultContainer from './ResultContainer';
import Question from '../singletons/Question';
import TopResultsContainer from './TopResultsContainer';

const serverURL = "https://localhost:7248/api.micro-asking.ask";

const PageTypeEnum = {
  MainPage: 0,
  ResultPage: 1
}

function App() {
  const [pageType, setPageType] = useState(PageTypeEnum.MainPage);
  const [loading, setLoading] = useState(false);
  const [topResults, setTopResults] = useState([]);
  const [results, setResults] = useState([]);
  const [searchWord, setSearchWord] = useState(Question.Instance.getData());

  useEffect(() => {
    const getTopResults = async () => {
      try {
        const respone = await axios.get(serverURL + "/statistics/get-top-questions");
        setTopResults(respone.data);
      } catch (error) {
        alert(error);
      }
    }
    getTopResults();

  }, []);

  const askQuestion = async () => {
    setLoading(true);
    changeSearchWord(Question.Instance.getData());
    try {
      const respone = await axios.get(serverURL + "/ask/" + Question.Instance.getData());
      setResults(respone.data.answers);
      setLoading(false);
      setPageType(PageTypeEnum.ResultPage);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  }

  const changeSearchWord = (data) => {
    setSearchWord(data);
  }

  return (
    <div className="app">
      <div className='background'></div>
      {pageType === PageTypeEnum.MainPage && <Header />}
      {pageType === PageTypeEnum.ResultPage &&
        <div className="contentContainer">
          <TopResultsContainer topResults={topResults} askQuestion={askQuestion} />
          <div className='seperator' />
          <ResultContainer results={results} />
        </div>
      }
      <SearchBar askQuestion={askQuestion}
        searchWord={searchWord}
        changeSearchWord={changeSearchWord} />
      {loading && <CircularProgress className='circle-loading' color="success" />}

    </div>
  );
}

export default App;
