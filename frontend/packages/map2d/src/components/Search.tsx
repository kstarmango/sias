import "ol/ol.css";

export const Search = () => {

  return (
    <div className="location-search">
      <input type="text" id="searchInput" placeholder="검색어를 입력하세요" />
      <button type="button" className="button common-search selected"></button>
      <button type="button" className="button detail-search"></button>
    </div>
  );
}
