import { FiUserPlus } from "react-icons/fi";
import Input from "./UI/Input";

const UserListItem = ({ name, email, isOwner, addUser, inputRef }) => {
    return (
        <div className='grid items-center mb-2' style={{ gridTemplateColumns: `${addUser ? '40' : '50'}px auto` }}>
            <avatar className={`w-10 h-10 rounded-full flex justify-center items-center border-2 shadow-md ${addUser ? 'border-gray-400 text-gray-600' : 'bg-slate-400 text-white border-white'}`}>{addUser ? <FiUserPlus /> : name[0]}</avatar>
            {addUser ?
                <Input inputRef={inputRef} name="Collaborator" inputType="email" placeholder="Email to share with" styleType="notes" /> :
                (<div>
                    <p><span className='font-bold'>{name}</span>{isOwner && " (Owner)"}</p>
                    <p className='text-gray-600'>{email}</p>
                </div>)}
        </div>

    )
}

export default UserListItem