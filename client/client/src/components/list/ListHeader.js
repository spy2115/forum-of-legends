export default function ListHeader() {
    return (
        <div className="col-span-12 grid grid-cols-12 gap-4 px-4 font-bold">
            <h1 className='text-white'> Data </h1>
            <h1 className='text-white col-span-9'> Temat </h1>
            <h1 className='text-white'> Autor </h1>
            <h1 className='text-white'> Komentarze </h1>
        </div>
    )
}