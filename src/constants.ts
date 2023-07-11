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
                        prop: "nome",
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

const DEFAULT_EDITORCONTENT: {[listId: string]: string} = {
    "first-list": `escreva ou cole seu email aqui e coloque o conteúdo a ser substítuido entre chaves duplas -> {{}}
    Exemplo:
    Olá {{nome}} da {{organizao}}, gostaria que soubesse sobre...
    
    Dica*: Quando for colar o seu email aqui, ele virá em HTML para manter sua formatação.
    Uma dica para se localizar melhor em meio ao texto é apertar ctrl + f para localizar uma palavra especifica
    
    Aproveite a ferramenta 😉`
};

export {
    DEFAULT_LISTSET,
    DEFAULT_EDITORCONTENT
};