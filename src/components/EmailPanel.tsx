import { List, selectList, setList, setLists } from "@/store/features/list-manager";
import { selectEditorContent, selectUserEmail, setActiveList, setEditorContent } from "@/store/features/ui";
import { replaceVariables } from "@/utils";
import {useEffect,  useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ReactMarkdown from 'react-markdown'
import { useDispatch, useSelector } from "react-redux";
import rehypeRaw from 'rehype-raw'

export function EmailPanel(){
    const dispatch = useDispatch();
    const list = useSelector(selectList);
    if (list === null) {return;}

    const editorContent = useSelector(selectEditorContent);
    const [view, setView] = useState<"raw" | "preview">("raw");
    const [content, setContent] = useState<string>(editorContent[list.id] || "");

    useEffect(() => {
        setContent(editorContent[list.id]);
    }, [list.id]);

    const handlePaste = async(e: any) => {
        e.preventDefault();

        let data;
        try {
            data = await navigator.clipboard.read();
        } catch (error) {
            console.error("erro ao copiar para a area de transferencia");
            return;
        }

        let htmlContent = '';
  
        // Verificar se existe o tipo "text/html" na área de transferência
        if (data && data.length > 0) {
            const htmlItem = data.find((item) => item.types.includes("text/html"));
            if (htmlItem){
                htmlContent = await (await htmlItem.getType('text/html')).text() || "";
                setContent(htmlContent);
                return;
            }

            // Verificar outros tipos disponíveis
            const firstItem = data[0];
            htmlContent = await (await firstItem.getType(firstItem.types[0])).text() || "";
            setContent(htmlContent);
        }
    };

    const handleOpenPopup = () => {
        if (list === null) { return; }

        dispatch(setEditorContent({listId: list.id, content: content}));

        //@ts-ignore
        window.modal_send.showModal();
    };

    const handleChangeText = () => {
        if (list === null) { return; }

        dispatch(setEditorContent({listId: list.id, content: content}));
    };

    const handleCopyToClipboard = async(e: any) => {
        const text = editorContent[list.id];
        const blobHTML = new Blob([text], { type: "text/html" });
        const dataToWrite = [new ClipboardItem({ "text/html": blobHTML })];
        
        navigator.clipboard.write(dataToWrite);
    }

    const handleSwitchView = () => {
        setView(state => state === "raw" ? "preview" : "raw");
        //@ts-ignore
        window.modal_preview.showModal();
    }

    const handleDeleteList = () => {
        if (list === null) { return; }

        let lists: List[] = JSON.parse(window.localStorage.getItem("listManager.lists") || "[]");

        const listIndex = lists.findIndex(l => l.id === list.id);

        lists.splice(listIndex, 1);

        dispatch(setLists(lists));

        if (lists.length > 0) { 
            dispatch(setActiveList(lists[listIndex - 1].id));
        } else {
            dispatch(setActiveList(null));
        }
    };

    if (list === null) {
        return (<></>);
    }

    return (
        <div className="flex flex-col bg-neutral-50 h-full w-full max-w-full content-between" style={{width: "-webkit-fill-available"}}>
            <Modal />
            <PreviewModal
                content={
                    replaceVariables(
                        editorContent[list.id],
                        list.variables.reduce((obj: {[key: string]: string}, variable) => {
                            obj[variable.prop] = variable.value;
                            return obj;
                        }, {})
                    )
                }
            />
            <textarea className="w-full h-full outline-none p-2 text-xs font-mono font-light" onChange={(e) => setContent(e.currentTarget.value)} onBlur={() => handleChangeText()} onPaste={handlePaste} value={content}>
            </textarea>
            <div className={`flex gap-4 p-2 border-t-teal-500 border-t-2`}>
                <button className="btn btn-md btn-outline btn-accent rounded-md" onClick={handleOpenPopup}>Enviar para</button>
                <button className="btn btn-square btn-outline" onClick={handleCopyToClipboard}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_670_392)">
                        <path opacity="0.3" d="M14 7H8V21H19V12H14V7Z" fill="black" fillOpacity="0.54"/>
                        <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM15 5H8C6.9 5 6.01 5.9 6.01 7L6 21C6 22.1 6.89 23 7.99 23H19C20.1 23 21 22.1 21 21V11L15 5ZM19 21H8V7H14V12H19V21Z" fill="black" fillOpacity="0.54" />
                        </g>
                        <defs>
                        <clipPath id="clip0_670_392">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </button>
                <button className="btn btn-square btn-outline" onClick={handleSwitchView}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <g clipPath="url(#clip0_670_27)">
                        <path opacity="0.3" d="M11.9997 6.5C8.20969 6.5 4.82969 8.63 3.17969 12C4.82969 15.37 8.19969 17.5 11.9997 17.5C15.7997 17.5 19.1697 15.37 20.8197 12C19.1697 8.63 15.7897 6.5 11.9997 6.5ZM11.9997 16.5C9.51969 16.5 7.49969 14.48 7.49969 12C7.49969 9.52 9.51969 7.5 11.9997 7.5C14.4797 7.5 16.4997 9.52 16.4997 12C16.4997 14.48 14.4797 16.5 11.9997 16.5Z" fill="black" fillOpacity="0.54"/>
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17.5C8.21 17.5 4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5C15.79 6.5 19.17 8.63 20.82 12C19.17 15.37 15.79 17.5 12 17.5ZM12 7.5C9.52 7.5 7.5 9.52 7.5 12C7.5 14.48 9.52 16.5 12 16.5C14.48 16.5 16.5 14.48 16.5 12C16.5 9.52 14.48 7.5 12 7.5ZM12 14.5C10.62 14.5 9.5 13.38 9.5 12C9.5 10.62 10.62 9.5 12 9.5C13.38 9.5 14.5 10.62 14.5 12C14.5 13.38 13.38 14.5 12 14.5Z" fill="black" fillOpacity="0.54"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_670_27">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </button>
                <button className="btn btn-square btn-outline btn-error" onClick={handleDeleteList}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                        <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3 6H11V16H3V6ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z" fill="black" fillOpacity="0.54"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

function Modal() {
    const list = useSelector(selectList);
    const editorContent = useSelector(selectEditorContent);
    if (list === null) {return;}
    const [subject, setSubject] = useState<string>("");
    const [emails, setEmails] = useState<Array<{
        email: string, selected: boolean
    }>>([]);
    const [processing, setProcessing] = useState<boolean>(false);
    const [processingEnd, setProcessingEnd] = useState<boolean>(false);
    const [requests, setRequests] = useState<{
        [emailId: string]: {status: "ok" | "error" | "pending"}
    }>({});    

    const handleReset = () => {
        setEmails(list.emails.map(email => ({email: email.address, selected: true})));
        setProcessing(false);
        setProcessingEnd(false);
        setRequests({});
        setSubject("");
    };

    const handleSendEmails = async() => {
        let requestsMap: {
            [emailId: string]: {status: "ok" | "error" | "pending"}
        } = {};

        emails.filter(email => email.selected).forEach(({email}) => {
            requestsMap[email] = {status: "pending"}
        });

        setRequests(requestsMap);
        setProcessing(true);

        const userEmail = window.localStorage.getItem("ui.user_email");
        const userName = window.localStorage.getItem("ui.user_name");

        Object.entries(requestsMap).forEach(([email, _]) => {
            const emailIndex = list.emails.findIndex(e => e.address === email); //verificar correção
            const mappedVariables = [
                ...list.variables,
                ...list.emails[emailIndex].variables
            ].reduce((obj: {[key: string]: string}, variable) => {
                obj[variable.prop] = variable.value;
                return obj;
            }, {});

            fetch("/api/send", {
                method: "POST",
                body: JSON.stringify({
                    sender: {
                        email: userEmail,
                        name: userName || undefined
                    },
                    to: [{email: email}],
                    cc: [],
                    bcc: [],
                    subject: replaceVariables(subject, mappedVariables),
                    content: encodeURIComponent(replaceVariables(editorContent[list.id], mappedVariables))
                })
            }).then(async(data) => {
                const responseData: any = await data.json();

                if (responseData?.error) {
                    console.log(responseData);
                    throw new Error(JSON.stringify(responseData.response));
                }

                setRequests(state => ({...state, [email]: {status: "ok"}}));
            }).catch(error => {
                console.log(error);
                setRequests(state => ({...state, [email]: {status: "error"}}));
            });
        });

        setProcessing(false);
        setProcessingEnd(true);
    };

    const EmailItem = (email: {email: string, selected: boolean}, index: number) => {
        let statusFlag = "";

        if (requests[email.email]?.status === 'ok') statusFlag = "ok";
        if (requests[email.email]?.status === 'error') statusFlag =  "error";
        if (requests[email.email]?.status === 'pending') statusFlag =  "pending";

        return (
            <label className={`
                flex gap-2 items-center p-2 border-l-4 border-y-2 border-y-neutral-200
                ${statusFlag === 'ok' ? 'border-success' : ""}
                ${statusFlag === 'error' ? 'border-error' : ""}
                ${statusFlag === 'pending' ? 'border-gray-200' : ""}
                ${processing ? "select-none bg-neutral-200" : ""}
                
            `} key={index}
            >
                <input
                    type="checkbox"
                    disabled={processing && !processingEnd}
                    checked={email.selected}
                    onChange={(e) => {
                        const emailsClone = [...emails];
                        //@ts-ignore
                        emailsClone[index].selected = !emailsClone[index].selected;
                        setEmails(emailsClone);
                    }}
                    className={`checkbox checkbox-sm`}
                />
                <span>{email.email}</span>
            </label>
        );
    }

    useEffect(handleReset, [list.emails]);

    return (
        <dialog id="modal_send" className="modal">
            <form method="dialog" className="modal-box rounded-md">
                {!processing ? (
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleReset}>✕</button>
                ) : null }
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Assunto</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Digite o assunto aqui"
                        className="input input-sm rounded-sm w-full"
                        onChange={(e) => setSubject(e.currentTarget.value)} 
                        value={subject}
                        disabled={processing}
                    />
                </div>
                <div className="rounded-md border-2 border-neutral-200 overflow-hidden">
                    <div>
                        <ProgressBar
                            percentage={Math.round(
                                (Object.entries(requests).reduce((acc, curr) => acc + (curr[1].status === "ok" || curr[1].status === "error" ? 1 : 0), 0) / Object.keys.length) * 100
                            )}
                        />
                    </div>
                    <div className="container h-min max-h-50">
                        {emails.map(EmailItem)}
                    </div>
                </div>
                <div className="flex gap-4 my-2">
                    <button
                        className="btn btn-xs btn-outline btn-accent rounded-md font-light"
                        onClick={(e) => {
                            if (processingEnd) {handleReset(); return;}
                            e.preventDefault();
                            handleSendEmails();
                        }}
                        disabled={processing}
                    >
                        {processingEnd ? "Concluído" : "Enviar"}
                    </button>
                </div>
            </form>
        </dialog>
    );
}

function PreviewModal({content}: {content: string}){
    return (
        <dialog id="modal_preview" className="modal">
            <form method="dialog" className="modal-box rounded-md">
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    className="w-full h-full max-w-md"
                >
                    {content}
                </ReactMarkdown>
            </form>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

function ProgressBar({percentage, ...props}: {percentage: number}){
    return (
        <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600" {...props}>
            <div className="h-1 bg-teal-500" style={{width: percentage+"%"}}></div>
        </div>
    );
}

/* const HTMLInjector = (html: string) => {
    const targetDivRef = useRef(null);

    useEffect(() => {
        const targetDiv = document.createElement('div');
        targetDivRef?.current?.appendChild(targetDiv);
        return () => {
            targetDivRef?.current?.removeChild(targetDiv);
        };
    }, []);

    return ReactDOM.createPortal(
        <div ref={targetDivRef} dangerouslySetInnerHTML={{ __html: html }} />,
        document.body
    );
  }; */