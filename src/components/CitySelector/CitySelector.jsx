/** @jsxImportSource @emotion/react */
import * as S from "./style";
import { useEffect, useState } from "react";

function CitySelector({ searchCountry, cityOptions, selectedCityies, setSelectedCities, selectLanguage  }) {
  const [isDropdownOpen, setIsDropdownOpen ] = useState(false);


  const resetCity = () => {
    if (searchCountry.value !== 0 && selectedCityies.length > 0) {
        setSelectedCities([]);
    }
  };

  useEffect(() => {
    resetCity();
  }, [searchCountry.value]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  
  const handleCheckboxChange = (city) => {
    const isSelected = selectedCityies.some(selectedCity => selectedCity.cityId === city.cityId);

    if(isSelected) {
      setSelectedCities(selectedCityies.filter((selectedCity) => selectedCity.cityId !== city.cityId));
    } else if (selectedCityies.length < 2) {
      setSelectedCities([...selectedCityies, city])
    } else {
      alert("최대 2개 도시만 선택할 수 있습니다.")
    }
  };

  
  

  return (
    <div>
      <div onClick={toggleDropdown} css={S.select}>
        {selectedCityies.length > 0
          ? 
            selectedCityies.map(city => city.cityName).join(",")
          :
            <>
              {selectLanguage === "한글" ? "도시(전체)" : "Cities(all)"}
            </>
        }
      </div>
      {
        isDropdownOpen && (
          <ul css={S.ulContainer}>
            {
              searchCountry.value === "0" || searchCountry.value === 0
              ?
                <li value="0">{selectLanguage === "한글" ? "도시(전체)" : "Cities(all)"}</li>
              :
                <>
                  {cityOptions.map((option) => (
                    <li key={option.cityId} css={S.liContainer}>
                      <label>
                        <input 
                          type="checkbox"
                          checked={selectedCityies.some(city => city.cityId === option.cityId)}
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

export default CitySelector
