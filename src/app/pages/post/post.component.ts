import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from 'src/app/Models/comment';
import { Post } from 'src/app/Models/post';
import { CommentService } from 'src/app/services/comment/comment.service';
import { CookiesService } from 'src/app/services/cookie/cookies.service';
import { PostService } from 'src/app/services/post/post.service';
import { ReactionService } from 'src/app/services/reactions/reaction.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
        post: Post = new Post();

        posts?: Post[];
        postt?:Post;

        subcomment: Comment=new Comment;
        updatec?:boolean;
        p?:boolean;
        k?:boolean;
        s?:boolean;
        z?:boolean;
        a?:boolean;
        t=false;
        idt:any;

        selectedfile:any;
        idd?: number;
        idc?: number;
        update?:boolean;
        booli?:number;
        idu?:number;
        postu?:any;
        commentu?:any;
        typo?:any;
        comment: Comment=new Comment;
        comments?: Comment[];
        commentText = '';
        id?:number;
        showReactions = false;

        idUser?:number
        jwt?:string






        constructor(private postService: PostService  , private commentService: CommentService, private reactionService:ReactionService,
          private router: Router,  private cs:CookiesService) {

            this.jwt=this.cs.getCookieJWT().toString();
            this.idUser=this.cs.getCookieIDUser();
          }

         ngOnInit(): void {
          this.postService.auth(this.jwt!);

          this.update=false;
          this.updatec=false;
          this.getPosts();
        }
        private getPosts(){

          this.postService.getPostsList().subscribe(data => {
            this.posts = data;
          console.log(this.posts)
          });

        }

        updateEvent(id: number){
          this.router.navigate(['update-event', id]);
        }

        deleteEvent(id: number){
          this.postService.deletePost(id).subscribe( data => {
            console.log(data);
            this.getPosts();
          })
        }

        toggleCommentForm(post : any) {
          this.idc=post.idPost;
         this.p = post.showCommentForm = !post.showCommentForm;
        }

        toggleReplyForm(comment : any) {
          this.idd=comment.idComment;
          this.z = 1==1 ;
        this.s =  comment.showReplyForm = !comment.showReplyForm;
        }


         addComment(post : any) {

            if (this.comment.text?.trim() != ''){

              console.log(this.comment.text);
              this.commentService.createComment(this.comment, post.idPost,this.idUser!).subscribe( data =>{
                console.log(data);
                },
              error => console.log(error));
            }


            // sleep for 1 second
           // window.location.reload();

            this.toggleCommentForm(post);

        }

        addSubComment(subcomment: Comment, parentComment: Comment) {
          if (subcomment.text?.trim() != '') {
            this.commentService.addSubComment(subcomment.text!, parentComment.idComment!,this.idUser!).subscribe(subComment => {
              parentComment.replies?.push(subComment);
            });
          }
          // sleep for 1 second
         // window.location.reload();
          this.toggleReplyForm(parentComment);
        }

        toggleReplies(comment: Comment, id:any) {

          comment.showReplies = !comment.showReplies;
          console.log(id)

            this.commentService.getCommentsByPost(id).subscribe(data => {
              this.comments= data;
            });


        }
        updatePostt(post:Post){

          console.log(post.description);
          this.postu = post;
          this.update=true;


        }

        updatecomment(comment:Comment,post:any){
if (this.updatec==false){
          this.booli=post.idPost;

          this.commentu = comment;
          console.log(comment.post?.idPost);
          console.log("hedha",post.idPost);
          console.log(this.commentu.text);

          console.log(comment.post?.idPost);
          this.updatec=true;}
          else {
            this.updatec=false;
          }


        }

        onSubmitcomment(post:any){
          this.commentService.updateComment(this.commentu,post.idPost).subscribe( data =>{
            console.log(data);
            this.update=false;

            // sleep for 1 second
            window.location.reload();


          },
          error => console.log(error));
        }




        savePost(){
          const formData: FormData = new FormData();
          formData.append('image', this.selectedfile, this.selectedfile.name);
          formData.append('post', JSON.stringify(this.post));
          console.log(formData)
          this.postService.createPost(formData,this.idUser!).subscribe( data =>{
            console.log(data);
            this.goToPostList();
          },
          error => console.log(error));
        }

        getImageSrc(image: any): string {
          console.log(image)
          return 'data:'+ image.contentType+';base64,' + image.bytes;
         }




        goToPostList(){
          //this.router.navigate(['/post']);
          window.location.reload();
        }


        onSubmit(){
          console.log(this.post);
          this.savePost();
        }
        onSubmitt(){
          this.postService.updatePost(this.postu).subscribe( data =>{
            console.log(data);
            this.update=false;
            this.goToPostList();
          },
          error => console.log(error));
        }

        deletePost(id: number){
          if (window.confirm('Are you sure you want to delete this post?')) {
          this.postService.deletePost(id).subscribe( data => {
            console.log(data);
            this.getPosts();

          })}
        }
        deleteComment(id: number){
          if (window.confirm('Are you sure you want to delete this comment?')) {
          this.commentService.deleteComment(id).subscribe( data => {
            console.log(data);
            this.getPosts();

          })}
        }

        toggleReactions(post :any) {

        this.t =  post.showReactions = !post.showReactions;
        this.idt=post.idPost;
         console.log(this.showReactions)

        }

        addReaction(post: Post, type: string) {
          if(this.typo==null || this.typo!=type){
          this.typo=type;

          this.showReactions = !this.showReactions;
          console.log(this.typo)
          this.reactionService.addReact(post.idPost!,this.typo)
            .subscribe(data=> {
              console.log(data);
              console.log(type)

            });}
            else if(this.typo==type) {
              this.typo=null;

              console.log(post.idPost);

              this.reactionService.deleteReact(post.idPost!).subscribe( data => {
                console.log(data);
                this.showReactions = !this.showReactions;


              })



            }


        }

        onFileSelected(event:any) {
          this.selectedfile=  event.target.files[0];
        }

}
