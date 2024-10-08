/** @jsxImportSource @emotion/react */
import * as S from "./style";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { deleteBooksRequest, getUserCountRequest, registerUser, searchUserRequest } from '../../api/apis/userApi'
import { getCityRequest, getCountryRequest } from "../../api/apis/options";
import { useInput } from '../../hooks/useInput'
import { useRadio } from '../../hooks/useRadio'
import { useSelect } from "../../hooks/useSelect";
import { userDownloadExcel } from "../../hooks/useDownloadExcel";
import SaveUserInput from "../../components/SaveUserInput/SaveUserInput";
import PopupUserEdit from "../../components/PopupUserEdit/PopupUserEdit";
import CitySelector from "../../components/CitySelector/CitySelector";
import UserSearchPageNumbers from "../../components/UserSearchPageNumbers/UserSearchPageNumbers";
import { useSearchParams } from "react-router-dom";
import { useChooseLanguage } from "../../hooks/useChooseLanguage";


function UserManagement() {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const searchCount = 5;
  const [conutryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [userList, setUserList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [saveUserInputs, setSaveUserInputs] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modifyUser, setModifyUser] = useState();
  const [selectedCities, setSelectedCities] = useState([]);

  

  // 유저 리스트
  const serachUserQuery = useQuery(
    ["serachUserQuery", searchParams.get("page")],
    async () => await searchUserRequest({
      page: searchParams.get("page"),
      count: searchCount,
      userName: searchUsername.value,
      name: searchName.value,
      gender: searchGender.value,
      countryId: searchCountry.value,
      selectedCitiesList: selectedCities.map(city => city.cityId).join(","),
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
      },
      onError: response => {
        // console.log(response);
      },
      retry: 0,
      refetchOnwindowFocus: false
    },
  )

  // 페이징을 위한 갯수 불러오기
  const getUserCountQuery = useQuery(
    ["getUserCountQuery", serachUserQuery.data],
    async () => await getUserCountRequest({
      count: searchCount,
      userName: searchUsername.value,
      name: searchName.value,
      gender: searchGender.value,
      countryId: searchCountry.value,
      selectedCitiesList: selectedCities.map(city => city.cityId).join(","),
      startDate: addHoursStartDate,
      endDate: addHoursEndDate
    }),
    {
      refetchOnWindowFocus: false,
      onSuccess: response => {
        console.log(response);
        
      }
    }
  )

  

  // 조건 검색
  const handleSearchUser = () => {
    if ((startDate && !endDate) || (!startDate && endDate)) {
      alert("시작과 끝 시간 둘다 설정해 주세요");
    }
    setSearchParams({
      page: 1
    })
    serachUserQuery.refetch();
  };

  // hooks
  const searchUsername = useInput();
  const searchName = useInput();
  const searchGender = useRadio("", handleSearchUser); // 콜백 함수 추가
  const searchCountry = useSelect();
  const searchCity = useSelect();
  const downloadExcel = userDownloadExcel(userList);
  const selectLanguage = useChooseLanguage("한글");
  
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
            cityId: city.cityId,
            cityName: city.cityName
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
      serachUserQuery.refetch();
    },
    onError: error => {
      // alert(error.response.data);
    }
  })

  // input에 중복된 username 확인 
  const checkForDuplicateUsernames = (inputs) => {
    const usernameSet = new Set();
    for (const input of inputs) {
        if (usernameSet.has(input.username)) {
            return true;
        }
        usernameSet.add(input.username);
    }
    return false;
  };

  // 유저 저장하기
  const handleAddSave = async () => {
    // 입력 값 중 하나라도 비어 있는지 확인
    const hasEmptyFields = saveUserInputs.some(input => 
      !input.username || !input.name || !input.gender || input.country === '0' || input.city === '0'
    );

    if (hasEmptyFields) {
      alert("값을 다 입력해 주세요.");
      return;
    }

    const duplicateUsernames = checkForDuplicateUsernames(saveUserInputs);

    if (duplicateUsernames) {
      alert("중복된 아이디가 있습니다.");
      return;
    }

    try {
        await registerUserMutation.mutateAsync(saveUserInputs);
        setSaveUserInputs([]);
    } catch (error) {
        alert("중복된 아이디가 있습니다.");
    }
};
  

  // 유저 추가 input창
  const handleAddUser = () => {
    if (saveUserInputs.length < 3) {
      setSaveUserInputs([...saveUserInputs, {
        id: Date.now(),
        username: '',
        name: '',
        gender: '',
        country: 0,
        cities: [],
        checked: false
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

    // 유저 추가 인풋 컴포넌트 삭제
    setSaveUserInputs(() => 
      saveUserInputs.filter(input => !input.checked)
    );
  }

   

  // UTC 9시간 차로인한 +9시간 해주기
  const addNineHours = (date) => {
    if (date === null || !(date instanceof Date) || isNaN(date)) return null;

    const nineHoursInMilliseconds = 9 * 60 * 60 * 1000;
    return new Date(date.getTime() + nineHoursInMilliseconds);
  };

  const addHoursStartDate = startDate ? addNineHours(new Date(startDate)) : null;
  const addHoursEndDate = endDate ? addNineHours(new Date(endDate)) : null;



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

  // 더블 클릭시 수정 팝업창 활성화
  const handleOpenModal = (userId) => {
    const findModiyUser = userList.filter((user) => user.userId === userId)[0]
    setModifyUser(() => findModiyUser);

    setModalIsOpen(() => !modalIsOpen);
  }

  

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
              placeholder={selectLanguage.value === "한글" ? "아이디" : "ID"}
              value={searchUsername.value}
              onChange={searchUsername.handleOnChange}
            />
            <input 
              type="text" 
              placeholder={selectLanguage.value === "한글" ? "이름" : "name"}
              value={searchName.value}
              onChange={searchName.handleOnChange}
            />
          </div>  

          {/* 성별 */}
          <div css={S.inputRadio}>
            <div>
              <input 
                type="radio"
                name="gender" 
                value="남"
                checked={searchGender.value === "남"}
                onClick={searchGender.handleOnClick}
              />
              {selectLanguage.value === "한글" ? "남" : "Male"}
              <input 
                type="radio"
                name="gender" 
                value="녀"
                checked={searchGender.value === "녀"}
                onClick={searchGender.handleOnClick}
              />
              {selectLanguage.value === "한글" ? "녀" : "female"}
            </div>
            <div>
              {/* 한글, 영어 */}
              <input 
                type="radio"
                name="language" 
                value="한글"
                checked={selectLanguage.value === "한글"}
                onClick={selectLanguage.handleOnChange}
              />
              한국어
              <input 
                type="radio"
                name="language" 
                value="영어"
                checked={selectLanguage.value === "영어"}
                onClick={selectLanguage.handleOnChange}
              />
              English
            </div>
          </div>


          
          {/* 셀렉 국가,나라 콤보 박스 */}
          <div css={S.selectBox}>
            <select value={searchCountry.value} onChange={searchCountry.handleOnChange}>
              <option value="0">{selectLanguage.value === "한글" ? "국가(전체)" : "Countries(all)"}</option>
              {
              conutryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
              }
            </select>
            <CitySelector
              searchCountry={searchCountry}
              cityOptions={cityOptions}
              selectedCityies={selectedCities}
              setSelectedCities={setSelectedCities}
              selectLanguage={selectLanguage.value}
            />
          </div>
          
          {/* 켈린더 버튼 */}
          <div css={S.calendarBox}>
            <DatePicker 
              locale={ko} 
              selected={startDate} 
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText={selectLanguage.value === "한글" ? "시작" : "start Date"}
            />
            <DatePicker 
              locale={ko} 
              selected={endDate} 
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText={selectLanguage.value === "한글" ? "끝" : "end Date"}
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
              <tr>
                <th rowspan="2">{selectLanguage.value === "한글" ? "선택" : "check"}</th>
                <th rowspan="2">{selectLanguage.value === "한글" ? "아이디" : "ID"}</th>
                <th rowspan="2">{selectLanguage.value === "한글" ? "이름 " : "name"}</th>
                <th rowspan="2">{selectLanguage.value === "한글" ? "성별" : "gender"}</th>
                <th colSpan="2">{selectLanguage.value === "한글" ? "장소" : "place"}</th>  
              </tr>
              <tr>
                <th>{selectLanguage.value === "한글" ? "국가" : "country"}</th>
                <th>{selectLanguage.value === "한글" ? "도시" : "city"}</th>
              </tr>
            </thead>
            <tbody>
              {/* 추가 input들 컴포넌트 */}
              {
                saveUserInputs.map((input, i) => (
                  <SaveUserInput
                    key={input.id}
                    data={input}
                    onChange={((newDate) => handleSaveUserInputChange(i, newDate))}
                    inputKey={input.id}
                  />
                ))
              }
              {
              userList.map(user => (
                <tr key={user.userId} onDoubleClick={() => handleOpenModal(user.userId)} css={S.trRow(user.gender)}>
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
                  <td>{user.selectedCities.map(city => city.cityName).join(", ")}</td>
                </tr>
              ))
              }
            </tbody>  
          </table>        
        </div>
        {/* 페이징 */}
        <div css={S.paging}>
          {
            !getUserCountQuery.isLoading &&
            <UserSearchPageNumbers userCount={getUserCountQuery.data?.data}/>
          }        
        </div>
      </div>

      {/* 수정 모달 팝업 */}
      {
        modalIsOpen ?
          <PopupUserEdit
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            modifyUser={modifyUser}
            selectLanguage={selectLanguage}
          />
        :
          <></>
      }
      
    </div>
  );
}

export default UserManagement;
