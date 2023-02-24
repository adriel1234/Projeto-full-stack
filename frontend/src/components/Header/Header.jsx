import "./header.css";

function Header() {

    return (
        <header className="header">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/1200px-Rick_and_Morty.svg.png" alt="logo" />

            <nav>
                <a className="item1" href="https://github.com/adriel1234" target={"_blank"}>GitHub</a>
                <a className="item2" href="https://www.linkedin.com/in/adriel-vinicius-04a389136/" target={"_blank"}>Linkedin</a>

            </nav>

        </header>
    )
}

export default Header;