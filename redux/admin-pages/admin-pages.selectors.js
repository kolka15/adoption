import {createSelector} from 'reselect';
import {formatDocumentTypesOptions} from '../../utils/formatOptionsForSelect';

const adminPages = (state) => state.adminPages;

export const selectFaq = createSelector(
    [adminPages],
    (adminPages) => adminPages.faq ? adminPages.faq : null
);

export const selectDocumentTypes = createSelector(
    [adminPages],
    (adminPages) => adminPages.documentTypes ? formatDocumentTypesOptions(adminPages.documentTypes) : null
);

export const selectInterLawFiles = createSelector(
    [adminPages],
    (adminPages) => adminPages.interLawFiles ? adminPages.interLawFiles : null
);

export const selectContactsAdmin = createSelector(
    [adminPages],
    (adminPages) => adminPages.contactsAdmin ? adminPages.contactsAdmin : null
);