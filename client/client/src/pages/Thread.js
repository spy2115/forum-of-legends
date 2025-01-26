import { useParams } from 'react-router-dom';
import { GoStar, GoStarFill } from "react-icons/go";
import Comment from '../components/thread/Comment';
import NewComment from '../components/thread/NewComment';
import Button from "../components/Button"
import { useState } from 'react';

export default function Thread() {
    const [watched, setWatched] = useState(false);
    const { threadId } = useParams();    
    const darek = "Oto poradnik gry Dariuszem w League of Legends, podzielony na kluczowe sekcje: 1. Ogólna charakterystyka Dariusz to topowy bruiser specjalizujący się w przedłużanych walkach i finiszowaniu przeciwników. Jego siła tkwi w pasywnym stackowaniu krwawień (Hemorrhage) i resetującym się ultimacie (Noxian Guillotine). Jest silny w early game, ale wymaga dobrego pozycjonowania, by uniknąć kite’owania."
    function handleSwitchWatched() {
        setWatched(prev => !prev);
    }

    return (
        threadId == "darius" && 
        <div className="my-8 place-items-center">
            <div className='w-5/6 grid grid-cols-1 gap-3'>
                <div className='grid grid-cols-12 place-items-end'>
                    <h1 className='text-white font-bold text-2xl mx-4 col-span-11'> Jak grać Dariusem - poradnik od eksperta</h1>
                    {watched ? <GoStarFill onClick={handleSwitchWatched} className='text-yellow-500 hover:text-white' size={28} /> : <GoStar onClick={handleSwitchWatched} className='text-white hover:text-yellow-500' size={28} />}
                </div>
                <Comment date="3 dni temu" text={darek} author="spy2115" upvotes="13" downvotes="5" />
                <Comment date="3 dni temu" text="ja tam ci wierze" author="anonim" upvotes="21" downvotes="2" />
                <Comment date="2 dni temu" text="no szkoda" author="SodaDrink" upvotes="0" downvotes="7" />
                <div className='grid grid-cols-9'>
                    <div />
                    <NewComment />
                </div>
                <div className='grid grid-cols-9'>
                    <div className='col-span-8'/>
                    <Button label="Opublikuj" />
                </div>
            </div>
        </div>
    )
}