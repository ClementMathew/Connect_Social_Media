import { getAuth, signOut } from "firebase/auth";
import app from '../firebase';
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    const auth = getAuth(app);

    const handleClick = (e) => {
        e.preventDefault();
        // Add your authentication logic here
        signOut(auth).then(() => {
            navigate('/');
        }).catch((error) => {
            console.log(error);
        });
        // You can send a request to your authentication server here
    };

    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#ffffff',
        },
        button: {
            borderRadius: '10px',
            backgroundColor: '#ff9100',
            width: '20%',
            padding: '10px',
            marginBottom: '15px',
        },
    };

    return (
        <div >
            {/* <button style={styles.button} onClick={handleClick}>
                Logout
            </button> */}
            <div className="sidenav">
                <img src="../public/backg.png"
                    alt="Instagram Logo"
                />

                <div className="sidenav__buttons">
                    <button className="sidenav__button">
                        {/* <HomeIcon /> */}
                        <span>Home</span>
                    </button>
                    <button className="sidenav__button">
                        {/* <SearchIcon /> */}
                        <span>Search</span>
                    </button>
                    <button className="sidenav__button">
                        {/* <ExploreIcon /> */}
                        <span>Explore</span>
                    </button>
                    <button className="sidenav__button">
                        {/* <SlideshowIcon /> */}
                        <span>Reels</span>
                    </button>
                    <button className="sidenav__button">
                        {/* <ChatIcon /> */}
                        <span>Messages</span>
                    </button>
                    <button className="sidenav__button">
                        {/* <FavoriteBorderIcon /> */}
                        <span>Notifications</span>
                    </button>
                    <button className="sidenav__button">
                        {/* <AddCircleOutlineIcon /> */}
                        <span>Create</span>
                    </button>
                    {/* <button className="sidenav__button">
                        <Avatar>
                            {user.username ? user.username.charAt(0).toUpperCase() : "A"}
                        </Avatar>
                        <span>
                            {user.username}{" "}
                            <button onClick={handelLogout} className="logout__button">
                                Logout
                            </button>
                        </span>
                    </button> */}
                </div>
                <div className="sidenav__more">
                    <button className="sidenav__button">
                        {/* <MenuIcon /> */}
                        <span className="sidenav__buttonText">More</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;