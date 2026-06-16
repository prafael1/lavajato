import './Header.css';
/*LOGO

Início
Serviços
Galeria
Contato

[ Agendar ]*/

function Header () {
    return(
        <header className="header">
            <div className="header__logo">
                <img src="https://i.imgur.com/0r0q3wH.png" alt="logo" />
            </div>
            <nav className="nav">
                <a href="#">Início</a>
                <a href="#">Serviços</a>
                <a href="#">Galeria</a>
                <a href="#">Contato</a>
            </nav>
                <button className="btn-agendar">Agendar</button>
        </header>
    )

}
export default Header;