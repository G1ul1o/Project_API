import './Add-anime.css';

export default function AddAnime() {
  return (
    <div>
      <h1>Add Anime</h1>
      <form>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <br />
        <label>
          Genre:
          <input type="text" name="genre" />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description"></textarea>
        </label>
        <br />
        <button type="submit">Add Anime</button>
      </form>
    </div>
  );
}