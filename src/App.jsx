/** @jsxImportSource @emotion/react */
import * as S from "./style";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getCityRequest, getCountryRequest } from "./api/apis/options";
import { useInput } from "./hooks/useInput";
import { useRadio } from "./hooks/useRadio";
import { deleteBooksRequest, registerUser, searchUserRequest } from "./api/apis/userApi";
import { useSelect } from "./hooks/useSelect";
import { userDownloadExcel } from "./hooks/useDownloadExcel";
import SaveUserInput from "./components/SaveUserInput/SaveUserInput";


function App() {
  const [conutryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [userList, setUserList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [saveUserInputs, setSaveUserInputs] = useState([]);
  // const [addUserNmae, setAddUserNmae] = useState([]);
  // const [addNmae, setAddNmae] = useState([]);
  // const [addGender, setAddGender] = useState([]);
  // const [addCountry, setAddCountry] = useState([]);
  // const [addCity, setAddCity] = useState([]);
  
  // hooks
    // 조회
  const searchUsername = useInput();
  const searchName = useInput();
  const searchGender = useRadio();
  const searchCountry = useSelect();
  const searchCity = useSelect();
    // 저장
  const saveUsername = useInput();
  const saveName = useInput();
  const saveGender = useRadio();
  const saveCountry = useSelect();
  const saveCity = useSelect();

  
  const downloadExcel = userDownloadExcel(userList);


  // 유저 리스트
  const serachUserQuery = useQuery(
    ["serachUserQuery"],
    async () => await searchUserRequest({
      userName: searchUsername.value,
      name: searchName.value,
      gender: searchGender.value,
      countryId: searchCountry.value,
      cityId: searchCity.value,
      startDate: addHoursStartDate,
      endDate: addHoursEndDate
    }),
    {
      onSuccess: response => {
        setUserList(() => response.data.map(user => {
          return {
            ...user,
            checked: false
          }
        }))
        // console.log(response);
      },
      onError: response => {
        console.log(response); 
      },
      retry: 0,
      refetchOnwindowFocus: false
    },
    
  )

  // 나라 옵션 목록
  const countryQuery = useQuery(
    ["countryQuery"],
    getCountryRequest,
    {
      onSuccess: response => {
        setCountryOptions(() => response.data.map(country => {
          return {
            value: country.countryId,
            label: country.countryName
          }
        }))
      },
      retry: 0,
      refetchOnwindowFocus: false
    }
  )

  // 도시 옵션 목록
  const cityQuery = useQuery(
    ["cityQuery", searchCountry.value],
    async () => await getCityRequest({
      selectCountryId: searchCountry.value
    }),
    {
      onSuccess: response => {
        setCityOptions(() => response.data.map(city => {
          return {
            value: city.cityId,
            label: city.cityName
          }
        }))
      },
      retry: 0,
      refetchOnwindowFocus: false
    }
  )



  // 유저 저장 뮤테이션
  const registerUserMutation = useMutation({
    mutationKey: "registerUser",
    mutationFn: registerUser,
    onSuccess: response => {
      alert("추가완료");
    },
    onError: error => {
      console.log(error);
    }
  })

  // 유저 저장
  const handleAddSave = () => {
    saveUserInputs.forEach(input => {
      registerUserMutation.mutate({
        username: input.username,
        name: input.name,
        gender: input.gender,
        country: input.country,
        city: input.city
      });
    });
  };
  

  // 유저 추가 input창
  const handleAddUser = () => {
    if (saveUserInputs.length < 3) {
      setSaveUserInputs([...saveUserInputs, {
        id: Date.now(),
        username: '',
        name: '',
        gender: '',
        country: '0',
        city: '0'
      }]);
    } else {
      alert("최대 3개의 입력 폼만 추가할 수 있습니다.");
    }
  };

  const handleSaveUserInputChange = (i, newDate) => {
    const newInputs = [...saveUserInputs];
    newInputs[i] = newDate;
    setSaveUserInputs(newInputs);
  }

  // 유저 삭제 뮤테이션
  const deleteUserMutation = useMutation({
    mutationKey: "deleteUserMutation",
    mutationFn: deleteBooksRequest,
    onSuccess: response => {
      alert("삭제완료.")
    }
  })

  // 유저 삭제
  const handleDeleteUser = () => {
    const deleteUsers = userList.filter(user => user.checked).map(user => user.userId)
    deleteUserMutation.mutate(deleteUsers);
  }

   

  // UTC 9시간 차로인한 +9시간 해주기
  const addNineHours = (date) => {
    if (date === null || !(date instanceof Date) || isNaN(date)) return null;

    const nineHoursInMilliseconds = 9 * 60 * 60 * 1000;
    return new Date(date.getTime() + nineHoursInMilliseconds);
  };

  const addHoursStartDate = startDate ? addNineHours(new Date(startDate)) : null;
  const addHoursEndDate = endDate ? addNineHours(new Date(endDate)) : null;


  // 조건 검색
  const handleSearchUser = () => {
    if ((startDate && !endDate) || (!startDate && endDate)) {
      alert("시작과 끝 시간 둘다 설정해 주세요");
    }
    serachUserQuery.refetch();
  }


  // 체크 할때 onChange
  const handleCheckOnChange = (e) => {
    const userId = parseInt(e.target.value);

    setUserList(() => 
      userList.map(user => {
        if(user.userId === userId) {
          return {
            ...user,
            checked: e.target.checked
          }
        }
        return user
      })
    )

  }

  console.log(saveUserInputs);

  return (
    <div css={S.layout}>
      <h1>Grid그리드</h1>

      <div css={S.container}>
        {/* head input들*/}
        <div css={S.inputLayout}> 
          <div css={S.inputText}>
            {/* 아이디, 이름 */}
            <input 
              type="text" 
              placeholder="아이디" 
              value={searchUsername.value}
              onChange={searchUsername.handleOnChange}
            />
            <input 
              type="text" 
              placeholder="이름"
              value={searchName.value}
              onChange={searchName.handleOnChange}
            />
          </div>  

          {/* 성별 */}
          <div css={S.inputRadio}>
            <input 
              type="radio"
              name="gender" 
              value="남"
              checked={searchGender.value === "남"}
              onClick={searchGender.handleOnClick}
            />
            남
            <input type="radio"
              name="gender" 
              value="녀"
              checked={searchGender.value === "녀"}
              onClick={searchGender.handleOnClick}
            />
            녀
          </div>
          
          {/* 셀렉 국가,나라 콤보 박스 */}
          <div css={S.selectBox}>
            <select value={searchCountry.value} onChange={searchCountry.handleOnChange}>
              <option value="0">국가(전체)</option>
              {
              conutryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
              }
            </select>
            <select value={searchCity.value} onChange={searchCity.handleOnChange}>
              {
                searchCountry.value === "0" || searchCountry.value === 0 
                ? 
                  <option value="0">도시(전체)</option>
                :
                  <>
                    <option value="0">도시(전체)</option>
                    {
                    cityOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </> 
              }
            </select>
          </div>
          
          {/* 켈린더 버튼 */}
          <div css={S.calendarBox}>
            <DatePicker 
              locale={ko} 
              selected={startDate} 
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="시작"
            />
            <DatePicker 
              locale={ko} 
              selected={endDate} 
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="끝"
            />
          </div>
            
        
        </div>

        {/* 조회, 저장, 엑셀다운, 삭제 button */}
        <div css={S.buttons}>
          <button onClick={() => handleSearchUser()}>조회</button>
          
          <button onClick={() => handleAddUser()}>추가</button>

          <button onClick={() => handleAddSave()}>저장</button>

          <button onClick={() => downloadExcel.handleDownloadExcel()}>엑셀다운</button>

          <button onClick={() => handleDeleteUser()}>삭제</button>
        </div>

        {/* 조회된 리스트 */}
        <div css={S.tableLayout}>
          <table css={S.table}>
            <thead>
              <tr css={S.theadTr}>
                <th><input type="checkbox"/>선택</th>
                <th>아이디</th>
                <th>이름</th>
                <th>성별</th>
                <th>국가</th>
                <th>도시</th>
              </tr>
            </thead>
            <tbody>
              {
                saveUserInputs.map((input, i) => (
                  <SaveUserInput
                    key={input.id}
                    data={input}
                    onChange={((newDate) => handleSaveUserInputChange(i, newDate))}
                  />
                ))
              }
              {
              userList.map(user => (
                <tr key={user.userId}>
                  <td>
                    <input
                      type="checkbox"
                      value={user.userId}
                      checked={user.checked}
                      onChange={handleCheckOnChange}
                    />
                  </td>
                  <td>{user.userName}</td>
                  <td>{user.name}</td>
                  <td>{user.gender}</td>
                  <td>{user.countryName}</td>
                  <td>{user.cityName}</td>
                </tr>
              ))
              }
            </tbody>  
          </table>        
        </div>

      </div>
    </div>
  );
}

export default App;
