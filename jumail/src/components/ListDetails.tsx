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
                    prop: "Nome",
                    value: ""
                }
            ]
        });

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
                    <input
                        type="email"
                        className="label-text rounded-sm bg-transparent"
                        onChange={(e) => setAddressInput(e.currentTarget.value)}
                        onBlur={() => handleChangeEmailAddress(id, addressInput)}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="Novo Email"
                        value={addressInput}
                    />
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
                <p className="text-sm font-bold text-neutral-600">Escolha uma lista</p>
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
                        <svg id="Layer_1" className="h-2 w-2" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="evenodd" stroke="currentColor" viewBox="0 0 105.16 122.88"><title>delete</title><path d="M11.17,37.16H94.65a8.4,8.4,0,0,1,2,.16,5.93,5.93,0,0,1,2.88,1.56,5.43,5.43,0,0,1,1.64,3.34,7.65,7.65,0,0,1-.06,1.44L94,117.31v0l0,.13,0,.28v0a7.06,7.06,0,0,1-.2.9v0l0,.06v0a5.89,5.89,0,0,1-5.47,4.07H17.32a6.17,6.17,0,0,1-1.25-.19,6.17,6.17,0,0,1-1.16-.48h0a6.18,6.18,0,0,1-3.08-4.88l-7-73.49a7.69,7.69,0,0,1-.06-1.66,5.37,5.37,0,0,1,1.63-3.29,6,6,0,0,1,3-1.58,8.94,8.94,0,0,1,1.79-.13ZM5.65,8.8H37.12V6h0a2.44,2.44,0,0,1,0-.27,6,6,0,0,1,1.76-4h0A6,6,0,0,1,43.09,0H62.46l.3,0a6,6,0,0,1,5.7,6V6h0V8.8h32l.39,0a4.7,4.7,0,0,1,4.31,4.43c0,.18,0,.32,0,.5v9.86a2.59,2.59,0,0,1-2.59,2.59H2.59A2.59,2.59,0,0,1,0,23.62V13.53H0a1.56,1.56,0,0,1,0-.31v0A4.72,4.72,0,0,1,3.88,8.88,10.4,10.4,0,0,1,5.65,8.8Zm42.1,52.7a4.77,4.77,0,0,1,9.49,0v37a4.77,4.77,0,0,1-9.49,0v-37Zm23.73-.2a4.58,4.58,0,0,1,5-4.06,4.47,4.47,0,0,1,4.51,4.46l-2,37a4.57,4.57,0,0,1-5,4.06,4.47,4.47,0,0,1-4.51-4.46l2-37ZM25,61.7a4.46,4.46,0,0,1,4.5-4.46,4.58,4.58,0,0,1,5,4.06l2,37a4.47,4.47,0,0,1-4.51,4.46,4.57,4.57,0,0,1-5-4.06l-2-37Z"/></svg>
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