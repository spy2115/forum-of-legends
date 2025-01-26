import TextareaAutosize from 'react-textarea-autosize';

export default function NewComment() {
    return (
        <TextareaAutosize placeholder="Dodaj komentarz" className="col-span-8 bg-slate-600 px-4 py-2 rounded-3xl border border-slate-400 text-white bg-opacity-70" />
    )
}