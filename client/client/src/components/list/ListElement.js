export default function ListElement({date, topic, author, comments}) {
    return (
        <div className="col-span-12 grid grid-cols-12 gap-4 bg-slate-800 px-4 py-2 rounded-3xl hover:bg-slate-700">
            <h1 className='text-white'> {date} </h1>
            <h1 className='text-white col-span-9'> {topic}  </h1>
            <h1 className='text-white'> {author} </h1>
            <h1 className='text-white'> {comments} </h1>
          </div>
    )
}