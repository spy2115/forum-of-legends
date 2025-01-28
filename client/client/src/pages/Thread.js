import { useParams } from 'react-router-dom';
import { GoStar, GoStarFill } from "react-icons/go";
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import Comment from '../components/thread/Comment';
import TextareaAutosize from 'react-textarea-autosize';
import Button from "../components/Button"

const schema = yup.object().shape({
    content: yup.string().required("Wiadomość nie może być pusta."),
});

export default function Thread() {
    const [watched, setWatched] = useState(false);
    const { threadId } = useParams();
    const [commentsData, setCommentsData] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
      const storedUser = localStorage.getItem("userId");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser);
      }
    }, []);

    const onVote = async (comment_id, vote) => {
        if (userId) {
            try {
                const response = await fetch(`/api/comments/${comment_id}/vote`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user_id: userId,
                        vote: vote
                    })
                })
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Unknown error occurred");
                }
                const voteData = await response.json();
                console.log("Voted:", voteData);
                } catch (error) {
                    console.error("Error voting:", error.message);
            }
        }
        }

    const onSubmit = async (data) => {
            try {
                const response = await fetch(`/api/threads/${threadId}/comments`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        content: data.content,
                        author: userId,
                    })
                })
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Unknown error occurred");
                }
                const commentData = await response.json();
                console.log("Comment add:", commentData);
                } catch (error) {
                    console.error("Error adding comment:", error.message);
            }
        }
        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm({
            resolver: yupResolver(schema),
            mode: "all",
        });

    useEffect(() => {
        axios.get(`/api/threads/${threadId}/comments`, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        })
        .then(response => {
          setCommentsData(response.data);
          if (response.data[0].thread_followers.includes(userId)) {
            setWatched(true);
          }
        })
        .catch(error => console.error(error));
      }, [userId]);

    async function handleSwitchWatched() {
        setWatched(prev => !prev);
        let actionId = -1;
        if (watched) {
            actionId = 0;
        } else {
            actionId = 1;
        }
        try {
            const response = await fetch(`/api/threads/${threadId}/follow`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: userId,
                    action: actionId,
                })
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Unknown error occurred");
            }
            const watchData = await response.json();
            console.log("Added to watched:", watchData);
            } catch (error) {
                console.error("Error adding comment:", error.message);
        }
    }

    return (
        <div className="my-8 place-items-center">
            <div className='w-5/6 grid grid-cols-1 gap-3'>
                <div className='grid grid-cols-12 place-items-end'>
                    <h1 className='text-white font-bold text-2xl mx-4 col-span-11'> {commentsData[0]?.thread_title} </h1>
                    {watched ? <GoStarFill onClick={handleSwitchWatched} className='text-yellow-500 hover:text-white' size={28} /> : <GoStar onClick={handleSwitchWatched} className='text-white hover:text-yellow-500' size={28} />}
                </div>
                {Array.isArray(commentsData) && commentsData.map(comment => (
                    <Comment key={comment.id} date={comment.date_of_creation} text={comment.content} author={comment.author.name} upvotes={comment.upvotes} downvotes={comment.downvotes} onUpvote={() => onVote(comment.id, 1)} onDownvote={() => onVote(comment.id, 0)} />
                ))}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {userId ?
                    <>
                        <div className='grid grid-cols-9'>
                            <div />
                            <TextareaAutosize
                            placeholder="Dodaj komentarz" className="col-span-8 bg-slate-600 px-4 py-2 mb-2 rounded-3xl border border-slate-400 text-white bg-opacity-70"
                            type="text"
                            id="Content"
                            name="content"
                            {...register('content')}/>
                        </div>
                        <div className='grid grid-cols-9'>
                            <div className='col-span-6'/>
                            <label className="text-right col-span-2 block text-sm font-medium text-red-500 mb-6 px-4"> {errors?.content && `${errors?.content.message}`} </label>
                            <Button label="Opublikuj" />
                        </div>
                    </>
                    : 
                    <h1 className='text-white col-span-10 text-right mx-4'> Zaloguj się aby dołączyć do dyskusji!  </h1>
                    }
                </form>
            </div>
        </div>
    )
}