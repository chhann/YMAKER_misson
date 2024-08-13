/** @jsxImportSource @emotion/react */
import * as S from "./style";
import { useEffect, useState } from "react";

function CitySelector({ searchCountry, cityOptions, selectedCityies, setSelectedCities  }) {
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
            "도시(전체)"
        }
      </div>
      {
        isDropdownOpen && (
          <ul css={S.ulContainer}>
            {
              searchCountry.value === "0" || searchCountry.value === 0
              ?
                <li value="0">도시전체(전체)</li>
              :
                <>
                  {/* <li value="0">
                    <label>
                      <input 
                        type="checkbox"
                        checked={selectedCityies.some(city => city.cityId === option.cityId)}
                        onChange={() => handleCheckboxChange(option)}
                      />
                      도시전체(전체)
                    </label>
                  </li> */}
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
