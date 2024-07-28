import { useEffect, useState } from "react"
import { getCountryRequest } from "../api/apis/options";
import { useQuery } from "react-query";

export const useCountry = () => {
    const [conutryOptions, setCountryOptions] = useState([]);

        const CountryQuery = useQuery(
            ["CountryQuery"],
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


    return { conutryOptions };
}