export const getIsLogged = state => state.auth;

export const getAdverts = state => state.adverts.data.filter((data) => { return data });

export const getAdvert = (state, advertId) => state.adverts.data.find(advert => advert.id === advertId);

export const getTags = state => state.tags.data.filter((data) => { return data });

export const getUi = state => state.ui;

