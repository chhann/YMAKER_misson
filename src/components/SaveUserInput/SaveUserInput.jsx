/** @jsxImportSource @emotion/react */
import * as S from "./style";
import { useState } from "react";
import { useQuery } from "react-query";
import { getCityRequest, getCountryRequest } from "../../api/apis/options";
import SaveCitySelector from "../SaveCitySelector/SaveCitySelector";


function SaveUserInput({ data, onChange, inputKey }) {
  const [conutryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [saveSelectedCities, setSaveSelectedCities] = useState(data.cities || []);

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value});
  }

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
    ["cityQuery", data.country],
    async () => await getCityRequest({
      selectCountryId: data.country
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

  return (
    <>
      <tr css={S.saveTr}>
        {/* 체크박스 */}
        <td><input type="checkbox" onChange={(e) => handleChange('checked', e.target.checked)}/></td>

        {/* 아이디*/}
        <td>
          <input 
            type="text" 
            placeholder="아이디"
            value={data.username}
            onChange={(e) => handleChange('username', e.target.value)}
          />
        </td>
        {/* 이름 */}
        <td>
          <input 
            type="text" 
            placeholder="이름"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </td>
        {/* 남,녀 */}
        <td>
          <input 
            type="radio" 
            name={`gender-${data.id}`} 
            value="남"
            checked={data.gender === "남"}
            onChange={() => handleChange('gender', "남")} 
          />
          남
          <input type="radio"
            name={`gender-${data.id}`} 
            value="녀"
            checked={data.gender === "녀"}
            onChange={() => handleChange('gender', "녀")}
          />
          녀
        </td>
        {/* 국가, 도시 */}
        <td>
          <select value={data.country} onChange={(e) => handleChange('country', e.target.value)}>
            <option value="0">국가(전체)</option>
            {conutryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </td>
        <td>
          <SaveCitySelector
            inputKey={inputKey}
            data={data}
            cityOptions={cityOptions}
            saveSelectedCities={saveSelectedCities}
            setSaveSelectedCities={(cities) => {
              setSaveSelectedCities(cities);
              handleChange('cities', cities);
            }}
          />
        </td>
      </tr>  
    </>
  )
}

export default SaveUserInput
