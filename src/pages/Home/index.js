import { Container, Header, Main } from "./style.js"
import CreatePost from "../../components/createPost.js"
import Post from "../../components/post.js"
import Trendings from "../../components/Trendings.js";

export default function Home() {
    return (
        <Container>
            <Header>
                <h1>Linkr</h1>
                <div>
                    <img src="https://blog.emania.com.br/wp-content/uploads/2019/01/como-tirar-foto-de-cachorro.jpg" alt="imagem teste" />
                </div>
            </Header>
            <Main>
                <div className="timeline">
                    <h1>Timeline</h1>
                    <div>
                        <CreatePost />
                        <Post />
                        <Post />
                    </div>
                </div>

                <div className="trending">
                    <Trendings />
                </div>
            </Main>
        </Container>
    )
}