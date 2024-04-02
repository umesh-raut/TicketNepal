import React from 'react'
import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate'
import { Options, url } from "../../api"

const Search = ({ onSearchChange }) => {
    const [search, setsearch] = useState(null);
    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(`${url}/searchAirport?query=${inputValue}`,Options);
            if (!response.ok) {
                throw new Error('API request failed');
              }
            const result = await response.json();
            console.log(result);
            
            return {
                options: result.data.map((airport) => {
                    return {
                        value: `${airport.airportCode}`,
                        label: `${airport.details.name}`,

                    };
                })

            }
        } catch (error) {
            console.error(error);
            return{ options:[]}
        }

    }
    const handleOnChange = (searchData) => {
        setsearch(searchData);
        onSearchChange(searchData)
    }
    return (
        <AsyncPaginate
            placeholder='search flight'
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}
export default Search;