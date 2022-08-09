import React from "react";

const Page = ({ list, page, setPage }) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  //   const { list, page } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div>
      <button
        onClick={() =>
          setPage(list.start - list.size >= 1 ? list.start - list.size : page)
        }
      >
        이전
      </button>

      {list &&
        list.pageList.map((listPage) => {
          return (
            <span
              className={page === listPage ? "pageNum" : "pageOut"}
              onClick={() => {
                setPage(listPage);
              }}
              key={listPage}
            >
              {listPage}
            </span>
          );
        })}
      <button
        onClick={() =>
          setPage(
            list.start + list.size > list.totalPage
              ? page
              : list.start + list.size
          )
        }
      >
        다음
      </button>
    </div>
  );
};

export default Page;
