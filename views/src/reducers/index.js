import { combineReducers } from 'redux'
import FooterReducer from './footer';
import NavReducer from './nav';
import SignInReducer from './sign-in';
import SignUpReducer from './sign-up';
import ImageUploadReducer from './image-uploader';
import ArtworkReducer from './artwork';
import UserCardReducer from './user-card';
import SuggestionReducer from './suggestion';
import SuggestionsReducer from './suggestions';
import QuestReducer from './quest';
import QuestsReducer from './quests';
import UserInfoReducer from './user-info';
import MyArtworkReducer from './my-artwork';
import ArtworkCardReducer from './artwork-card';

export const mainReducer = combineReducers({
    Footer: FooterReducer,
    Nav: NavReducer,
    SignIn: SignInReducer,
    SignUp: SignUpReducer,
    ImageUploader: ImageUploadReducer,
    Artwork: ArtworkReducer,
    UserCard: UserCardReducer,
    UserInfo: UserInfoReducer,
    Suggestions: SuggestionsReducer,
    Suggestion: SuggestionReducer,
    Quest: QuestReducer,
    Quests: QuestsReducer,
    MyArtwork: MyArtworkReducer,
    ArtworkCard: ArtworkCardReducer
});
export default mainReducer;