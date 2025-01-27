import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { daysAgo, getTimeHHMM } from "../utils";

export default function Comment({date, text, author, upvotes, downvotes, onUpvote, onDownvote}) {
    return (
        <div className="grid grid-cols-12 gap-4 bg-slate-800 bg-opacity-70 px-4 py-2 rounded-3xl border border-slate-600"
            > 
            <div className='text-white'> <h1 className="font-bold"> {author} </h1> <h1 className='text-white'> {daysAgo(date) == 0 ? <> {getTimeHHMM(date)} </> : <>{daysAgo(date)} dni temu </>} </h1> </div>
            <h1 className='text-white col-span-10'> {text}  </h1>
            <h1 className='text-white grid grid-cols-4 text-right font-bold items-end'> {upvotes} <BiSolidUpvote size={24} className="text-emerald-600 hover:text-emerald-400" onClick={() => onUpvote()}/> {downvotes} <BiSolidDownvote size={24} className="text-red-700 hover:text-red-500" onClick={() => onDownvote()}/> </h1>
        </div>
    )
}