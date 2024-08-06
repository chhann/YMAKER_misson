/** @jsxImportSource @emotion/react */
import { useMutation, useQuery } from "react-query";
import { useSelect } from "../../hooks/useSelect";
import * as S from "./style";
import Modal from 'react-modal'
import { getCityRequest, getCountryRequest } from "../../api/apis/options";
import { useState } from "react";
import { useInput } from "../../hooks/useInput";
import { useRadio } from "../../hooks/useRadio";
import { editUserRequest } from "../../api/apis/userApi";

function PopupUserEdit({ modalIsOpen, setModalIsOpen, modifyUser }) {
  const [conutryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const searchCountry = useSelect(modifyUser.countryId);
  const searchCity = useSelect(modifyUser.cityId);
  const searchUsername = useInput(modifyUser.userName);
  const searchName = useInput(modifyUser.name);
  const searchGender = useRadio(modifyUser.gender);


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

  const editUserMutation = useMutation(
    "editUserMutation", 
    editUserRequest,
    {
      onSuccess: response => {
        console.log(response);
        alert("변경되었습니다.");
        setModalIsOpen(false)
      },
      onError: error => {
        alert(error.response.data.Username오류);
      } 
    }
  )

  console.log(searchCountry.value);

  // 각 입력값이 유효한지 확인
  const validateUserInput = (searchUsername, searchName, searchGender, searchCountry, searchCity) => {
    const isUsernameValid = searchUsername.value !== "" && searchUsername.value !== undefined;
    const isNameValid = searchName.value !== "" && searchName.value !== undefined;
    const isGenderValid = searchGender.value !== "" && searchGender.value !== undefined;
    const isCountryValid = parseInt(searchCountry.value) !== 0 && searchCountry.value !== "" && searchCountry.value !== undefined;
    const isCityValid = parseInt(searchCity.value) !== 0 && searchCity.value !== "" && searchCity.value !== undefined;
  
    // 모든 조건이 만족되면 true 반환, 그렇지 않으면 false 반환
    return isUsernameValid && isNameValid && isGenderValid && isCountryValid && isCityValid;
  }
  
  // 유저 변경
  const handleModifyUser = () => {
    const isValid = validateUserInput(searchUsername, searchName, searchGender, searchCountry, searchCity);
    if (isValid) {
      editUserMutation.mutate({
        userId: modifyUser.userId,
        username: searchUsername.value,
        name: searchName.value,
        gender: searchGender.value,
        countryId: parseInt(searchCountry.value),
        cityId: parseInt(searchCountry.value)
      })
      
    } else {
      // 유효하지 않은 입력이 있을 때 
      alert("모든 필드를 올바르게 입력해주세요.");
    }
  }



  return (
    <Modal 
      isOpen={modalIsOpen}
      css={S.modal}
    >
      <div css={S.modalLayout}>
        {/* 수정할 데이터 */}
        <div css={S.modalBody}>
          {/* 아이디 */}
          <div>
            <input type="text" placeholder="아이디" disabled/>
            <input type="text" value={searchUsername.value} onChange={searchUsername.handleOnChange}/>
          </div>
          
          {/* 이름 */}
          <div>
            <input type="text" placeholder="이름" disabled/>
            <input type="text" value={searchName.value} onChange={searchName.handleOnChange}/>
          </div>

          {/* 성별 */}
          <div>
            <input type="text" placeholder="성별" disabled/>
            <span>
              <input 
                type="radio"
                name="gender" 
                value="남"
                checked={searchGender.value === "남"}
                onClick={searchGender.handleOnClick}
              />
              남
              <input 
                type="radio"
                name="gender" 
                value="녀"
                checked={searchGender.value === "녀"}
                onClick={searchGender.handleOnClick}
              />
              녀
            </span>
          </div>

          {/* 국가, 도시 */}
          <div>
            <input type="text" placeholder="국가" disabled/>
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
          </div>

          <div>
            <input type="text" placeholder="도시" disabled/>
            <select value={searchCity.value} onChange={searchCity.handleOnChange}>
              {
                modifyUser.countryId === "0" || modifyUser.countryId === 0 
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
        </div>

        {/* 저장, 취소 버튼 */}
        <div css={S.modalButton}>
          <div>
            <button onClick={() => handleModifyUser()}>저장</button>
            <button onClick={() => setModalIsOpen(false)}>취소</button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default PopupUserEdit
