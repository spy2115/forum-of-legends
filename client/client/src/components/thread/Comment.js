import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";

export default function Comment({date, text, author, upvotes, downvotes}) {
    return (
        <div className="grid grid-cols-12 gap-4 bg-slate-800 bg-opacity-70 px-4 py-2 rounded-3xl border border-slate-600"
            > 
            <h1 className='text-white'> <h1 className="font-bold"> {author} </h1> {date} </h1>
            <h1 className='text-white col-span-10'> {text}  </h1>
            <h1 className='text-white grid grid-cols-4 text-right font-bold items-end'> {upvotes} <BiSolidUpvote size={24} className="text-emerald-600 hover:text-emerald-400"/> {downvotes} <BiSolidDownvote size={24} className="text-red-700 hover:text-red-500"/> </h1>
        </div>
    )
}