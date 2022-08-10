import { Container, Main } from "./style.js"
import CreatePost from "../../components/createPost.js"
import Posts from "../../components/posts.js"
import Trendings from "../../components/Trendings.js";
import Header from "../../components/Layout.js/Header.js";

export default function Home() {
    return (
        <Container>
            <Header />
            <Main>
                <div className="timeline">
                    <h1>Timeline</h1>
                    <div>
                        <CreatePost />
                        <Posts />
                    </div>
                </div>

                <div className="trending">
                    <Trendings />
                </div>
            </Main>
        </Container>
    )
}