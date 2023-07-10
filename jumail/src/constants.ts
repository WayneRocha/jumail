import { List } from "./store/features/list-manager";

const DEFAULT_LISTSET: List[] = [
    {
        id: "first-list",
        name: "Exemplo",
        emails: [
            {
                id: "123456789",
                address: "dev.waynerocha@email.com",
                variables: [
                    {
                        id: "default_id_var",
                        prop: "Nome",
                        value: "Wayne"
                    }
                ]
            }
        ],
        variables: [
            {
                id: "default_id_var",
                prop: "organizacao",
                value: "BayTrix"
            }
        ]
    }
];

export {
    DEFAULT_LISTSET
};