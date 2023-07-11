import { Email, List, Variable, selectList, setList, setLists } from "@/store/features/list-manager"
import { generateUUID } from "@/utils";
import { selectActiveEmailCard, setActiveEmailCard } from "@/store/features/ui";
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react";

export function ListDetails() {
    const dispatch = useDispatch();
    const list = useSelector(selectList);
    const emailCardActive = useSelector(selectActiveEmailCard);

    const handleChangeListName = (name: string) => {
        if (list === null) {
            return;
        }
        const newList: List = { ...list };
        newList.name = name;
        dispatch(setList(newList));
    };

    const handleChangeVariableKey = (variableId: string, newKey: string) => {
        if (list === null) { return; }

        const index = list.variables.findIndex(v => v.id === variableId);
        let newList: List = structuredClone(list);

        if (index === (-1)) { return; }

        newList.variables[index].prop = newKey;

        dispatch(setList(newList));
    };

    const handleChangeVariableValue = (variableId: string, value: string) => {
        if (list === null) { return; }

        const index = list.variables.findIndex(v => v.id === variableId);
        let newList: List = structuredClone(list);

        if (index === (-1)) { return; }

        newList.variables[index].value = value;

        dispatch(setList(newList));
    };

    const handleChangeEmailVariableKey = (emailId: string, variableId: string, newKey: string) => {
        if (list === null) { return; }

        const emailIndex = list.emails.findIndex(v => v.id === emailId);
        const variableIndex = list.emails[emailIndex].variables.findIndex(v => v.id === variableId);

        let newList: List = structuredClone(list);

        if (emailIndex === (-1) || variableIndex === (-1)) { return; }

        newList.emails[emailIndex].variables[variableIndex].prop = newKey;

        dispatch(setList(newList));
    };

    const handleChangeEmailVariableValue = (emailId: string, variableId: string, value: string) => {
        if (list === null) { return; }

        const emailIndex = list.emails.findIndex(v => v.id === emailId);
        const variableIndex = list.emails[emailIndex].variables.findIndex(v => v.id === variableId);

        let newList: List = structuredClone(list);

        if (emailIndex === (-1) || variableIndex === (-1)) { return; }

        newList.emails[emailIndex].variables[variableIndex].value = value;

        dispatch(setList(newList));
    };
    
    const handleChangeEmailAddress = (emailId: string, value: string) => {
        if (list === null) { return; }

        let newList: List = structuredClone(list);
        const emailIndex = list.emails.findIndex(v => v.id === emailId);

        newList.emails[emailIndex].address = value;

        dispatch(setList(newList));
    };

    const handleAddListVariable = () => {
        if (list === null) { return; }

        let newList: List = structuredClone(list);

        newList.variables.push({id: generateUUID(), prop: "Nova Variavel", value: ""});

        dispatch(setList(newList));
    };

    const handleAddListEmail = () => {
        if (list === null) { return; }

        let newList: List = structuredClone(list);

        newList.emails.push({
            id: generateUUID(),
            address: "",
            variables: [
                {
                    id: generateUUID(),
                    prop: "nome",
                    value: ""
                }
            ]
        });

        dispatch(setList(newList));
    };

    const handleDeleteListEmail = (id: string) => {
        if (list === null) { return; }

        let newList: List = structuredClone(list);

        const emailIndex = list.emails.findIndex(email => email.id === id);

        newList.emails.splice(emailIndex, 1);

        dispatch(setList(newList));
    };

    const handleAddEmailVariable = (emailId: string) => {
        if (list === null) { return; }

        let newList: List = structuredClone(list);

        const emailIndex = list.emails.findIndex(v => v.id === emailId);
        
        if (emailIndex === (-1)) { return; }

        newList.emails[emailIndex].variables.push({id: generateUUID(), prop: "Nova Variável", value: ""});

        dispatch(setList(newList));
    };

    const handleDeleteListVariable = (variableId: string) => {
        if (list === null) { return; }

        const index = list.variables.findIndex(v => v.id === variableId);
        let newList: List = structuredClone(list);

        if (index === (-1)) { return; }

        newList.variables.splice(index, 1);

        dispatch(setList(newList));
    };

    const handleDeleteEmailVariable = (emailId: string, variableId: string) => {
        if (list === null) { return; }

        const emailIndex = list.emails.findIndex(v => v.id === emailId);
        const variableIndex = list.emails[emailIndex].variables.findIndex(v => v.id === variableId);

        let newList: List = structuredClone(list);

        if (emailIndex === (-1) || variableIndex === (-1)) { return; }

        newList.emails[emailIndex].variables.splice(variableIndex, 1);

        dispatch(setList(newList));
    };

    const EmailCard = ({ id, address, variables }: Email) => {
        const [addressInput, setAddressInput] = useState<string>(address);
        const checked = emailCardActive === id;

        const handleChange = (e: any) => {
            e.stopPropagation();
            dispatch(setActiveEmailCard(checked ? null : id));
        };

        return (
            <div className="collapse collapse-plus bg-neutral-200 rounded-md" onClick={(e) => {if (!checked) handleChange(e)}}>
                <input
                    type="radio"
                    name="my-accordion-3"
                    checked={checked}
                    onChange={() => {}}
                    onClick={(e) => {if (checked) handleChange(e)}}
                    className="hidden"
                />
                <div className="collapse-title text-sm font-normal empty:border-b-2 empty:border-neutral-300" onClick={handleChange}>
                    <div className="flex gap-4">
                        <input
                            type="email"
                            className="label-text rounded-sm bg-transparent"
                            onChange={(e) => setAddressInput(e.currentTarget.value)}
                            onBlur={() => handleChangeEmailAddress(id, addressInput)}
                            onClick={(e) => e.stopPropagation()}
                            placeholder="Novo Email"
                            value={addressInput}
                        />
                        <button className="btn btn-square btn-xs btn-outline" onClick={() => handleDeleteListEmail(id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 14 18" fill="none">
                                <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3 6H11V16H3V6ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z" fill="black" fillOpacity="0.54"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div className="collapse-content">
                    <div className="flex justify-between content-center">
                        <p className="text-sm font-normal text-neutral-600">
                            Variáveis do email
                        </p>
                        <button className="btn btn-square btn-xs btn-outline" onClick={() => handleAddEmailVariable(id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-3 h-3 rotate-45" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <div className="flex flex-col">
                        {
                            variables.map(({ id: varId, prop, value }) => (
                                <VariableField
                                    key={prop}
                                    id={varId}
                                    prop={prop}
                                    value={value}
                                    onPropChange={(text) => handleChangeEmailVariableKey(id, varId, text)}
                                    onValueChange={(value) => handleChangeEmailVariableValue(id, varId, value)}
                                    onDelete={() => handleDeleteEmailVariable(id, varId)}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    };

    if (list === null) {
        return (
            <div className="bg-neutral-300 flex flex-col w-fit min-w-32 h-100 px-4 place-content-center justify-center">
            </div>
        );
    }

    return (
        <div className="bg-neutral-100 flex flex-col w-fit max-w-50 w- h-100 p-2 py-4">
            <p className="text-sm font-bold text-neutral-600 mb-1">
                Nome da Lista
            </p>
            <input type="text" placeholder="Nome da Lista" className="input input-sm rounded-sm w-full" onChange={(e) => handleChangeListName(e.currentTarget.value)} value={list.name} />
            <div className="divider my-2"></div>
            <div className="flex justify-between content-center">
                <p className="text-sm font-bold text-neutral-600">
                    Variáveis
                </p>
                <button className="btn btn-square btn-xs btn-outline" onClick={handleAddListVariable}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-3 h-3 rotate-45" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div>
                {list.variables.map(({ id: varId, prop, value }) => (
                    <VariableField
                        key={prop}
                        id={varId}
                        prop={prop}
                        value={value}
                        onPropChange={(newKey) => handleChangeVariableKey(varId, newKey)}
                        onValueChange={(value) => handleChangeVariableValue(varId, value)}
                        onDelete={() => handleDeleteListVariable(varId)}
                    />
                ))}
            </div>
            <div className="divider my-2"></div>
            <div className="flex justify-between content-center my-1">
                <p className="text-sm font-bold text-neutral-600">
                    Emails
                </p>
                <button className="btn btn-square btn-xs btn-outline" onClick={handleAddListEmail}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-3 h-3 rotate-45" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="flex flex-col gap-2">
                {list.emails.map((props) => <EmailCard {...props} key={props.id} />)}
            </div>
        </div>
    )
}

interface VariableFieldProps extends Variable {
    onPropChange: (value: string) => void,
    onValueChange: (value: string) => void,
    onDelete: (variableId: string) => any,
};

function VariableField({ id, prop, value, onPropChange, onValueChange, onDelete }: VariableFieldProps) {
    const [keyText, setKeyText] = useState<string>(prop);
    const [valueText, setValueText] = useState<string>(value);
    
    return (
        <div className="form-control w-full max-w-xs my-1">
            <div className="flex justify-between content-center w-full py-1">
                <label className="label p-0">
                    <input
                        className="label-text rounded-sm bg-transparent"
                        onChange={(e) => {
                            setKeyText(e.currentTarget.value);
                        }}
                        onBlur={() => onPropChange(keyText)}
                        value={keyText}
                    />
                </label>
                <button className="btn btn-square btn-xs btn-outline" onClick={() => onDelete(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 14 18" fill="none">
                        <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3 6H11V16H3V6ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z" fill="black" fillOpacity="0.54"/>
                    </svg>
                </button>
            </div>
            <input
                type="text"
                placeholder="valor"
                className="input input-sm rounded-sm w-full max-w-xs"
                value={valueText}
                onChange={(e) => {
                    setValueText(e.currentTarget.value);
                }}
                onBlur={() => onValueChange(valueText)}
            />
        </div>
    );
};