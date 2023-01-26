import styles from "./StarRating.module.css"
export default function StarRating() {
    const [rating, setRating] = useState(0);
    return (
        <div className={styles.rate}>
        <input onClick={()=>setRating(5)} type="radio" id="star5" name="rate" value="5" />
        <label for="star5" title="text">5 stars</label>
        <input onClick={()=>setRating(4)} type="radio" id="star4" name="rate" value="4" />
        <label for="star4" title="text">4 stars</label>
        <input onClick={()=>setRating(3)} type="radio" id="star3" name="rate" value="3" />
        <label for="star3" title="text">3 stars</label>
        <input onClick={()=>setRating(2)} type="radio" id="star2" name="rate" value="2" />
        <label for="star2" title="text">2 stars</label>
        <input onClick={()=>setRating(1)} type="radio" id="star1" name="rate" value="1" />
        <label for="star1" title="text">1 star</label>
      </div>
    );
  };