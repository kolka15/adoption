export const convertDataToCreateMunicipalDistrict = (newMunicipality) => {
    const {name, city} = newMunicipality;

    if (newMunicipality.level_code === 'region') {
        return {...newMunicipality, address: '', name: 'Региональный уровень'};
    }
    if (city)
        return {...newMunicipality, address: `${city}, ${name}`};
    return {...newMunicipality, address: `${name ? name : ''}`};
};
export const filterSelectedMunicipalities = (lkRegional) => {
    const {municipalitySelected, selectMunicipalData} = lkRegional;
    return selectMunicipalData.filter(item => +item.id === +municipalitySelected.value);
};

export function formatMunicipalitySelectOptions(options) {
    const optionsCopy = JSON.parse(JSON.stringify(options));

    if (optionsCopy && optionsCopy.length) {
        return optionsCopy
            .sort((a, b) => {
                if (a.address == null) {
                    return -1;
                }
                return a.address.localeCompare(b.address);
            })
            .map(option => {
                if (option.address) {
                    return {
                        label: option.address,
                        value: option.id
                    };
                }
                return {
                    label: 'Региональный уровень',
                    value: option.id
                };
            });
    }
    return null;
}

export const filterMunicipalData = lkRegional => {
    const {selectedMunicipality, municipalData} = lkRegional;

    const selectedId = selectedMunicipality ? +selectedMunicipality.value : municipalData.lengt ? municipalData.filter(el => !el.address)[0].id : null;

    if (selectedMunicipality)
        return municipalData.filter(item => +item.id === selectedId);

    return municipalData.filter(item => !item.address);
};
