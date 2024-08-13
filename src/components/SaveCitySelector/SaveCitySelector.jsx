/** @jsxImportSource @emotion/react */
import * as S from "./style";
import { useRecoilState } from "recoil";
import { selectCityState } from "../../atoms/saveSelectedCityAtom";
import { useEffect, useState } from "react";

function SaveCitySelector({inputKey, data, cityOptions, saveSelectedCities, setSaveSelectedCities}) {
  const [isDropdownOpen, setIsDropdownOpen ] = useState(false);
  const [selectCityShow, setSelectCityShow] = useRecoilState(selectCityState);

  const resetCity = () => {
    if(data.country !==0 && saveSelectedCities.length > 0) {
      setSaveSelectedCities([]);
    }
  };

  useEffect(() => {
    resetCity();
  }, [data.country]);

  useEffect(() => {
    setIsDropdownOpen(inputKey === selectCityShow);
  }, [selectCityShow, inputKey]);
  
  const toggleDropdown = () => {
    if (inputKey === selectCityShow) {
      // 현재 열려있는 상태이면 닫기
      setSelectCityShow(0); // Recoil 상태를 빈 문자열로 설정
    } else {
      // 다른 콤보박스가 열려있다면 닫고 현재 클릭한 콤보박스를 열기
      setSelectCityShow(inputKey);
    }
  };

  const handleCheckboxChange = (city) => {
    const isSelected = saveSelectedCities.some(selectedCity => selectedCity.cityId === city.cityId);
  
    if (isSelected) {
      // 체크된 항목을 해제
      setSaveSelectedCities(saveSelectedCities.filter((selectedCity) => selectedCity.cityId !== city.cityId));
    } else if (saveSelectedCities.length < 2) {
      // 새 항목을 추가
      setSaveSelectedCities([...saveSelectedCities, city]);
    } else {
      // 이미 2개가 선택된 경우
      alert("최대 2개 도시만 선택할 수 있습니다.");
    }
  };

  

  return (
    <div>
      <div onClick={toggleDropdown} css={S.select}>
        {saveSelectedCities.length > 0
          ?
            saveSelectedCities.map(city => city.cityName).join(",")
          :
            "도시(전체)"
        }
      </div>
      {
        isDropdownOpen && (
          <ul css={S.ulContainer}>
            {
              data.country === "0" || data.country === 0
              ?
                <li value="0">도시전체(전체)</li>
              :
                <>
                  {cityOptions.map((option) => (
                    <li key={option.cityId} css={S.liContainer}>
                      <label>
                        <input 
                          type="checkbox"
                          checked={saveSelectedCities.some(city => city.cityId === option.cityId)}
                          onChange={() => handleCheckboxChange(option)}
                        />
                        {option.cityName}
                      </label>
                    </li>
                  ))}
                </>
            }
          </ul>
        )
      }
    </div>
  )
}

export default SaveCitySelector
