import { Image } from "./Image";
import { Comment } from "./comment";

export class Post {
    idPost? : number;
    description? :string;
    nbReaction? : number;
    createDateTime? : Date;
    comments? : Comment[];
    showReplies?: boolean;
    image?:Image;
}
