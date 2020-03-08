import newsActionTypes from './news.types';

const initialState = {
    newsList: null,
    isFetchingNewsAll: false,
    errorNewsAll: '',
    newsItem: null,
    isFetchingNews: false,
    errorNews: '',
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
    case newsActionTypes.FETCH_ALL_NEWS_START:
        return { ...state, isFetchingNewsAll: true };
    case newsActionTypes.FETCH_ALL_NEWS_SUCCESS:
        return { ...state, newsList: action.payload, isFetchingNewsAll: false, errorNewsAll: '' };
    case newsActionTypes.FETCH_ALL_NEWS_FAILURE:
        return { ...state, errorNewsAll: action.payload, isFetchingNewsAll: false };
    case newsActionTypes.FETCH_NEWS_START:
        return { ...state, isFetchingNews: true };
    case newsActionTypes.FETCH_NEWS_SUCCESS:
        return { ...state, newsItem: action.payload, isFetchingNews: false, errorNews: '' };
    case newsActionTypes.FETCH_NEWS_FAILURE:
        return { ...state, errorNews: action.payload, isFetchingNews: false };
    default:
        return state;
    }
};

export default newsReducer;
