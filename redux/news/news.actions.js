import newsActionTypes from './news.types';

export const fetchAllNewsStart = (range) => ({
    type: newsActionTypes.FETCH_ALL_NEWS_START,
    payload: range
});

export const fetchAllNewsSuccess = (newsList) => ({
    type: newsActionTypes.FETCH_ALL_NEWS_SUCCESS,
    payload: newsList
});

export const fetchAllNewsFailure = (err) => ({
    type: newsActionTypes.FETCH_ALL_NEWS_FAILURE,
    payload: err
});

export const fetchNewsStart = (id) => ({
    type: newsActionTypes.FETCH_NEWS_START,
    payload: id
});

export const fetchNewsSuccess = (newsItem) => ({
    type: newsActionTypes.FETCH_NEWS_SUCCESS,
    payload: newsItem
});

export const fetchNewsFailure = (err) => ({
    type: newsActionTypes.FETCH_NEWS_FAILURE,
    payload: err
});


