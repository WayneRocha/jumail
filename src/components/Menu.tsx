import { List, selectLists, setLists } from "@/store/features/list-manager"
import { generateUUID } from "@/utils";
import { selectActiveList, setActiveList } from "@/store/features/ui"
import { useSelector, useDispatch } from "react-redux"

export default function Menu() {
    const dispatch = useDispatch();
    const lists = useSelector(selectLists);
    const activeList = useSelector(selectActiveList);

    const handleSelectList = (id: string) => {        
        dispatch(setActiveList(id));
    };

    const handleAddListVariable = () => {
        const lists: List[] = JSON.parse(window.localStorage.getItem("listManager.lists") || "[]");
        lists.push({
            id: generateUUID(),
            name: "Nova Lista",
            emails: [
                {
                    id: generateUUID(),
                    address: "",
                    variables: [
                        {
                            id: generateUUID(),
                            prop: "Nome",
                            value: ""
                        }
                    ]
                }
            ],
            variables: [
                {
                    id: generateUUID(),
                    prop: "organizaçao",
                    value: ""
                }
            ]
        });
        dispatch(setLists(lists));
    };

    if (lists.length === 1) {
        dispatch(setActiveList(lists[0].id));
    }

    return(
        <div className="border-r-2 border-r-neutral-100 h-100 w-44 p-2 flex flex-col justify-between bg-neutral-50">
            <div>
                {lists.map(list => {
                    const isActive = activeList === list.id;

                    return (
                        <div
                            className={`${isActive ? 'bg-neutral-200' : 'bg-neutral-100'} py-2 px-4 mb-1 rounded-sm hover:bg-neutral-200 text-sm text-center cursor-pointer`}
                            key={list.id}
                            onClick={() => handleSelectList(list.id)}
                        >
                            {list.name}
                        </div>
                    );
                })}
            </div>
            <div className="p-1 flex text-center">
                <button className="btn text-sm btn-md rounded-md font-normal" onClick={handleAddListVariable}>
                    + Nova Lista
                </button>
            </div>
        </div>
    )
}