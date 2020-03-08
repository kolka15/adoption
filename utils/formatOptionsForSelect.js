export const formatDocumentTypesOptions = (types) => (
    types && Array.isArray(types) && types.map(type => ({
        label: type.title,
        value: type.code,
        id: type.id
    }))
);