import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to Anime Box</h1>
        <p className="home-subtitle">
          Discover, rate, and keep track of your favorite anime – a little like Letterbox, but for anime fans!
        </p>
        <div className="home-description">
          <p>
            ✨ Create your account to start logging anime you’ve watched or want to watch.
          </p>
          <p>
            🧾 Add detailed entries, explore what others are watching, and build your own anime collection.
          </p>
          <p>
            🔍 Use our anime search and list tools to explore our dataset, don't hesitate to contact us to improve it.
          </p>
        </div>
        <div className="home-calltoaction">
          <p>
            <a href="/Register" className="home-link">Join now</a> or <a href="/Login" className="home-link">log in</a> to get started!
          </p>
        </div>
      </div>
    </div>
  );
}
