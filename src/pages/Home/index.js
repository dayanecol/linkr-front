import { Container, Main } from "./style.js"
import CreatePost from "../../components/createPost.js"
import Posts from "../../components/posts.js"
import Trendings from "../../components/Trendings.js";
import Header from "../../components/Layout.js/Header.js";
import AtualizationContext from "../../contexts/AtualizationContext.js"
import { useState } from "react";

export default function Home() {
    const [atualization, setAtualization] = useState(false);
    const [load, setLoad] = useState(false)
    return (
        <Container>
            <Header />
            <Main>
                <div className="timeline">
                    <h1>Timeline</h1>
                    <div>
                        <AtualizationContext.Provider value={{atualization, setAtualization, load, setLoad}}>
                            <CreatePost />
                            <Posts />
                        </AtualizationContext.Provider>
                    </div>
                </div>

                <div className="trending">
                    <Trendings />
                </div>
            </Main>
        </Container>
    )
}