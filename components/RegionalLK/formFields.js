export const regionalLKFormView = [
    {
        title: 'Орган исполнительной власти ..., осуществляющий полномочия регионального оператора государственного банка данных о детях, оставшихся без попечения родителей, и по опеке и попечительству над несовершеннолетними',
        fields: [
            {label: 'Наименование', name: 'name', type: 'xl'},
            {label: 'Юридический адрес', name: 'address_1', type: 'xl'},
            {
                label: 'Фактическое месторасположение',
                name: 'address_2',
                type: 'address',
                id: 'address1',
                checkLabel: 'Совпадает с юридическим',
                checked: false
            },
            {label: 'ФИО руководителя', name: 'fio', type: 'lg'},
            {label: 'Телефон', name: 'phone', type: 'sm'},
            {label: 'E-mail', name: 'email', type: 'sm'},
            {label: 'Сайт', name: 'website', type: 'sm'},
        ]
    },
    {
        title: 'Структурное подразделение, осуществляющее полномочия по опеке и попечительству над несовершеннолетними',
        isSubtitle: true,
        fields: [
            {label: 'Наименование', name: 'name', type: 'xl'},
            {label: 'ФИО руководителя', name: 'fio', type: 'lg'},
            {
                label: 'Адрес',
                name: 'address_2',
                type: 'address',
                checkLabel: 'Совпадает с указанным выше',
                id: 'address2',
                checked: false
            },
            {label: 'Телефон', name: 'phone', type: 'sm'},
            {label: 'E-mail', name: 'email', type: 'sm'},
        ]
    },
    {
        title: 'Специалисты, осуществляющие  функции регионального оператора',
        specialists: true,
        isSubtitle: true,
        fields: [
            {label: 'ФИО', name: 'fio', type: 'md'},
            {label: 'Телефон:', name: 'phone', type: 'sm'},
            {type: 'addSpecialist', name: 'Добавить специалиста'},
            {label: 'Часы приема граждан', name: 'hours', type: 'xl'},
        ]
    },
    {
        title: 'Уполномоченный по правам ребёнка',
        fields: [
            {label: 'ФИО уполномоченного', name: 'fio', type: 'lg'},
            {label: 'Адрес', name: 'address_2', type: 'xl'},
            {label: 'Телефон', name: 'phone', type: 'sm'},
            {label: 'E-mail', name: 'email', type: 'sm'},
            {label: 'Сайт', name: 'website', type: 'sm'},
            {label: 'Часы приема граждан', name: 'hours', type: 'xl'},
        ]
    },
    {
        title: 'Орган исполнительной власти ..., осуществляющий управление в сфере здравоохранения',
        fields: [
            {label: 'Наименование', name: 'name', type: 'xl'},
            {label: 'Адрес', name: 'address_2', type: 'xl'},
            {label: 'ФИО руководителя:', name: 'fio', type: 'lg'},
            {label: 'Телефон', name: 'phone', type: 'sm'},
            {label: 'E-mail', name: 'email', type: 'sm'},
            {label: 'Сайт', name: 'website', type: 'sm'},
        ]
    },
    {
        title: 'Орган исполнительной власти ..., осуществляющий полномочия в сфере внутренних дел',
        fields: [
            {label: 'Наименование', name: 'name', type: 'xl'},
            {label: 'Адрес', name: 'address_2', type: 'xl'},
            {label: 'ФИО руководителя:', name: 'fio', type: 'lg'},
            {label: 'Телефон', name: 'phone', type: 'sm'},
            {label: 'E-mail', name: 'email', type: 'sm'},
            {label: 'Сайт', name: 'website', type: 'sm'},
        ]
    },
    {
        title: 'Орган судебной власти субъекта Российской Федерации',
        fields: [
            {label: 'Наименование', name: 'name', type: 'xl'},
            {label: 'Адрес', name: 'address_2', type: 'xl'},
            {label: 'ФИО руководителя:', name: 'fio', type: 'lg'},
            {label: 'Телефон', name: 'phone', type: 'sm'},
            {label: 'E-mail', name: 'email', type: 'sm'},
            {label: 'Сайт', name: 'website', type: 'sm'},
        ]
    },
    {
        title: 'Межведомственная комиссия по делам несовершеннолетних',
        fields: [
            {label: 'Наименование', name: 'name', type: 'xl'},
            {label: 'Адрес', name: 'address_2', type: 'xl'},
            {label: 'ФИО руководителя:', name: 'fio', type: 'lg'},
            {label: 'Телефон', name: 'phone', type: 'sm'},
            {label: 'E-mail', name: 'email', type: 'sm'},
            {label: 'Сайт', name: 'website', type: 'sm'},
        ]
    },
];

export const regionalLocalLKFormView = [
    {
        title: 'Орган опеки и попечительства',
        fields: [
            {label: 'Наименование', name: 'name', type: 'xl'},
            {label: 'Адрес', name: 'address_2', type: 'xl'},
            {label: 'ФИО руководителя', name: 'fio', type: 'lg'},
            {label: 'Телефон', name: 'phone', type: 'sm'},
            {label: 'E-mail', name: 'email', type: 'sm'},
            {label: 'Сайт', name: 'website', type: 'sm'},
        ]
    },
    {
        title: 'Структурное подразделение, осуществляющее полномочия по опеке и попечительству над несовершеннолетними',
        isSubtitle: true,
        fields: [
            {label: 'Наименование', name: 'name', type: 'xl'},
            {label: 'ФИО руководителя', name: 'fio', type: 'lg'},
            {
                label: 'Адрес',
                name: 'address_2',
                type: 'address',
                checkLabel: 'Совпадает с указанным выше',
                id: 'address2',
                checked: false
            },
            {label: 'Телефон', name: 'phone', type: 'sm'},
            {label: 'E-mail', name: 'email', type: 'sm'},
        ]
    },
    {
        title: 'Специалисты',
        specialists: true,
        isSubtitle: true,
        fields: [
            {label: 'ФИО', name: 'fio', type: 'md'},
            {label: 'Телефон:', name: 'phone', type: 'sm'},
            {type: 'addSpecialist', name: 'Добавить специалиста'},
            {label: 'Часы приема граждан', name: 'hours', type: 'xl'},
        ]
    },
    {
        title: 'Школа подготовки приёмных родителей',
        fields: [
            {label: 'Наименование', name: 'name', type: 'xl'},
            {label: 'Адрес', name: 'address_2', type: 'xl'},
            {label: 'ФИО руководителя', name: 'fio', type: 'lg'},
            {label: 'Телефон', name: 'phone', type: 'sm'},
            {label: 'E-mail', name: 'email', type: 'sm'},
            {label: 'Сайт', name: 'website', type: 'sm'},
        ]
    },
    {
        title: 'Служба сопровождения замещающих семей',
        fields: [
            {label: 'Наименование', name: 'name', type: 'xl'},
            {label: 'Адрес', name: 'address_2', type: 'xl'},
            {label: 'ФИО руководителя:', name: 'fio', type: 'lg'},
            {label: 'Телефон', name: 'phone', type: 'sm'},
            {label: 'E-mail', name: 'email', type: 'sm'},
            {label: 'Сайт', name: 'website', type: 'sm'},
        ]
    }
];