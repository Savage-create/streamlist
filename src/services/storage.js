const get=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||"");}catch{return d;}};
const set=(k,v)=>localStorage.setItem(k,JSON.stringify(v));

export const storage={
  recentSearches:()=>get("recentSearches",[]),
  addRecentSearch:(q)=>{
    const xs=get("recentSearches",[]);
    const n=[q,...xs.filter(s=>s.toLowerCase()!==q.toLowerCase())].slice(0,8);
    set("recentSearches",n);
  },
  favorites:()=>get("favorites",[]),
  isFavorite:(id)=>get("favorites",[]).includes(id),
  toggleFavorite:(id)=>{
    const s=new Set(get("favorites",[]));
    s.has(id)?s.delete(id):s.add(id);
    set("favorites",[...s]);
  },
  setLastView:(route)=>set("lastView",{route}),
  lastView:()=>get("lastView",null)
};
