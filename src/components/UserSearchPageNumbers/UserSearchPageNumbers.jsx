/** @jsxImportSource @emotion/react */
import * as S from "./style";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function UserSearchPageNumbers({ userCount }) {
  const [ searchParams ] = useSearchParams();
  const page = parseInt(searchParams.get("page"));
  const [ numbers, setNumbers ] = useState([]);
  const maxPageNumber = userCount.maxPageNumber;

  useEffect(() => {
    const startPageNumber = page % 10 === 0 ? page - 9 : (page - (page % 10)) + 1;
    const endPageNumber = startPageNumber + 9 > maxPageNumber ? maxPageNumber : startPageNumber + 9;
    let pageNumbers = [];

    for(let i = startPageNumber; i <= endPageNumber; i++) {
        pageNumbers = [...pageNumbers, i];
    }

    setNumbers(() => pageNumbers);
  }, [page, userCount])

  

  return (
    <div css={S.layout}>
      <div css={S.pageNumbers}>
      {
        page !== 1 ?
          <Link 
              css={S.pageButton(false)}
              to={`/user/management?page=${page - 1}`}
          >&#60;</Link>
        :
          <Link
            css={S.pageButton(false)}
            to={`/user/management?page=1`}
          >
          &#60;
          </Link>
      }
      {
        numbers.map(number =>
            <Link key={number} css={S.pageButton(number === page)} to={`/user/management?page=${number}`}>{number}</Link>
        )
      }
      {
        page !== maxPageNumber ?
          <Link 
            css={S.pageButton(false)}
            to={`/user/management?page=${page + 1}`}
          >&#62;
          </Link>
        :
          <Link 
            css={S.pageButton(false)}
            to={`/user/management?page=${maxPageNumber}`}
          >&#62;
          </Link>
      }
      </div>
    </div>
  )
}

export default UserSearchPageNumbers
