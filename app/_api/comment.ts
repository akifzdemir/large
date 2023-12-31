import {  CommentRequest } from '../types'
import {instance as axios} from './axiosInstance'

const addComment = (comment:CommentRequest) => axios.post("/comments",comment)

const getBlogComments = (blogId:string)=>axios.get(`/comments/blog/${blogId}`)

const updateComment = (id:string|undefined,data:any) =>axios.patch(`/comments/${id}`,data)

const deleteComment = (id:string)=>axios.delete(`/comments/${id}`)

export {
    addComment,
    getBlogComments,
    deleteComment,
    updateComment
}