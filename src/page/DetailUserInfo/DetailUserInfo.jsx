/** @jsxImportSource @emotion/react */
import { useSearchParams } from "react-router-dom";
import { searchUserRequest } from "../../api/apis/userApi";
import * as S from "./style";
import { useState } from "react";
import { useQuery } from "react-query";

function DetailUserInfo() {
  const [ searchParams, setSearchParams ] = useSearchParams(); 
  const [ userInfo, setUserInfo ] = useState();

  const searchUserQuery = useQuery(
    ["searchUserQuery", searchParams.get("username")],
    async () => await searchUserRequest({
      page: 1,
      count: 5,
      userName: searchParams.get("username"),
      name: "",
      gender: "",
      countryId: 0,
      selectedCitiesList: [],
      startDate: null,
      endDate: null
    }),
    {
      onSuccess: response => {
        console.log(response);
        
        setUserInfo(() => response.data)
      },
      retry: 0,
      refetchOnWindowFocus: false
    }
  )

  // console.log(userInfo[0].userId);
  



  return (
    <div css={S.layout}>
      <div css={S.container}>

      <div css={S.tableLayout}>
        <table css={S.table}>
          <thead>
            <tr>
              <th rowspan="2">NO.</th>
              <th rowspan="2">아이디</th>
              <th rowspan="2">이름</th>
              <th rowspan="2">성별</th>
              <th colSpan="2">장소</th>  
            </tr>
            <tr>
              <th>국가</th>
              <th>도시</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {
                userInfo &&
                <>
                  <td>{userInfo[0].userId}</td>
                  <td>{userInfo[0].userName}</td>
                  <td>{userInfo[0].name}</td>
                  <td>{userInfo[0].gender}</td>
                  <td>{userInfo[0].countryName}</td>
                  <td>{userInfo[0].selectedCities.map(city => city.cityName).join(", ")}</td>
                </>
              }
            </tr>
          </tbody>


        </table>
      </div>        





      </div>
    </div>
  )
}

export default DetailUserInfo
